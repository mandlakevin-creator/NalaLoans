import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, AlertCircle, Zap } from "lucide-react";

interface EligibilityResult {
  eligible: boolean;
  score: number;
  message: string;
  recommendedAmount: number;
  approvalLikelihood: "high" | "medium" | "low";
}

export function EligibilityQuiz() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(30);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [employment, setEmployment] = useState("employed");
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const calculateEligibility = () => {
    let score = 0;
    let approvalLikelihood: "high" | "medium" | "low" = "low";

    // Age check (18-65 preferred)
    if (age >= 18 && age <= 65) {
      score += 30;
      if (age >= 25 && age <= 55) score += 10;
    }

    // Income check
    if (monthlyIncome >= 3000) {
      score += 30;
      if (monthlyIncome >= 8000) score += 10;
    }

    // Employment status
    if (employment === "employed") {
      score += 40;
      approvalLikelihood = "high";
    } else if (employment === "self-employed") {
      score += 20;
      approvalLikelihood = "medium";
    } else {
      score += 10;
      approvalLikelihood = "low";
    }

    // Recommended loan amount based on income
    const recommendedAmount = Math.min(
      Math.max(monthlyIncome * 2, 1000),
      50000
    );

    const eligible = score >= 50;
    const message = eligible
      ? "Great news! You're likely to be approved. Apply now to get cash today."
      : "You may still qualify. Apply now and our team will review your application.";

    setResult({
      eligible,
      score,
      message,
      recommendedAmount,
      approvalLikelihood,
    });
  };

  if (result) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {result.eligible ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                You're Likely Approved!
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6 text-amber-600" />
                Let's Check Your Eligibility
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">{result.message}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Approval Likelihood</p>
              <p className="text-lg font-semibold capitalize">
                {result.approvalLikelihood === "high" && "✅ High (80%+)"}
                {result.approvalLikelihood === "medium" && "⚠️ Medium (50-70%)"}
                {result.approvalLikelihood === "low" && "📋 Low (Apply Anyway)"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Recommended Loan Amount</p>
              <p className="text-2xl font-bold text-primary">
                R {result.recommendedAmount.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Your Score</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(result.score, 100)}%` }}
                  />
                </div>
                <span className="font-semibold">{result.score}/100</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 h-12"
            onClick={() => setStep(0)}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Quick Eligibility Check
        </CardTitle>
        <CardDescription>
          Answer a few quick questions to see if you qualify
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Age Question */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold">How old are you?</label>
            <span className="text-2xl font-bold text-primary">{age} years</span>
          </div>
          <Slider
            value={[age]}
            onValueChange={(value) => setAge(value[0])}
            min={18}
            max={75}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>18</span>
            <span>75</span>
          </div>
        </div>

        {/* Income Question */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold">Monthly Income</label>
            <span className="text-2xl font-bold text-primary">R {monthlyIncome.toLocaleString()}</span>
          </div>
          <Slider
            value={[monthlyIncome]}
            onValueChange={(value) => setMonthlyIncome(value[0])}
            min={0}
            max={50000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>R 0</span>
            <span>R 50,000+</span>
          </div>
        </div>

        {/* Employment Question */}
        <div>
          <label className="text-sm font-semibold mb-4 block">Employment Status</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "employed", label: "Employed" },
              { value: "self-employed", label: "Self-Employed" },
              { value: "other", label: "Other" },
            ].map((option) => (
              <Button
                key={option.value}
                variant={employment === option.value ? "default" : "outline"}
                className="h-12"
                onClick={() => setEmployment(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
          onClick={calculateEligibility}
        >
          Check My Eligibility
        </Button>
      </CardContent>
    </Card>
  );
}
