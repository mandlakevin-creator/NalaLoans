import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function FAQPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much can I borrow?",
      answer: "You can borrow between R1,000 and R50,000. First-time borrowers typically start with lower amounts and can increase their limit after successfully repaying their first loan."
    },
    {
      question: "What's the total cost of borrowing?",
      answer: "The total cost is 40% of your loan amount. This breaks down as: 20% interest (NCR regulated cap) + 20% fees (administrative, operational, and insurance). For example, if you borrow R5,000, you'll pay back R7,000."
    },
    {
      question: "How long do I have to repay?",
      answer: "You can choose repayment periods from 7 to 180 days. Popular options are 7 days (emergency), 30 days (standard), and 90 days (longer-term). The longer the period, the lower your monthly payment."
    },
    {
      question: "How quickly can I get approved?",
      answer: "Most applications are approved within 5 minutes. Once approved, money is typically transferred to your bank account within 1 hour, same day."
    },
    {
      question: "What documents do I need?",
      answer: "You'll need your South African ID number, email address, phone number, monthly income information, and bank account details for disbursement. That's it!"
    },
    {
      question: "Is my data safe?",
      answer: "Yes. We use 256-bit encryption to protect your data. We're POPIA compliant and never share your information with third parties without your consent."
    },
    {
      question: "What if I can't repay on time?",
      answer: "Contact our support team immediately. We offer flexible repayment options and can discuss alternative arrangements. Late payments may incur additional fees."
    },
    {
      question: "Can I pay early?",
      answer: "Yes! You can repay your loan early at any time without penalties. Early repayment will reduce the total interest you pay."
    },
    {
      question: "Is NALA regulated?",
      answer: "Yes. NALA is registered with the NCRA (National Credit Regulator of South Africa) and complies with all NCR regulations and POPIA requirements."
    },
    {
      question: "How do I apply?",
      answer: "Click 'Apply Now' and fill out our simple online form. It takes about 5 minutes. You'll need your ID number, email, phone, income details, and bank account information."
    },
    {
      question: "Can I get a loan if I have bad credit?",
      answer: "We consider applications from people with various credit histories. Your eligibility depends on factors like income, employment status, and age. Use our calculator to check if you qualify."
    },
    {
      question: "What's your customer support like?",
      answer: "We offer 24/7 customer support via phone, email, and live chat. Our average response time is 2 minutes. We're here to help with any questions or concerns."
    }
  ];

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
            <a href="/faq" className="text-sm font-medium text-primary transition-colors font-semibold">
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/8 via-background to-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about NALA loans, application process, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border/50 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ml-4 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-border/50 bg-primary/2">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our 24/7 customer support team is ready to help. Contact us anytime.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
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
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Support
            </Button>
          </div>
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
