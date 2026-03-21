import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can I get approved?",
      answer: "Most applications are approved within minutes. Once approved, funds are transferred to your bank account the same day."
    },
    {
      question: "What's the interest rate?",
      answer: "NALA charges 20% interest plus 20% in fees and operational costs, totaling 40% on your loan amount. This is transparent and shown upfront."
    },
    {
      question: "What do I need to apply?",
      answer: "You'll need a valid South African ID, proof of income (payslips or bank statements), and a bank account. The application takes about 5 minutes."
    },
    {
      question: "Can I repay early?",
      answer: "Yes! You can repay your loan early with no penalties. We encourage early repayment to save you money."
    },
    {
      question: "What if I can't repay on time?",
      answer: "Contact us immediately. We work with customers to find solutions. Late fees apply, but we're here to help, not punish."
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely. We use bank-level encryption to protect your data. Your information is never shared with third parties."
    },
    {
      question: "Can I apply if I'm self-employed?",
      answer: "Yes! We accept self-employed applicants. You'll need to provide bank statements showing regular income."
    },
    {
      question: "What's the maximum loan amount?",
      answer: "You can borrow up to R50,000. The exact amount depends on your income and employment status."
    },
    {
      question: "How long do I have to repay?",
      answer: "You can choose a repayment period from 7 days to 180 days. Pick what works best for your budget."
    },
    {
      question: "Do you do credit checks?",
      answer: "We do soft credit checks, but we don't reject people based on bad credit history. We focus on current income and ability to repay."
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about NALA loans.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className="border-border cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform ${
                        openIndex === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                {openIndex === index && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg mb-8 opacity-90">
            Our support team is ready to help. Get in touch anytime.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Us <ArrowRight className="ml-2 w-4 h-4" />
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
