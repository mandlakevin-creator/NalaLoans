import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 Ways to Build Better Financial Habits",
      excerpt: "Learn practical strategies to manage your money better and build wealth over time.",
      author: "Sarah Mthembu",
      date: "March 15, 2026",
      category: "Finance Tips"
    },
    {
      id: 2,
      title: "Emergency Fund: Why You Need One and How to Start",
      excerpt: "Discover why an emergency fund is crucial and how to build one even on a tight budget.",
      author: "James Pieterse",
      date: "March 10, 2026",
      category: "Savings"
    },
    {
      id: 3,
      title: "Understanding Credit Scores in South Africa",
      excerpt: "What is a credit score, how does it work, and how can you improve yours?",
      author: "Thandi Khumalo",
      date: "March 5, 2026",
      category: "Credit"
    },
    {
      id: 4,
      title: "Budgeting 101: Take Control of Your Money",
      excerpt: "Master the basics of budgeting and start taking control of your financial future.",
      author: "David Chen",
      date: "February 28, 2026",
      category: "Budgeting"
    },
    {
      id: 5,
      title: "Debt Management: Strategies That Actually Work",
      excerpt: "Practical tips for managing and paying off debt without feeling overwhelmed.",
      author: "Nomsa Dlamini",
      date: "February 20, 2026",
      category: "Debt"
    },
    {
      id: 6,
      title: "Side Hustles: Earn Extra Money in Your Spare Time",
      excerpt: "Explore legitimate side hustles that can help you earn extra income.",
      author: "Ravi Patel",
      date: "February 15, 2026",
      category: "Income"
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NALA Blog</h1>
            <p className="text-xl text-muted-foreground">
              Financial tips, money management advice, and stories from our community.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get a loan today and start building your financial future.
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
