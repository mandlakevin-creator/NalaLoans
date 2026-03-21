import { useState } from "react";
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
import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    age: 30,
    monthlyIncome: 5000,
    employmentStatus: "employed" as const,
    requestedAmount: 5000,
  });

  const [submitted, setSubmitted] = useState(false);

  const { data: result, isLoading } = trpc.eligibility.checkEligibility.useQuery(formData, { enabled: submitted });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Loan Eligibility Checker</h1>
          <p className="text-muted-foreground">
            Find out if you qualify for a NALA loan and get your recommended loan amount
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Provide some basic information to check your eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleChange("age", parseInt(e.target.value))}
                    className="input-field"
                  />
                  <p className="text-xs text-muted-foreground">Must be between 18 and 75 years old</p>
                </div>

                {/* Monthly Income */}
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income (R)</Label>
                  <Input
                    id="income"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleChange("monthlyIncome", parseFloat(e.target.value))}
                    className="input-field"
                  />
                  <p className="text-xs text-muted-foreground">Your gross monthly income</p>
                </div>

                {/* Employment Status */}
                <div className="space-y-2">
                  <Label htmlFor="employment">Employment Status</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => handleChange("employmentStatus", value)}
                  >
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

                {/* Requested Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Requested Loan Amount (R)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1000"
                    max="50000"
                    step="500"
                    value={formData.requestedAmount}
                    onChange={(e) => handleChange("requestedAmount", parseFloat(e.target.value))}
                    className="input-field"
                  />
                  <p className="text-xs text-muted-foreground">Between R1,000 and R50,000</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 h-10"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Checking...
                    </>
                  ) : (
                    "Check Eligibility"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
            {submitted && result ? (
              <Card className={result.isEligible ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {result.isEligible ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <CardTitle className={result.isEligible ? "text-green-900" : "text-red-900"}>
                        {result.isEligible ? "Great News!" : "Not Eligible Yet"}
                      </CardTitle>
                      <CardDescription className={result.isEligible ? "text-green-800" : "text-red-800"}>
                        {result.isEligible
                          ? "You appear to qualify for a NALA loan"
                          : "You don't currently meet our eligibility criteria"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Eligibility Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Eligibility Score</span>
                      <span className="text-2xl font-bold text-primary">{result.score}/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Max Loan Amount */}
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Maximum Loan Amount</p>
                        <p className="text-2xl font-bold text-primary">
                          R{result.maxLoanAmount.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary/30" />
                    </div>
                  </div>

                  {/* Recommended Amount */}
                  {result.recommendedAmount < result.maxLoanAmount && (
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Recommended Amount</p>
                      <p className="text-xl font-bold text-primary">
                        R{result.recommendedAmount.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Reasons */}
                  {result.reasons.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-3">Areas to Improve:</p>
                      <ul className="space-y-2">
                        {result.reasons.map((reason: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <Button className="w-full bg-primary hover:bg-primary/90 h-10">
                    {result.isEligible ? "Apply Now" : "Learn How to Qualify"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Fill in your information on the left and click "Check Eligibility" to see your results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
