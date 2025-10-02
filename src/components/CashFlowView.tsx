import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";

interface CashFlowViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const CashFlowView = ({ exploration }: CashFlowViewProps) => {
  const monthlyData = [
    { month: "Jan", revenue: 685000, cashFlow: 92000, deposits: 42, transfers: 125000 },
    { month: "Feb", revenue: 720000, cashFlow: 108000, deposits: 45, transfers: 132000 },
    { month: "Mar", revenue: 695000, cashFlow: 95000, deposits: 41, transfers: 118000 },
    { month: "Apr", revenue: 735000, cashFlow: 112000, deposits: 48, transfers: 145000 },
    { month: "May", revenue: 710000, cashFlow: 102000, deposits: 44, transfers: 138000 },
    { month: "Jun", revenue: 705000, cashFlow: 98000, deposits: 43, transfers: 128000 },
  ];

  const chartData = monthlyData.slice(-3);

  return (
    <div className="space-y-6">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Loan Activity</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">$625,000</p>
                  <p className="mt-1 text-xs text-muted-foreground">Proceeds minus Payments</p>
                </div>
                <DollarSign className="h-12 w-12 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cash Health Status</p>
                  <p className="mt-2 text-3xl font-bold text-success">Strong</p>
                  <p className="mt-1 text-xs text-muted-foreground">3 overdrafts in 6 months</p>
                </div>
                <TrendingUp className="h-12 w-12 text-success/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Total Loan Payments" value="$125,000" icon={TrendingDown} variant="warning" />
          <MetricCard label="Total Loan Proceeds" value="$500,000" icon={TrendingUp} variant="success" />
          <MetricCard label="Overdraft Count" value="3" icon={AlertTriangle} variant="destructive" />
          <MetricCard label="Bank Accounts" value="2 Accounts" description="Chase Business, Wells Fargo" />
        </div>
      )}

      {/* Monthly Analysis - Different views per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Monthly Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Month</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Revenue</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Cash Flow</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">CF %</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Deposits</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Transfers In</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium text-foreground">{data.month}</td>
                      <td className="py-3 text-right text-sm text-foreground">${data.revenue.toLocaleString()}</td>
                      <td className="py-3 text-right text-sm text-foreground">${data.cashFlow.toLocaleString()}</td>
                      <td className="py-3 text-right text-sm font-medium text-success">
                        {((data.cashFlow / data.revenue) * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 text-right text-sm text-foreground">{data.deposits}</td>
                      <td className="py-3 text-right text-sm text-foreground">${data.transfers.toLocaleString()}</td>
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
              <CardTitle className="text-base">Cash Flow Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cashFlow: {
                    label: "Cash Flow",
                    color: exploration === "executive" ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))",
                  },
                }}
                className="h-64"
              >
                {exploration === "decision" ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cashFlow" fill="var(--color-cashFlow)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cashFlow" stroke="var(--color-cashFlow)" strokeWidth={2} />
                  </LineChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Transfer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  transfers: {
                    label: "Transfers",
                    color: exploration === "executive" ? "hsl(var(--primary))" : "hsl(var(--chart-3))",
                  },
                }}
                className="h-64"
              >
                {exploration === "decision" ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="transfers" fill="var(--color-transfers)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="transfers" stroke="var(--color-transfers)" fill="var(--color-transfers)" fillOpacity={0.3} />
                  </AreaChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risk Indicators - Different presentations per exploration */}
      <div className="grid gap-4 lg:grid-cols-2">
        {exploration === "executive" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-destructive bg-destructive/5 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">NSF Activity Detected</p>
                      <p className="mt-1 text-sm text-muted-foreground">$450 in fees across 3 incidents</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border-l-4 border-warning bg-warning/5 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Returned Items</p>
                      <p className="mt-1 text-sm text-muted-foreground">$1,250 across 2 items</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">NSF Fees & Returned Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Total NSF Fees</p>
                    <p className="mt-1 text-2xl font-semibold text-destructive">$450</p>
                  </div>
                  <Badge variant="destructive">3 Incidents</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Returned Items</p>
                    <p className="mt-1 text-2xl font-semibold text-warning">$1,250</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">2 Items</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Deposit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {exploration === "decision" ? (
              <ChartContainer
                config={{
                  deposits: {
                    label: "Deposits",
                    color: "hsl(var(--success))",
                  },
                }}
                className="h-48"
              >
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="deposits" fill="var(--color-deposits)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="space-y-4">
                {chartData.map((data, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{data.month}</span>
                      <span className="font-medium text-foreground">{data.deposits} deposits</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-success" style={{ width: `${(data.deposits / 50) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
