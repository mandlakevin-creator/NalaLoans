import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Target, Heart } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-lg">NALA</span>
          </a>
          <Button size="sm" onClick={() => (window.location.href = getLoginUrl())}>
            Login
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About NALA</h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to make personal lending simple, transparent, and accessible to every South African.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide fast, honest, and transparent personal loans to South Africans who need them most.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  Transparency, honesty, and customer-first thinking guide everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Community</h3>
                <p className="text-muted-foreground">
                  Thousands of South Africans trust NALA for their financial needs every day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                NALA was founded with a simple belief: getting a loan shouldn't be complicated. We saw too many South Africans struggling to access quick, honest credit when they needed it most.
              </p>
              <p>
                Traditional lenders were slow, opaque, and often rejected people based on outdated criteria. We knew there had to be a better way.
              </p>
              <p>
                So we built NALA. A lending platform designed for real people, with real needs, in the real world. No judgment. No nonsense. Just fast, transparent loans.
              </p>
              <p>
                Today, thousands of South Africans use NALA every month to get the cash they need. We're proud to be part of their financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of South Africans who trust NALA for their financial needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
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
                <li><a href="/" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
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
