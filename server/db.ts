import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  loanProducts,
  loanApplications,
  loans,
  payments,
  educationalContent,
  eligibilityCriteria,
  otpVerifications,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createEmailUser(email: string, name?: string) {
  const db = await getDb();
  if (!db) return null;

  // Generate a unique openId for email-based users
  const openId = `email_${email}_${Date.now()}`;
  
  try {
    await db.insert(users).values({
      openId,
      email,
      name: name || email.split('@')[0],
      loginMethod: 'email',
      emailVerified: false,
      lastSignedIn: new Date(),
    });
    
    return await getUserByEmail(email);
  } catch (error) {
    console.error("Failed to create email user:", error);
    return null;
  }
}

export async function updateUserProfile(
  userId: number,
  data: Partial<InsertUser>
) {
  const db = await getDb();
  if (!db) return null;

  await db.update(users).set(data).where(eq(users.id, userId));
  return getUserById(userId);
}

// Loan Products
export async function getLoanProducts() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(loanProducts)
    .where(eq(loanProducts.isActive, true));
}

export async function getLoanProductById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(loanProducts)
    .where(eq(loanProducts.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// Loan Applications
export async function createLoanApplication(data: any) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(loanApplications).values(data);
  return result;
}

export async function getLoanApplications(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(loanApplications)
    .where(eq(loanApplications.userId, userId))
    .orderBy(desc(loanApplications.createdAt));
}

export async function getLoanApplicationById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(loanApplications)
    .where(eq(loanApplications.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateLoanApplication(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;

  await db.update(loanApplications).set(data).where(eq(loanApplications.id, id));
  return getLoanApplicationById(id);
}

// Active Loans
export async function getUserLoans(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(loans)
    .where(eq(loans.userId, userId))
    .orderBy(desc(loans.createdAt));
}

export async function getLoanById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(loans).where(eq(loans.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createLoan(data: any) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(loans).values(data);
  return result;
}

// Payments
export async function getPaymentsByLoanId(loanId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(payments)
    .where(eq(payments.loanId, loanId))
    .orderBy(desc(payments.createdAt));
}

export async function getPaymentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt));
}

export async function createPayment(data: any) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(payments).values(data);
  return result;
}

export async function updatePayment(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;

  await db.update(payments).set(data).where(eq(payments.id, id));
  return db.select().from(payments).where(eq(payments.id, id)).limit(1);
}

// Educational Content
export async function getEducationalContent(category?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db
    .select()
    .from(educationalContent)
    .where(eq(educationalContent.isPublished, true));

  if (category) {
    query = db
      .select()
      .from(educationalContent)
      .where(
        and(
          eq(educationalContent.isPublished, true),
          eq(educationalContent.category, category as any)
        )
      );
  }

  return query.orderBy(desc(educationalContent.publishedAt));
}

export async function getEducationalContentBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(educationalContent)
    .where(eq(educationalContent.slug, slug))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// Eligibility Criteria
export async function getEligibilityCriteria() {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(eligibilityCriteria).limit(1);
  return result.length > 0 ? result[0] : null;
}

// OTP Verification
export async function createOtpVerification(data: any) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(otpVerifications).values(data);
  return result;
}

export async function getOtpVerification(userId: number, type: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(otpVerifications)
    .where(
      and(
        eq(otpVerifications.userId, userId),
        eq(otpVerifications.type, type as any)
      )
    )
    .orderBy(desc(otpVerifications.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateOtpVerification(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(otpVerifications)
    .set(data)
    .where(eq(otpVerifications.id, id));
  return db
    .select()
    .from(otpVerifications)
    .where(eq(otpVerifications.id, id))
    .limit(1);
}
