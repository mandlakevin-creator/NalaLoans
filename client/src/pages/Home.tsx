import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, CheckCircle, DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanPeriod, setLoanPeriod] = useState(30);

  // Client-side loan calculation (no API calls needed)
  const calculation = useMemo(() => {
    const principal = loanAmount;
    const interestFee = Math.round(principal * 0.20); // 20% interest (NCR cap)
    const adminFee = Math.round(principal * 0.20); // 20% admin/operational/insurance fees
    const totalFees = interestFee + adminFee;
    const totalRepayment = principal + totalFees;
    const dailyInstallment = Math.round(totalRepayment / loanPeriod);
    const monthlyInstallment = Math.round(totalRepayment / (loanPeriod / 30));
    
    return {
      principal,
      interestFee,
      adminFee,
      totalFees,
      totalRepayment,
      dailyInstallment,
      monthlyInstallment,
      loanPeriod,
    };
  }, [loanAmount, loanPeriod]);

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
                Get Cash Fast, No Stress
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                When you need money now, NALA delivers. Simple application, instant approval, money in your account same day. Trusted by thousands of South Africans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => (window.location.href = "#features")}
                >
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Your Exact Cost</h2>
              <p className="text-lg text-muted-foreground">
                Adjust the amount and timeframe to see exactly what you'll pay. No surprises, no hidden fees.
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>How Much Do You Need?</CardTitle>
                <CardDescription>Choose your loan amount and how long you need to repay it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Loan Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold">Loan Amount</label>
                    <span className="text-2xl font-bold text-primary">R {loanAmount.toLocaleString()}</span>
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
                    <label className="text-sm font-semibold">Repay In</label>
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
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-lg font-semibold">R {calculation.principal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest</p>
                      <p className="text-lg font-semibold">R {calculation.interestFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fees</p>
                      <p className="text-lg font-semibold">R {calculation.adminFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">You Pay Back</p>
                      <p className="text-lg font-semibold text-primary">R {calculation.totalRepayment.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Per Month</p>
                    <p className="text-3xl font-bold text-primary">R {calculation.monthlyInstallment.toLocaleString()}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Apply for This Loan <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why South Africans Trust NALA</h2>
            <p className="text-lg text-muted-foreground">
              Real loans for real people. No nonsense, just the money you need, when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Money Same Day",
                description: "Apply in the morning, have cash in your account by afternoon. No waiting around."
              },
              {
                icon: DollarSign,
                title: "What You See Is What You Pay",
                description: "No hidden charges. We show you the exact amount upfront. No surprises when you repay."
              },
              {
                icon: CheckCircle,
                title: "5 Minutes to Apply",
                description: "Simple online form. Your ID, income, and bank details. That's it. No paperwork, no hassle."
              },
              {
                icon: Users,
                title: "Trusted Since Day One",
                description: "Thousands of working South Africans have used NALA. We're here to help, not to judge."
              },
              {
                icon: TrendingUp,
                title: "Repay When It Suits You",
                description: "7 days to 6 months. Choose what works for your budget. Pay early with no penalties."
              },
              {
                icon: CheckCircle,
                title: "Always There for You",
                description: "Questions at 2am? We're here. Real support from real people who understand your situation."
              }
            ].map((feature, i) => (
              <Card key={i} className="border-border">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop Worrying About Money</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the cash you need today. Fast approval, transparent pricing, real support. Apply now.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Start Your Application <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">NALA</h3>
              <p className="text-sm text-muted-foreground">Fast, simple, and honest personal loans for South Africa.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#calculator" className="text-muted-foreground hover:text-foreground">Loan Calculator</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground">How It Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Eligibility</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Code of Practice</a></li>
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
