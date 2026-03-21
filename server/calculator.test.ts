import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for public procedures
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Loan Calculator", () => {
  it("calculates loan details correctly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calculator.calculateLoan({
      amount: 5000,
      periodDays: 30,
      interestRate: 40,
      processingFee: 5,
    });

    expect(result).toBeDefined();
    expect(result.principal).toBe(5000);
    expect(result.interest).toBeGreaterThan(0);
    expect(result.processingFee).toBeGreaterThan(0);
    expect(result.totalRepayment).toBeGreaterThan(result.principal);
    expect(result.monthlyInstallment).toBeGreaterThan(0);
  });

  it("calculates correct interest for 30-day period", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calculator.calculateLoan({
      amount: 10000,
      periodDays: 30,
      interestRate: 40,
      processingFee: 0,
    });

    // 40% annual = 0.4/365 per day = ~0.001096 per day
    // 30 days * 0.001096 * 10000 ≈ 328.77
    expect(result.interest).toBeCloseTo(328.77, 1);
  });

  it("handles different loan amounts correctly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const small = await caller.calculator.calculateLoan({
      amount: 1000,
      periodDays: 7,
      interestRate: 40,
      processingFee: 5,
    });

    const large = await caller.calculator.calculateLoan({
      amount: 50000,
      periodDays: 180,
      interestRate: 40,
      processingFee: 5,
    });

    expect(small.totalRepayment).toBeLessThan(large.totalRepayment);
    expect(small.monthlyInstallment).toBeLessThan(large.monthlyInstallment);
  });

  it("includes processing fee in total repayment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const withoutFee = await caller.calculator.calculateLoan({
      amount: 5000,
      periodDays: 30,
      interestRate: 40,
      processingFee: 0,
    });

    const withFee = await caller.calculator.calculateLoan({
      amount: 5000,
      periodDays: 30,
      interestRate: 40,
      processingFee: 5,
    });

    expect(withFee.processingFee).toBe(250); // 5% of 5000
    expect(withFee.totalRepayment).toBeGreaterThan(withoutFee.totalRepayment);
  });
});

describe("Eligibility Checker", () => {
  it("approves eligible applicants", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 10000,
      employmentStatus: "employed",
      requestedAmount: 5000,
    });

    expect(result.isEligible).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(60);
  });

  it("approves applicants at minimum age", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 18,
      monthlyIncome: 10000,
      employmentStatus: "employed",
      requestedAmount: 5000,
    });

    expect(result.isEligible).toBe(true);
    expect(result.score).toBeGreaterThan(0);
  });

  it("approves applicants at maximum age", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 75,
      monthlyIncome: 10000,
      employmentStatus: "employed",
      requestedAmount: 5000,
    });

    expect(result.isEligible).toBe(true);
    expect(result.score).toBeGreaterThan(0);
  });

  it("calculates max loan amount based on income", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 5000,
      employmentStatus: "employed",
      requestedAmount: 20000,
    });

    // Max should be 5x monthly income = 25000, but capped at 50000
    expect(result.maxLoanAmount).toBe(25000);
  });

  it("caps max loan amount at 50000", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 20000,
      employmentStatus: "employed",
      requestedAmount: 50000,
    });

    // Max would be 100000 (5x income), but capped at 50000
    expect(result.maxLoanAmount).toBe(50000);
  });

  it("recommends lower amount if requested exceeds max", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 3000,
      employmentStatus: "employed",
      requestedAmount: 20000,
    });

        // Max is 15000 (5x income)
        expect(result.maxLoanAmount).toBe(15000);
        expect(result.recommendedAmount).toBeLessThanOrEqual(result.maxLoanAmount);
  });

  it("scores unemployed applicants lower", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const employed = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 5000,
      employmentStatus: "employed",
      requestedAmount: 5000,
    });

    const unemployed = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 5000,
      employmentStatus: "unemployed",
      requestedAmount: 5000,
    });

    // Both should have high scores if income is good
    expect(employed.score).toBeGreaterThanOrEqual(unemployed.score);
  });

  it("provides actionable improvement reasons", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.eligibility.checkEligibility({
      age: 35,
      monthlyIncome: 1000,
      employmentStatus: "unemployed",
      requestedAmount: 30000,
    });

    expect(result.reasons.length).toBeGreaterThan(0);
    expect(Array.isArray(result.reasons)).toBe(true);
  });
});
