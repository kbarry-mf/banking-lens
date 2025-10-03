import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { DollarSign, TrendingDown, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface LoanSource {
  name: string;
  isCompetitor: boolean;
  totalDeposits: number;
  countDeposits: number;
  totalPayments: number;
  countPayments: number;
  frequency: string;
}

interface DebtViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const DebtView = ({ exploration }: DebtViewProps) => {
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

  const paymentChartData = loanSources.map(loan => ({
    name: loan.name.split(' ')[0],
    payments: loan.totalPayments,
  }));

  const COLORS = ['hsl(var(--destructive))', 'hsl(var(--warning))', 'hsl(var(--success))'];

  return (
    <div className="space-y-4">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Debt Risk Assessment</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-warning">Moderate</p>
                  <Badge variant="outline" className="border-warning text-warning text-xs px-2 py-0.5">11% Holdback</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Competitive debt at threshold. Non-competitive debt acceptable.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">$125K</p>
                  <p className="mt-1 text-xs text-muted-foreground">Total Monthly Payments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Total Loan Payments" value="$125,000" icon={TrendingDown} />
          <MetricCard label="Competitive Holdback" value="11.0%" variant="warning" icon={AlertCircle} />
          <MetricCard label="Non-Competitive Holdback" value="3.8%" variant="success" />
          <MetricCard label="Non-Fintech Loans" value="$500,000" icon={DollarSign} />
        </div>
      )}

      {/* Loan Sources - Different presentations per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Loan Sources Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Lender</th>
                    <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Type</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Deposits</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Deposit Count</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Payments</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Payment Count</th>
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
                      <td className="py-4 text-right text-sm text-foreground">{loan.countDeposits}</td>
                      <td className="py-4 text-right text-sm font-medium text-foreground">
                        ${loan.totalPayments.toLocaleString()}
                      </td>
                      <td className="py-4 text-right text-sm text-foreground">{loan.countPayments}</td>
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
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Loan Payment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {exploration === "decision" ? (
                <ChartContainer
                  config={{
                    payments: {
                      label: "Payments",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-64 pl-3"
                >
                  <BarChart data={paymentChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="payments" fill="var(--color-payments)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="space-y-4">
                  {loanSources.map((loan, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{loan.name}</span>
                          {loan.isCompetitor && <Badge variant="destructive" className="text-xs">Comp</Badge>}
                        </div>
                        <span className="font-semibold text-foreground">
                          ${loan.totalPayments.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div 
                          className={loan.isCompetitor ? "h-full bg-destructive" : "h-full bg-success"}
                          style={{ width: `${(loan.totalPayments / 65000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lender Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanSources.map((loan, idx) => (
                  <div key={idx} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-medium text-foreground">{loan.name}</p>
                      {loan.isCompetitor ? (
                        <Badge variant="destructive">Competitor</Badge>
                      ) : (
                        <Badge variant="outline">Non-Comp</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p className="font-medium text-foreground">{loan.frequency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payments</p>
                        <p className="font-medium text-foreground">{loan.countPayments}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Debt Burden Analysis - Different presentations per exploration */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {exploration === "executive" ? "Competitive Risk" : "Competitive Debt Burden"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Competitor Payments</p>
                  <p className="text-xl font-semibold text-destructive">
                    ${totalCompetitorPayments.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  11.0% of monthly revenue - {exploration === "executive" ? "Monitor closely" : "Above recommended threshold"}
                </p>
              </div>
              {exploration !== "executive" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Payment Breakdown</p>
                  {loanSources.filter(l => l.isCompetitor).map((loan, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded border p-2 text-sm">
                      <span className="text-foreground">{loan.name}</span>
                      <span className="font-medium text-foreground">
                        ${loan.totalPayments.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {exploration === "executive" ? "Traditional Debt" : "Non-Competitive Debt"}
            </CardTitle>
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
                  3.8% of monthly revenue - {exploration === "executive" ? "Healthy level" : "Within acceptable range"}
                </p>
              </div>
              {exploration !== "executive" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Payment Breakdown</p>
                  {loanSources.filter(l => !l.isCompetitor).map((loan, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded border p-2 text-sm">
                      <span className="text-foreground">{loan.name}</span>
                      <span className="font-medium text-foreground">
                        ${loan.totalPayments.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
