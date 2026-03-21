import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, CheckCircle, DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanPeriod, setLoanPeriod] = useState(30);

  // Get loan products for calculator
  const { data: products, isLoading: productsLoading } = trpc.calculator.getLoanProducts.useQuery();

  // Calculate loan details
  const { data: calculation } = trpc.calculator.calculateLoan.useQuery(
    {
      amount: loanAmount,
      periodDays: loanPeriod,
      interestRate: 40, // NALA's interest rate (40% annual)
      processingFee: 5, // 5% processing fee
    },
    { enabled: !!products }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-lg text-foreground">NALA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">
              Calculator
            </a>
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => (window.location.href = getLoginUrl())}>
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Fast, Simple, & Honest Loans
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get the funds you need with confidence. NALA offers quick, flexible personal loans with transparent terms and instant decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 aspect-square flex items-center justify-center">
                <DollarSign className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section id="calculator" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan Calculator</h2>
              <p className="text-lg text-muted-foreground">
                See exactly what your loan will cost. Adjust the sliders to explore your options.
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Calculate Your Loan</CardTitle>
                <CardDescription>Adjust the loan amount and period to see your monthly payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Loan Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold">Loan Amount</label>
                    <span className="text-2xl font-bold text-primary">R{loanAmount.toLocaleString()}</span>
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

                {/* Loan Period Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold">Loan Period</label>
                    <span className="text-2xl font-bold text-primary">{loanPeriod} days</span>
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

                {/* Calculation Results */}
                {calculation ? (
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Principal</p>
                        <p className="text-lg font-semibold">R{calculation.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest</p>
                        <p className="text-lg font-semibold">R{calculation.interest.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Processing Fee</p>
                        <p className="text-lg font-semibold">R{calculation.processingFee.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Repayment</p>
                        <p className="text-lg font-semibold text-primary">R{calculation.totalRepayment.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-2">Monthly Installment</p>
                      <p className="text-3xl font-bold text-primary">R{calculation.monthlyInstallment.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center h-40">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                )}

                <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
                  Apply for This Loan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NALA?</h2>
            <p className="text-lg text-muted-foreground">
              We make borrowing simple, transparent, and accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Quick & Flexible",
                description: "Get approved in minutes and receive funds instantly. Loans available for all purposes.",
              },
              {
                icon: TrendingUp,
                title: "Transparent Pricing",
                description: "No hidden fees. See exactly what you'll pay before you apply. 40% interest rate on all loans.",
              },
              {
                icon: CheckCircle,
                title: "Easy Application",
                description: "Simple online process. Just provide your ID, income details, and bank account information.",
              },
              {
                icon: Users,
                title: "Trusted by Thousands",
                description: "Join thousands of South Africans who trust NALA for their financial needs.",
              },
              {
                icon: DollarSign,
                title: "Flexible Repayment",
                description: "Choose your repayment period from 7 to 180 days. Pay early without penalties.",
              },
              {
                icon: ArrowRight,
                title: "24/7 Support",
                description: "Our customer support team is always ready to help with your questions and concerns.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Your Loan?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Apply now and get approved in minutes. Our simple process makes it easy to get the funds you need.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">N</span>
                </div>
                <span className="font-bold">NALA</span>
              </div>
              <p className="text-sm text-muted-foreground">Fast, Simple, & Honest Personal Loans</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Loan Calculator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Eligibility</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Code of Practice</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 NALA Personal Loans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
