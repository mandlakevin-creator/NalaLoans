import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  date,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with loan-specific fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  phone: varchar("phone", { length: 20 }),
  idNumber: varchar("idNumber", { length: 20 }).unique(), // South African ID
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Profile fields
  dateOfBirth: date("dateOfBirth"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  province: varchar("province", { length: 100 }),
  postalCode: varchar("postalCode", { length: 10 }),
  
  // Financial profile
  monthlyIncome: decimal("monthlyIncome", { precision: 10, scale: 2 }),
  employmentStatus: mysqlEnum("employmentStatus", ["employed", "self-employed", "unemployed", "retired"]),
  employerName: varchar("employerName", { length: 255 }),
  
  // Bank details
  bankName: varchar("bankName", { length: 100 }),
  accountNumber: varchar("accountNumber", { length: 20 }),
  accountType: mysqlEnum("accountType", ["savings", "cheque"]),
  
  // Verification
  idVerified: boolean("idVerified").default(false),
  emailVerified: boolean("emailVerified").default(false),
  phoneVerified: boolean("phoneVerified").default(false),
  bankVerified: boolean("bankVerified").default(false),
  
  // Eligibility
  eligibilityScore: int("eligibilityScore"),
  maxLoanAmount: decimal("maxLoanAmount", { precision: 10, scale: 2 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * OTP verification table for authentication
 */
export const otpVerifications = mysqlTable("otpVerifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  otp: varchar("otp", { length: 6 }).notNull(),
  type: mysqlEnum("type", ["email", "phone", "id"]).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  verified: boolean("verified").default(false),
  attempts: int("attempts").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OtpVerification = typeof otpVerifications.$inferSelect;
export type InsertOtpVerification = typeof otpVerifications.$inferInsert;

/**
 * Loan products table
 */
export const loanProducts = mysqlTable("loanProducts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  minAmount: decimal("minAmount", { precision: 10, scale: 2 }).notNull(),
  maxAmount: decimal("maxAmount", { precision: 10, scale: 2 }).notNull(),
  minPeriodDays: int("minPeriodDays").notNull(),
  maxPeriodDays: int("maxPeriodDays").notNull(),
  interestRate: decimal("interestRate", { precision: 5, scale: 2 }).notNull(), // Annual percentage rate
  processingFee: decimal("processingFee", { precision: 5, scale: 2 }), // Percentage
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanProduct = typeof loanProducts.$inferSelect;
export type InsertLoanProduct = typeof loanProducts.$inferInsert;

/**
 * Loan applications table
 */
export const loanApplications = mysqlTable("loanApplications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  
  // Application details
  requestedAmount: decimal("requestedAmount", { precision: 10, scale: 2 }).notNull(),
  requestedPeriodDays: int("requestedPeriodDays").notNull(),
  purpose: varchar("purpose", { length: 255 }),
  
  // Status
  status: mysqlEnum("status", ["draft", "submitted", "under_review", "approved", "rejected", "cancelled"]).default("draft"),
  submittedAt: timestamp("submittedAt"),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: int("reviewedBy"), // Admin user ID
  rejectionReason: text("rejectionReason"),
  
  // Eligibility assessment
  eligibilityScore: int("eligibilityScore"),
  riskLevel: mysqlEnum("riskLevel", ["low", "medium", "high"]),
  
  // Approval details
  approvedAmount: decimal("approvedAmount", { precision: 10, scale: 2 }),
  approvedPeriodDays: int("approvedPeriodDays"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertLoanApplication = typeof loanApplications.$inferInsert;

/**
 * Active loans table
 */
export const loans = mysqlTable("loans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  applicationId: int("applicationId").notNull(),
  productId: int("productId").notNull(),
  
  // Loan terms
  principal: decimal("principal", { precision: 10, scale: 2 }).notNull(),
  interestRate: decimal("interestRate", { precision: 5, scale: 2 }).notNull(),
  processingFee: decimal("processingFee", { precision: 10, scale: 2 }),
  totalRepayment: decimal("totalRepayment", { precision: 10, scale: 2 }).notNull(),
  monthlyInstallment: decimal("monthlyInstallment", { precision: 10, scale: 2 }).notNull(),
  
  // Loan period
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  durationDays: int("durationDays").notNull(),
  
  // Status
  status: mysqlEnum("status", ["active", "completed", "defaulted", "cancelled"]).default("active"),
  disbursedAt: timestamp("disbursedAt"),
  
  // Payment tracking
  amountPaid: decimal("amountPaid", { precision: 10, scale: 2 }).default("0"),
  nextPaymentDue: date("nextPaymentDue"),
  paymentsCompleted: int("paymentsCompleted").default(0),
  totalPayments: int("totalPayments").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Loan = typeof loans.$inferSelect;
export type InsertLoan = typeof loans.$inferInsert;

/**
 * Payment transactions table
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  loanId: int("loanId").notNull(),
  userId: int("userId").notNull(),
  
  // Payment details
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["bank_transfer", "card", "eft", "other"]).notNull(),
  
  // Status
  status: mysqlEnum("status", ["pending", "processing", "completed", "failed", "refunded"]).default("pending"),
  
  // Stripe integration
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  
  // Metadata
  description: text("description"),
  reference: varchar("reference", { length: 100 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Educational content (Money Academy)
 */
export const educationalContent = mysqlTable("educationalContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  category: mysqlEnum("category", ["financial_literacy", "loan_management", "budgeting", "savings", "faq"]).notNull(),
  content: text("content").notNull(), // Markdown content
  excerpt: text("excerpt"),
  author: varchar("author", { length: 100 }),
  isPublished: boolean("isPublished").default(false),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type EducationalContent = typeof educationalContent.$inferSelect;
export type InsertEducationalContent = typeof educationalContent.$inferInsert;

/**
 * Eligibility criteria for pre-qualification
 */
export const eligibilityCriteria = mysqlTable("eligibilityCriteria", {
  id: int("id").autoincrement().primaryKey(),
  minAge: int("minAge").default(18),
  maxAge: int("maxAge").default(75),
  minMonthlyIncome: decimal("minMonthlyIncome", { precision: 10, scale: 2 }),
  employmentRequired: boolean("employmentRequired").default(false),
  allowedEmploymentStatus: varchar("allowedEmploymentStatus", { length: 255 }), // JSON array
  minCreditScore: int("minCreditScore"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EligibilityCriteria = typeof eligibilityCriteria.$inferSelect;
export type InsertEligibilityCriteria = typeof eligibilityCriteria.$inferInsert;
