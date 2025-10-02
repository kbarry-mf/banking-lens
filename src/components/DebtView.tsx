import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { DollarSign, TrendingDown, AlertCircle } from "lucide-react";

interface LoanSource {
  name: string;
  isCompetitor: boolean;
  totalDeposits: number;
  countDeposits: number;
  totalPayments: number;
  countPayments: number;
  frequency: string;
}

export const DebtView = () => {
  const loanSources: LoanSource[] = [
    {
      name: "OnDeck Capital",
      isCompetitor: true,
      totalDeposits: 150000,
      countDeposits: 3,
      totalPayments: 65000,
      countPayments: 24,
      frequency: "Weekly",
    },
    {
      name: "Kabbage",
      isCompetitor: true,
      totalDeposits: 75000,
      countDeposits: 2,
      totalPayments: 28000,
      countPayments: 12,
      frequency: "Bi-weekly",
    },
    {
      name: "SBA Loan - First Bank",
      isCompetitor: false,
      totalDeposits: 500000,
      countDeposits: 1,
      totalPayments: 32000,
      countPayments: 6,
      frequency: "Monthly",
    },
  ];

  const totalCompetitorPayments = loanSources
    .filter(l => l.isCompetitor)
    .reduce((sum, l) => sum + l.totalPayments, 0);
  
  const totalNonCompetitorPayments = loanSources
    .filter(l => !l.isCompetitor)
    .reduce((sum, l) => sum + l.totalPayments, 0);

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Loan Payments"
          value="$125,000"
          icon={TrendingDown}
        />
        <MetricCard
          label="Competitive Holdback"
          value="11.0%"
          variant="warning"
          icon={AlertCircle}
        />
        <MetricCard
          label="Non-Competitive Holdback"
          value="3.8%"
          variant="success"
        />
        <MetricCard
          label="Non-Fintech Loans"
          value="$500,000"
          icon={DollarSign}
        />
      </div>

      {/* Loan Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Sources Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Lender</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Total Deposits</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Deposits Count</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Total Payments</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Payments Count</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {loanSources.map((loan, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-4">
                      <p className="text-sm font-medium text-foreground">{loan.name}</p>
                    </td>
                    <td className="py-4 text-center">
                      {loan.isCompetitor ? (
                        <Badge variant="destructive">Competitor</Badge>
                      ) : (
                        <Badge className="bg-muted text-muted-foreground">Other</Badge>
                      )}
                    </td>
                    <td className="py-4 text-right text-sm text-foreground">
                      ${loan.totalDeposits.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-sm text-foreground">
                      {loan.countDeposits}
                    </td>
                    <td className="py-4 text-right text-sm text-foreground">
                      ${loan.totalPayments.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-sm text-foreground">
                      {loan.countPayments}
                    </td>
                    <td className="py-4 text-center">
                      <Badge variant="outline">{loan.frequency}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Debt Analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Competitive Debt Burden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Competitor Loan Payments</p>
                  <p className="text-xl font-semibold text-destructive">
                    ${totalCompetitorPayments.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  11.0% of monthly revenue - Above recommended threshold
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Payment Distribution</p>
                {loanSources.filter(l => l.isCompetitor).map((loan, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{loan.name}</span>
                    <span className="font-medium text-foreground">
                      ${loan.totalPayments.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Non-Competitive Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Non-Competitor Payments</p>
                  <p className="text-xl font-semibold text-success">
                    ${totalNonCompetitorPayments.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  3.8% of monthly revenue - Within acceptable range
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Payment Distribution</p>
                {loanSources.filter(l => !l.isCompetitor).map((loan, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{loan.name}</span>
                    <span className="font-medium text-foreground">
                      ${loan.totalPayments.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
