import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, DollarSign } from "lucide-react";

export function IncomeVerificationGuide() {
  const documents = [
    {
      icon: FileText,
      title: "Payslips",
      description: "Latest 3 months of payslips from your employer",
      requirement: "Required for employed individuals",
    },
    {
      icon: DollarSign,
      title: "Bank Statements",
      description: "Last 3 months of bank statements showing regular deposits",
      requirement: "Required for all applicants",
    },
    {
      icon: FileText,
      title: "ID Document",
      description: "Valid South African ID or passport",
      requirement: "Required for verification",
    },
    {
      icon: FileText,
      title: "Proof of Address",
      description: "Recent utility bill or bank statement with your address",
      requirement: "Required for verification",
    },
  ];

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          What You'll Need to Apply
        </CardTitle>
        <CardDescription>
          Have these ready to speed up your application process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex-shrink-0">
                <doc.icon className="w-6 h-6 text-primary mt-1" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{doc.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                <p className="text-xs font-medium text-primary">{doc.requirement}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-900">
            ✓ All documents are securely encrypted and stored. We never share your information with third parties.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
