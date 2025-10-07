import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { DollarSign, TrendingDown, AlertCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
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
      {/* Summary Metrics - Single Row Layout */}
      <Card>
        <CardContent className="pt-4 pb-3 px-4">
          <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <ArrowUpCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Loan Payments</p>
                <p className="text-xl font-bold text-foreground">$125K</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <ArrowDownCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Loan Proceeds</p>
                <p className="text-xl font-bold text-foreground">$725K</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                <TrendingDown className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Competitor Payments</p>
                <p className="text-xl font-bold text-foreground">$93K</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Non-Comp Payments</p>
                <p className="text-xl font-bold text-foreground">$32K</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Sources - Different presentations per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Detailed Loan Sources Analysis</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Lender</th>
                    <th className="pb-2 text-center text-xs font-medium text-muted-foreground">Type</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Deposits</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Deposit Count</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Payments</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Payment Count</th>
                    <th className="pb-2 text-center text-xs font-medium text-muted-foreground">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {loanSources.map((loan, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2">
                        <p className="text-xs font-medium text-foreground">{loan.name}</p>
                      </td>
                      <td className="py-2 text-center">
                        {loan.isCompetitor ? (
                          <Badge variant="destructive" className="text-xs px-2 py-0.5">Competitor</Badge>
                        ) : (
                          <Badge className="bg-muted text-muted-foreground text-xs px-2 py-0.5">Other</Badge>
                        )}
                      </td>
                      <td className="py-2 text-right text-xs text-foreground">
                        ${loan.totalDeposits.toLocaleString()}
                      </td>
                      <td className="py-2 text-right text-xs text-foreground">{loan.countDeposits}</td>
                      <td className="py-2 text-right text-xs font-medium text-foreground">
                        ${loan.totalPayments.toLocaleString()}
                      </td>
                      <td className="py-2 text-right text-xs text-foreground">{loan.countPayments}</td>
                      <td className="py-2 text-center">
                        <Badge variant="outline" className="text-xs px-2 py-0.5">{loan.frequency}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm">Loan Payment Distribution</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {exploration === "decision" ? (
                <ChartContainer
                  config={{
                    payments: {
                      label: "Payments",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-48 w-full"
                >
                  <BarChart data={paymentChartData} margin={{ left: 32, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="payments" fill="var(--color-payments)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="space-y-3">
                  {loanSources.map((loan, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{loan.name}</span>
                          {loan.isCompetitor && <Badge variant="destructive" className="text-xs px-2 py-0.5">Comp</Badge>}
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
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm">Lender Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {loanSources.map((loan, idx) => (
                  <div key={idx} className="rounded-lg border p-3">
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
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <Card className="p-3">
          <div className="flex items-start gap-3">
            <div className="w-1 self-stretch rounded-full flex-shrink-0 bg-warning" />
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Competitive Loan Payments</p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-foreground">
                  ${totalCompetitorPayments.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">11.0% Holdback</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">Non-Competitive Loan Payments</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-foreground">
                ${totalNonCompetitorPayments.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">3.8% Holdback</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
