import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

type ApplicationStep = "details" | "income" | "bank" | "review" | "submitted";

export default function LoanApplication() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<ApplicationStep>("details");
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanPeriod, setLoanPeriod] = useState(30);

  const [formData, setFormData] = useState({
    // Personal details
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    maritalStatus: "single",
    dependents: 0,

    // Income details
    employmentStatus: "employed",
    employer: "",
    jobTitle: "",
    monthlyIncome: 5000,
    otherIncome: 0,

    // Bank details
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    accountType: "checking",
    branchCode: "",

    // Loan details
    loanAmount: 5000,
    loanPeriod: 30,
    loanPurpose: "personal",
  });

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Get loan calculation
  const { data: calculation } = trpc.calculator.calculateLoan.useQuery({
    amount: loanAmount,
    periodDays: loanPeriod,
    interestRate: 40,
    processingFee: 0,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitApplication = async () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setSubmitting(true);
    try {
      // In a real app, this would call the backend
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep("submitted");
    } catch (error) {
      alert("Error submitting application. Please try again.");
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to apply for a loan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setLocation("/")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Loan Application</h1>
            <p className="text-sm text-muted-foreground">
              {step === "details" && "Step 1: Personal Information"}
              {step === "income" && "Step 2: Income Details"}
              {step === "bank" && "Step 3: Bank Information"}
              {step === "review" && "Step 4: Review & Confirm"}
              {step === "submitted" && "Application Submitted"}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === "submitted" ? (
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Application Submitted!</CardTitle>
                  <CardDescription className="text-green-800">
                    Your loan application has been successfully submitted. We'll review it and contact you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-background rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Application ID</p>
                    <p className="font-mono font-bold">APP-{Date.now()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-bold">R{loanAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Period</p>
                      <p className="font-bold">{loanPeriod} days</p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setLocation("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === "details" && "Personal Information"}
                    {step === "income" && "Income Details"}
                    {step === "bank" && "Bank Information"}
                    {step === "review" && "Review Your Application"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Details */}
                  {step === "details" && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+27..."
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="idNumber">ID Number</Label>
                          <Input
                            id="idNumber"
                            placeholder="YYMMDDGGGGGGG"
                            value={formData.idNumber}
                            onChange={(e) => handleInputChange("idNumber", e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="marital">Marital Status</Label>
                          <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                            <SelectTrigger className="input-field">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married">Married</SelectItem>
                              <SelectItem value="divorced">Divorced</SelectItem>
                              <SelectItem value="widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dependents">Number of Dependents</Label>
                          <Input
                            id="dependents"
                            type="number"
                            min="0"
                            value={formData.dependents}
                            onChange={(e) => handleInputChange("dependents", parseInt(e.target.value))}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Income Details */}
                  {step === "income" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="employment">Employment Status</Label>
                        <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                          <SelectTrigger className="input-field">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.employmentStatus === "employed" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="employer">Employer Name</Label>
                            <Input
                              id="employer"
                              value={formData.employer}
                              onChange={(e) => handleInputChange("employer", e.target.value)}
                              className="input-field"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input
                              id="jobTitle"
                              value={formData.jobTitle}
                              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                              className="input-field"
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income (R)</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          min="0"
                          step="100"
                          value={formData.monthlyIncome}
                          onChange={(e) => handleInputChange("monthlyIncome", parseFloat(e.target.value))}
                          className="input-field"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otherIncome">Other Monthly Income (R)</Label>
                        <Input
                          id="otherIncome"
                          type="number"
                          min="0"
                          step="100"
                          value={formData.otherIncome}
                          onChange={(e) => handleInputChange("otherIncome", parseFloat(e.target.value))}
                          className="input-field"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Bank Details */}
                  {step === "bank" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                          <SelectTrigger className="input-field">
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fnb">First National Bank</SelectItem>
                            <SelectItem value="absa">ABSA</SelectItem>
                            <SelectItem value="standard">Standard Bank</SelectItem>
                            <SelectItem value="nedbank">Nedbank</SelectItem>
                            <SelectItem value="capitec">Capitec</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountHolder">Account Holder Name</Label>
                        <Input
                          id="accountHolder"
                          value={formData.accountHolder}
                          onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                          className="input-field"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branchCode">Branch Code</Label>
                          <Input
                            id="branchCode"
                            value={formData.branchCode}
                            onChange={(e) => handleInputChange("branchCode", e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                          <SelectTrigger className="input-field">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {step === "review" && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-muted-foreground">Name:</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          <p className="text-muted-foreground">Email:</p>
                          <p className="font-medium">{formData.email}</p>
                          <p className="text-muted-foreground">Phone:</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold">Loan Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-muted-foreground">Amount:</p>
                          <p className="font-medium">R{loanAmount.toLocaleString()}</p>
                          <p className="text-muted-foreground">Period:</p>
                          <p className="font-medium">{loanPeriod} days</p>
                          <p className="text-muted-foreground">Total Repayment:</p>
                          <p className="font-bold text-primary">R{calculation?.totalRepayment.toLocaleString()}</p>
                          <p className="text-muted-foreground">Monthly Payment:</p>
                          <p className="font-bold">R{calculation?.monthlyInstallment.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="agree"
                            checked={agreed}
                            onCheckedChange={(checked) => setAgreed(checked as boolean)}
                          />
                          <label htmlFor="agree" className="text-sm cursor-pointer">
                            I agree to the terms and conditions, privacy policy, and loan agreement. I understand that NALA will conduct a credit check and that my personal information will be used to process this application.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-border">
                    {step !== "details" && (step === "income" || step === "bank" || step === "review") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (step === "income") setStep("details");
                          else if (step === "bank") setStep("income");
                          else if (step === "review") setStep("bank");
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    {(step === "details" || step === "income" || step === "bank" || step === "review") && (
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => {
                          if (step === "details") setStep("income");
                          else if (step === "income") setStep("bank");
                          else if (step === "bank") setStep("review");
                          else if (step === "review") handleSubmitApplication();
                        }}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : step === "review" ? (
                          "Submit Application"
                        ) : (
                          "Next"
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Loan Summary Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Loan Amount</span>
                    <span className="font-bold">R{loanAmount.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={1000}
                    max={50000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>R1,000</span>
                    <span>R50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Loan Period</span>
                    <span className="font-bold">{loanPeriod} days</span>
                  </div>
                  <Slider
                    value={[loanPeriod]}
                    onValueChange={(value) => setLoanPeriod(value[0])}
                    min={7}
                    max={180}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>7 days</span>
                    <span>180 days</span>
                  </div>
                </div>

                {calculation && (
                  <>
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Principal</span>
                        <span>R{calculation.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Interest (40%)</span>
                        <span>R{calculation.interest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                        <span>Total Repayment</span>
                        <span className="text-primary">R{calculation.totalRepayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span>Monthly Payment</span>
                        <span className="text-primary">R{calculation.monthlyInstallment.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-3 text-xs">
                      <p className="text-muted-foreground mb-1">Interest Breakdown:</p>
                      <p className="font-medium">• 20% NCR regulated cap</p>
                      <p className="font-medium">• 20% admin fees</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
