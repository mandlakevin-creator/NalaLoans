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

  // Client-side loan calculation
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2"
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

      {/* Premium Calculator Section */}
      <section id="calculator" className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                See Your Exact Cost
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Adjust the sliders to explore your options. No hidden fees, no surprises. What you see is what you pay.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Calculator Card */}
              <div className="md:col-span-2">
                <Card className="border-2 shadow-xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Loan Calculator</CardTitle>
                    <CardDescription>Adjust to see your personalized quote</CardDescription>
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

              {/* Summary Card */}
              <div>
                <Card className="border-2 bg-gradient-to-br from-primary/5 to-background shadow-xl sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Quote</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">R {calculation.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest (20%)</span>
                        <span className="font-semibold">R {calculation.interestFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fees (20%)</span>
                        <span className="font-semibold">R {calculation.adminFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">You Pay Back</span>
                          <span className="text-2xl font-bold text-primary">R {calculation.totalRepayment.toLocaleString()}</span>
                        </div>
                      </div>
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
                      Apply for This Loan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-background via-primary/3 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to get the cash you need
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FileCheck, title: "Apply", desc: "Fill out a simple form with your details" },
              { icon: Zap, title: "Instant Decision", desc: "Get approved in minutes, not days" },
              { icon: DollarSign, title: "Get Funded", desc: "Money lands in your account same day" },
              { icon: HeartHandshake, title: "Repay Easy", desc: "Flexible repayment options that suit you" }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <Card className="border-2 h-full hover:shadow-lg transition-all">
                  <CardContent className="pt-8 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-primary/30">
                    <ArrowRight className="w-full h-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Why Choose NALA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're built for South Africans. Real loans for real people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Money Same Day", desc: "Apply in the morning, have cash by afternoon" },
              { icon: Shield, title: "100% Transparent", desc: "No hidden fees. See exactly what you'll pay" },
              { icon: Smartphone, title: "Mobile First", desc: "Apply anytime, anywhere from your phone" },
              { icon: Users, title: "Real Support", desc: "24/7 customer support that actually helps" },
              { icon: TrendingUp, title: "Flexible Terms", desc: "Choose repayment from 7 to 180 days" },
              { icon: CheckCircle, title: "Instant Approval", desc: "Know your decision in minutes, not days" }
            ].map((feature, idx) => (
              <Card key={idx} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Loved by South Africans</h2>
            <p className="text-lg text-muted-foreground">Join thousands who've gotten the cash they needed</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Thabo M.", rating: 5, text: "Got approved in 10 minutes. Money was in my account by evening. Incredible service!" },
              { name: "Naledi K.", rating: 5, text: "No hidden fees, no surprises. NALA is honest about what you'll pay. Highly recommend!" },
              { name: "Sipho N.", rating: 5, text: "Used NALA twice now. Fast, simple, and they actually care about their customers." }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Get Your Loan?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Apply now and get approved in minutes. Money in your account same day.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Start Your Application <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">N</span>
                </div>
                <span className="font-bold">NALA</span>
              </div>
              <p className="text-sm text-muted-foreground">Fast, simple, and honest loans for South Africans.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#calculator" className="hover:text-primary transition-colors">Calculator</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
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
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 NALA Personal Loans. All rights reserved. Licensed and regulated by the National Credit Regulator.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
