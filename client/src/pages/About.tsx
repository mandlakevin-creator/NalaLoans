import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Target, Heart, Award } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

export default function About() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl text-foreground">NALA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/#calculator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Calculator
            </a>
            <a href="/faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="/about" className="text-sm font-medium text-primary transition-colors font-semibold">
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/8 via-background to-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About NALA
            </h1>
            <p className="text-lg text-muted-foreground">
              Transforming lending for South Africans. Fast, transparent, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                NALA exists to make borrowing easy, transparent, and stress-free for South Africans. We believe that everyone deserves access to fair, honest credit when they need it most.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're built by South Africans, for South Africans. We understand the challenges of unexpected expenses, emergency situations, and the need for quick access to cash. That's why we've created a lending platform that puts you first.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Transparency</h3>
                        <p className="text-muted-foreground">No hidden fees. No surprises. We show you exactly what you'll pay upfront.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Speed</h3>
                        <p className="text-muted-foreground">Approval in 5 minutes. Money in your account same day. We respect your time.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Integrity</h3>
                        <p className="text-muted-foreground">We're regulated, compliant, and committed to doing the right thing.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Support</h3>
                        <p className="text-muted-foreground">24/7 customer support. We're here to help whenever you need us.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Why NALA?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Trusted by 50,000+ South Africans</h3>
                    <p className="text-muted-foreground">Join thousands of satisfied customers who've accessed credit quickly and fairly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">NCRA Registered & Compliant</h3>
                    <p className="text-muted-foreground">We're regulated by the National Credit Regulator and comply with all POPIA requirements.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Bank-Level Security</h3>
                    <p className="text-muted-foreground">Your data is encrypted with 256-bit encryption and protected with bank-level security.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Simple & Fast</h3>
                    <p className="text-muted-foreground">Apply in 5 minutes. Get approved in 5 minutes. Get cash same day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Transparent Pricing</h3>
                    <p className="text-muted-foreground">40% total cost. No hidden fees. No surprises. What you see is what you pay.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of South Africans who've found financial relief with NALA.
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
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/#calculator" className="hover:text-primary transition-colors">Calculator</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
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
