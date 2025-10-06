import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CashFlowViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const CashFlowView = ({ exploration }: CashFlowViewProps) => {
  // Calculate revenue and cash flow based on the formula:
  // Transfer In + Loan Deposits = Revenue
  // Revenue - Loan Payments - Transfers Out = Cash Flow
  const monthlyData = [
    { month: "Apr", transfersIn: 115000, loanDeposits: 85000, loanPayments: 22000, transfersOut: 45000 },
    { month: "May", transfersIn: 152000, loanDeposits: 95000, loanPayments: 25000, transfersOut: 52000 },
    { month: "Jun", transfersIn: 121000, loanDeposits: 78000, loanPayments: 21000, transfersOut: 38000 },
    { month: "Jul", transfersIn: 143000, loanDeposits: 88000, loanPayments: 23000, transfersOut: 48000 },
    { month: "Aug", transfersIn: 118000, loanDeposits: 72000, loanPayments: 19000, transfersOut: 35000 },
    { month: "Sep", transfersIn: 158000, loanDeposits: 102000, loanPayments: 27000, transfersOut: 55000 },
  ].map(row => ({
    ...row,
    revenue: row.transfersIn + row.loanDeposits,
    cashFlow: (row.transfersIn + row.loanDeposits) - row.loanPayments - row.transfersOut
  }));

  const bankAccounts = [
    { last4: "4521", bankName: "Chase Business", accountType: "Checking", beginDate: "2023-01-15", endDate: "2024-09-30" },
    { last4: "8832", bankName: "Wells Fargo", accountType: "Savings", beginDate: "2023-03-22", endDate: "2024-09-30" },
  ];

  const chartData = monthlyData;

  return (
    <div className="space-y-4">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Total Loan Activity</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">$625,000</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Proceeds minus Payments</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Cash Health Status</p>
                  <p className="mt-1 text-2xl font-bold text-success">Strong</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">3 overdrafts in 6 months</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1.5 text-xs">
              <span className="font-medium">Total Loan Payments:</span>
              <span className="ml-1.5 text-warning">$125,000</span>
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">
              <span className="font-medium">Total Loan Proceeds:</span>
              <span className="ml-1.5">$500,000</span>
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">
              <span className="font-medium">Overdraft Count:</span>
              <span className="ml-1.5 text-destructive">3</span>
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">
              <span className="font-medium">Total NSF Fees:</span>
              <span className="ml-1.5 text-destructive">$450</span>
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">
              <span className="font-medium">Returned Items:</span>
              <span className="ml-1.5 text-warning">$1,250</span>
            </Badge>
          </div>
          
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-sm">Bank Accounts</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Last 4</TableHead>
                    <TableHead className="text-xs">Bank Name</TableHead>
                    <TableHead className="text-xs">Account Type</TableHead>
                    <TableHead className="text-xs">Begin Date</TableHead>
                    <TableHead className="text-xs">End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bankAccounts.map((account, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-medium">{account.last4}</TableCell>
                      <TableCell className="text-xs">{account.bankName}</TableCell>
                      <TableCell className="text-xs">{account.accountType}</TableCell>
                      <TableCell className="text-xs">{account.beginDate}</TableCell>
                      <TableCell className="text-xs">{account.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Monthly Analysis - Different views per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Detailed Monthly Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Month</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Transfers In</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Loan Deposits</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Revenue</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Loan Payments</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Transfers Out</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Cash Flow</th>
                    <th className="pb-2 text-right text-xs font-medium text-muted-foreground">CF %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 text-xs font-medium text-foreground">{data.month}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.transfersIn.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.loanDeposits.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.revenue.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.loanPayments.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.transfersOut.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs text-foreground">${data.cashFlow.toLocaleString()}</td>
                      <td className="py-2 text-right text-xs font-medium text-success">
                        {((data.cashFlow / data.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm">Cash Flow Trend</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ChartContainer
                config={{
                  cashFlow: {
                    label: "Cash Flow",
                    color: exploration === "executive" ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))",
                  },
                }}
                className="h-48 w-full"
              >
                {exploration === "decision" ? (
                  <BarChart data={chartData} margin={{ left: 32, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="cashFlow" fill="var(--color-cashFlow)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={chartData} margin={{ left: 32, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Line type="monotone" dataKey="cashFlow" stroke="var(--color-cashFlow)" strokeWidth={2} dot={{ fill: "var(--color-cashFlow)", r: 4 }} fill="none" />
                  </LineChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm">Transfer Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ChartContainer
                config={{
                  transfersIn: {
                    label: "Transfers In",
                    color: exploration === "executive" ? "hsl(var(--primary))" : "hsl(var(--chart-3))",
                  },
                }}
                className="h-48 w-full"
              >
                {exploration === "decision" ? (
                  <BarChart data={chartData} margin={{ left: 32, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="transfersIn" fill="var(--color-transfersIn)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={chartData} margin={{ left: 32, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Line type="monotone" dataKey="transfersIn" stroke="var(--color-transfersIn)" strokeWidth={2} dot={{ fill: "var(--color-transfersIn)", r: 4 }} fill="none" />
                  </LineChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risk Indicators - Different presentations per exploration */}
      {exploration === "executive" ? (
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Risk Summary</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-destructive bg-destructive/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">NSF Activity Detected</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">$450 in fees across 3 overdrafts</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-warning bg-warning/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Returned Items</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">$1,250 across 2 items</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
