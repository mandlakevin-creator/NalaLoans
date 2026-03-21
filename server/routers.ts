import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Loan Calculator
  calculator: router({
    calculateLoan: publicProcedure
      .input(
        z.object({
          amount: z.number().min(1000).max(50000),
          periodDays: z.number().min(7).max(180),
          interestRate: z.number(), // Annual percentage rate
          processingFee: z.number().optional(),
        })
      )
      .query(({ input }) => {
        const { amount, periodDays, interestRate, processingFee = 0 } = input;

        // Calculate daily interest rate
        const dailyRate = interestRate / 100 / 365;

        // Calculate interest for the loan period
        const interest = amount * dailyRate * periodDays;

        // Calculate processing fee
        const fee = (amount * processingFee) / 100;

        // Total repayment
        const totalRepayment = amount + interest + fee;

        // Monthly installment (approximate)
        const months = Math.ceil(periodDays / 30);
        const monthlyInstallment = totalRepayment / months;

        return {
          principal: amount,
          interest: Math.round(interest * 100) / 100,
          processingFee: Math.round(fee * 100) / 100,
          totalRepayment: Math.round(totalRepayment * 100) / 100,
          monthlyInstallment: Math.round(monthlyInstallment * 100) / 100,
          periodDays,
          months,
        };
      }),

    getLoanProducts: publicProcedure.query(async () => {
      return db.getLoanProducts();
    }),
  }),

  // Eligibility Checker
  eligibility: router({
    checkEligibility: publicProcedure
      .input(
        z.object({
          age: z.number().min(18).max(100),
          monthlyIncome: z.number().min(0),
          employmentStatus: z.enum([
            "employed",
            "self-employed",
            "unemployed",
            "retired",
          ]),
          requestedAmount: z.number(),
        })
      )
      .query(async ({ input }) => {
        const criteria = await db.getEligibilityCriteria();

        if (!criteria) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Eligibility criteria not configured",
          });
        }

        let score = 0;
        const reasons: string[] = [];

        // Age check
        const minAge = criteria.minAge || 18;
        const maxAge = criteria.maxAge || 75;
        if (input.age >= minAge && input.age <= maxAge) {
          score += 20;
        } else {
          reasons.push("Age outside acceptable range");
        }

        // Income check
        if (
          criteria.minMonthlyIncome &&
          input.monthlyIncome >= Number(criteria.minMonthlyIncome)
        ) {
          score += 30;
        } else if (criteria.minMonthlyIncome) {
          reasons.push("Monthly income below minimum requirement");
        }

        // Employment check
        if (
          !criteria.employmentRequired ||
          input.employmentStatus !== "unemployed"
        ) {
          score += 25;
        } else {
          reasons.push("Employment verification required");
        }

        // Loan amount reasonableness (max 5x monthly income)
        if (input.monthlyIncome > 0) {
          const maxReasonable = input.monthlyIncome * 5;
          if (input.requestedAmount <= maxReasonable) {
            score += 25;
          } else {
            reasons.push("Requested amount exceeds reasonable limit");
          }
        }

        const isEligible = score >= 60;
        const maxLoanAmount = Math.min(
          50000,
          input.monthlyIncome * 5
        );

        return {
          isEligible,
          score,
          reasons,
          maxLoanAmount: Math.round(maxLoanAmount * 100) / 100,
          recommendedAmount: Math.min(
            input.requestedAmount,
            maxLoanAmount
          ),
        };
      }),
  }),

  // User Profile
  profile: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserById(ctx.user.id);
    }),

    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          phone: z.string().optional(),
          dateOfBirth: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          province: z.string().optional(),
          postalCode: z.string().optional(),
          monthlyIncome: z.number().optional(),
          employmentStatus: z
            .enum(["employed", "self-employed", "unemployed", "retired"])
            .optional(),
          employerName: z.string().optional(),
          bankName: z.string().optional(),
          accountNumber: z.string().optional(),
          accountType: z.enum(["savings", "cheque"]).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const updateData: any = {};

        // Only include fields that are provided
        Object.entries(input).forEach(([key, value]) => {
          if (value !== undefined) {
            updateData[key] = value;
          }
        });

        return db.updateUserProfile(ctx.user.id, updateData);
      }),
  }),

  // Loan Applications
  applications: router({
    createApplication: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          requestedAmount: z.number().min(1000).max(50000),
          requestedPeriodDays: z.number().min(7).max(180),
          purpose: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const product = await db.getLoanProductById(input.productId);

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Loan product not found",
          });
        }

        // Validate amount and period
        if (
          input.requestedAmount < Number(product.minAmount) ||
          input.requestedAmount > Number(product.maxAmount)
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Requested amount outside product limits",
          });
        }

        if (
          input.requestedPeriodDays < product.minPeriodDays ||
          input.requestedPeriodDays > product.maxPeriodDays
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Requested period outside product limits",
          });
        }

        const result = await db.createLoanApplication({
          userId: ctx.user.id,
          productId: input.productId,
          requestedAmount: input.requestedAmount,
          requestedPeriodDays: input.requestedPeriodDays,
          purpose: input.purpose,
          status: "draft",
        });

        return result;
      }),

    getApplications: protectedProcedure.query(async ({ ctx }) => {
      return db.getLoanApplications(ctx.user.id);
    }),

    getApplication: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const application = await db.getLoanApplicationById(input.id);

        if (!application || application.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application not found",
          });
        }

        return application;
      }),

    submitApplication: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const application = await db.getLoanApplicationById(input.id);

        if (!application || application.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application not found",
          });
        }

        if (application.status !== "draft") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only draft applications can be submitted",
          });
        }

        // Verify user has required information
        const user = await db.getUserById(ctx.user.id);
        if (!user?.idVerified || !user?.bankVerified) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Please complete ID and bank verification first",
          });
        }

        return db.updateLoanApplication(input.id, {
          status: "submitted",
          submittedAt: new Date(),
        });
      }),
  }),

  // Loans
  loans: router({
    getLoans: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserLoans(ctx.user.id);
    }),

    getLoan: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const loan = await db.getLoanById(input.id);

        if (!loan || loan.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Loan not found",
          });
        }

        return loan;
      }),
  }),

  // Payments
  payments: router({
    getPayments: protectedProcedure
      .input(z.object({ loanId: z.number() }))
      .query(async ({ ctx, input }) => {
        const loan = await db.getLoanById(input.loanId);

        if (!loan || loan.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Loan not found",
          });
        }

        return db.getPaymentsByLoanId(input.loanId);
      }),

    createPaymentIntent: protectedProcedure
      .input(
        z.object({
          loanId: z.number(),
          amount: z.number().min(0.01),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const loan = await db.getLoanById(input.loanId);

        if (!loan || loan.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Loan not found",
          });
        }

        if (loan.status !== "active") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Loan is not active",
          });
        }

        // Create payment record
        await db.createPayment({
          loanId: input.loanId,
          userId: ctx.user.id,
          amount: input.amount,
          paymentMethod: "card",
          status: "pending",
        });

        return {
          amount: input.amount,
          status: "pending",
        };
      }),
  }),

  // Educational Content
  education: router({
    getContent: publicProcedure
      .input(
        z.object({
          category: z
            .enum([
              "financial_literacy",
              "loan_management",
              "budgeting",
              "savings",
              "faq",
            ])
            .optional(),
        })
      )
      .query(async ({ input }) => {
        return db.getEducationalContent(input.category);
      }),

    getContentBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getEducationalContentBySlug(input.slug);
      }),
  }),
});

export type AppRouter = typeof appRouter;
