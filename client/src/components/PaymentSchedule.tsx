import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface PaymentScheduleProps {
  loanAmount: number;
  loanPeriodDays: number;
  totalRepayment: number;
}

export function PaymentSchedule({ loanAmount, loanPeriodDays, totalRepayment }: PaymentScheduleProps) {
  // Generate payment schedule
  const payments: Array<{ date: string; amount: number; dayNumber: number }> = [];
  const dailyAmount = Math.round(totalRepayment / loanPeriodDays);
  const today = new Date();

  for (let i = 1; i <= loanPeriodDays; i++) {
    const paymentDate = new Date(today);
    paymentDate.setDate(paymentDate.getDate() + i);

    payments.push({
      dayNumber: i,
      date: paymentDate.toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      amount: i === loanPeriodDays ? totalRepayment - dailyAmount * (loanPeriodDays - 1) : dailyAmount,
    });
  }

  // Show first 5 and last payment
  const displayPayments = [
    ...payments.slice(0, 5),
    ...(payments.length > 10 ? [{ dayNumber: -1, date: "...", amount: 0 }] : []),
    ...payments.slice(-1),
  ];

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Your Payment Schedule
        </CardTitle>
        <CardDescription>
          Exact dates and amounts you'll pay over {loanPeriodDays} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayPayments.map((payment, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-3 rounded-lg ${
                payment.dayNumber === -1
                  ? "bg-muted text-center justify-center"
                  : "bg-muted/50 hover:bg-muted transition-colors"
              }`}
            >
              {payment.dayNumber === -1 ? (
                <span className="text-muted-foreground">...</span>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium">{payment.date}</p>
                    <p className="text-xs text-muted-foreground">Day {payment.dayNumber}</p>
                  </div>
                  <p className="font-semibold text-primary">R {payment.amount.toLocaleString()}</p>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Total to Repay</p>
          <p className="text-2xl font-bold text-primary">R {totalRepayment.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
