import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowRight, CheckCircle, Clock, Shield, Zap, Users, TrendingUp, 
  DollarSign, FileCheck, Smartphone, HeartHandshake, Star
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanPeriod, setLoanPeriod] = useState(30);

  // Client-side loan calculation - 40% total cost breakdown
  // 20% interest (NCR cap) + 20% admin/operational/insurance fees
  const calculation = useMemo(() => {
    const principal = loanAmount;
    const interestFee = Math.round(principal * 0.20);
    const adminFee = Math.round(principal * 0.20);
    const totalFees = interestFee + adminFee;
    const totalRepayment = principal + totalFees;
    const monthlyInstallment = Math.round(totalRepayment / (loanPeriod / 30));
    
    return {
      principal,
      interestFee,
      adminFee,
      totalFees,
      totalRepayment,
      monthlyInstallment,
      loanPeriod,
      totalCostPercentage: 40,
    };
  }, [loanAmount, loanPeriod]);

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl text-foreground">NALA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#calculator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Calculator
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="/faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
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
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => (window.location.href = getLoginUrl())}>
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/8 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-medium text-primary">✨ Trusted by 50,000+ South Africans</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get Cash Fast, <span className="text-primary">No Stress</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Simple application. Instant approval. Money in your account same day. NALA makes borrowing easy, transparent, and stress-free.
              </p>
              
              <div className="flex gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 gap-2"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Calculator
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">5 min</div>
                  <p className="text-sm text-muted-foreground">Quick Apply</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <p className="text-sm text-muted-foreground">Transparent</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-3xl p-12 aspect-square flex items-center justify-center shadow-2xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                  <DollarSign className="w-48 h-48 text-primary/40 relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Calculator Section - Wonga Style */}
      <section id="calculator" className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                See Your Exact Cost
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing. No hidden fees. What you see is what you pay. Total cost: 40% (20% interest + 20% fees).
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Calculator Card */}
              <div className="md:col-span-2">
                <Card className="border-2 shadow-xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Loan Calculator</CardTitle>
                    <CardDescription>Adjust the sliders to see your personalized quote</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Loan Amount Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-foreground">How Much Do You Need?</label>
                        <div className="text-2xl font-bold text-primary">R {loanAmount.toLocaleString()}</div>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={(val) => setLoanAmount(val[0])}
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
                        <label className="text-sm font-semibold text-foreground">Repay In</label>
                        <div className="text-2xl font-bold text-primary">{loanPeriod} days</div>
                      </div>
                      <Slider
                        value={[loanPeriod]}
                        onValueChange={(val) => setLoanPeriod(val[0])}
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
                  </CardContent>
                </Card>
              </div>

              {/* Summary Card - Wonga Style Transparent Breakdown */}
              <div>
                <Card className="border-2 bg-gradient-to-br from-primary/5 to-background shadow-xl sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Quote</CardTitle>
                    <CardDescription className="text-xs">Total cost: 40%</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {/* Loan Amount */}
                      <div className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold text-base">R {calculation.principal.toLocaleString()}</span>
                      </div>

                      {/* Interest - 20% */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Interest</span>
                        <span className="font-semibold text-base">R {calculation.interestFee.toLocaleString()}</span>
                      </div>

                      {/* Fees - 20% */}
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Fees</span>
                        <span className="font-semibold text-base">R {calculation.adminFee.toLocaleString()}</span>
                      </div>

                      {/* Total You Pay Back */}
                      <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-3">
                        <span className="font-semibold text-foreground">You Pay Back</span>
                        <span className="text-2xl font-bold text-primary">R {calculation.totalRepayment.toLocaleString()}</span>
                      </div>

                      {/* Per Month */}
                      <div className="bg-background rounded-lg p-3 border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Per Month</div>
                        <div className="text-xl font-bold text-foreground">R {calculation.monthlyInstallment.toLocaleString()}</div>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 mt-6"
                      onClick={() => (window.location.href = getLoginUrl())}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get cash in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileCheck, title: "Apply", description: "Fill out a simple online form in 5 minutes" },
              { icon: CheckCircle, title: "Verify", description: "We verify your details instantly" },
              { icon: Zap, title: "Approve", description: "Get instant approval decision" },
              { icon: DollarSign, title: "Receive", description: "Money in your account same day" }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why Choose NALA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're built for South Africans, by South Africans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure & Safe", description: "Your data is encrypted and protected with bank-level security" },
              { icon: Clock, title: "Fast & Simple", description: "Apply in 5 minutes from your phone or computer" },
              { icon: TrendingUp, title: "Transparent Pricing", description: "No hidden fees. 40% total cost, clearly shown upfront" },
              { icon: Users, title: "Real Support", description: "24/7 customer support team ready to help" },
              { icon: Smartphone, title: "Easy Management", description: "Track your loan and make payments through our app" },
              { icon: HeartHandshake, title: "Trusted Partner", description: "Helping 50,000+ South Africans access credit" }
            ].map((feature, idx) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="pt-6">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from real South Africans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Thabo M.", location: "Johannesburg", text: "Got my loan approved in 10 minutes. The process was so simple and transparent. Highly recommend!" },
              { name: "Naledi K.", location: "Cape Town", text: "Finally, a lender that doesn't hide fees. I knew exactly what I was paying. Great service!" },
              { name: "Sipho L.", location: "Durban", text: "Money was in my account same day. NALA is a lifesaver. Best lending experience I've had." }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Get Cash?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Apply now and get approved in minutes. Money in your account same day.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 gap-2"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">NALA</h3>
              <p className="text-sm text-muted-foreground">Fast, transparent personal loans for South Africans.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#calculator" className="hover:text-primary transition-colors">Calculator</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 NALA Personal Loans. All rights reserved. Licensed lender in South Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
