import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";

interface BalancesViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const BalancesView = ({ exploration }: BalancesViewProps) => {
  const monthlyBalances = [
    { month: "Jan", avgBalance: 425000, minBalance: 185000, negDays: 0 },
    { month: "Feb", avgBalance: 438000, minBalance: 195000, negDays: 0 },
    { month: "Mar", avgBalance: 412000, minBalance: 175000, negDays: 1 },
    { month: "Apr", avgBalance: 445000, minBalance: 205000, negDays: 0 },
    { month: "May", avgBalance: 430000, minBalance: 190000, negDays: 0 },
    { month: "Jun", avgBalance: 428000, minBalance: 188000, negDays: 0 },
  ];

  const chartData = monthlyBalances.slice(-3);

  return (
    <div className="space-y-6">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Average Daily Balance</p>
                <p className="mt-2 text-3xl font-bold text-success">$425K</p>
                <Badge className="mt-2 bg-success/10 text-success">Healthy</Badge>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Adjusted Balance</p>
                <p className="mt-2 text-3xl font-bold text-foreground">$398K</p>
                <p className="mt-2 text-xs text-muted-foreground">After adjustments</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">6-Month Minimum</p>
                <p className="mt-2 text-3xl font-bold text-foreground">$175K</p>
                <p className="mt-2 text-xs text-muted-foreground">Lowest point</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Average Daily Balance" value="$425,000" icon={TrendingUp} variant="success" />
          <MetricCard label="Adjusted Average Daily Balance" value="$398,500" icon={TrendingUp} />
          <MetricCard label="Minimum Balance (6 Mo)" value="$175,000" icon={TrendingDown} />
        </div>
      )}

      {/* Balance Trend Visualization - Different views per exploration */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Balance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgBalance: {
                  label: "Avg Balance",
                  color: exploration === "executive" ? "hsl(var(--success))" : 
                         exploration === "analyst" ? "hsl(var(--primary))" : 
                         "hsl(var(--chart-1))",
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
                  <Bar dataKey="avgBalance" fill="var(--color-avgBalance)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : exploration === "analyst" ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="avgBalance" stroke="var(--color-avgBalance)" strokeWidth={3} />
                </LineChart>
              ) : (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="avgBalance" stroke="var(--color-avgBalance)" fill="var(--color-avgBalance)" fillOpacity={0.4} />
                </AreaChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Minimum Balance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                minBalance: {
                  label: "Min Balance",
                  color: exploration === "executive" ? "hsl(var(--chart-2))" : 
                         exploration === "analyst" ? "hsl(var(--warning))" : 
                         "hsl(var(--chart-3))",
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
                  <Bar dataKey="minBalance" fill="var(--color-minBalance)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : exploration === "analyst" ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="minBalance" stroke="var(--color-minBalance)" strokeWidth={3} />
                </LineChart>
              ) : (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="minBalance" stroke="var(--color-minBalance)" fill="var(--color-minBalance)" fillOpacity={0.4} />
                </AreaChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis - Different formats per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Monthly Balance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Month</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Avg Balance</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Min Balance</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Variance</th>
                    <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Negative Days</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBalances.map((data, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium text-foreground">{data.month}</td>
                      <td className="py-3 text-right text-sm text-foreground">${data.avgBalance.toLocaleString()}</td>
                      <td className="py-3 text-right text-sm text-foreground">${data.minBalance.toLocaleString()}</td>
                      <td className="py-3 text-right text-sm font-medium text-foreground">
                        ${(data.avgBalance - data.minBalance).toLocaleString()}
                      </td>
                      <td className="py-3 text-center">
                        <Badge variant={data.negDays > 0 ? "destructive" : "outline"}>
                          {data.negDays}
                        </Badge>
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
              <CardTitle className="text-base">Balance Health Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Stable Balance History</p>
                      <p className="text-xs text-muted-foreground">Consistent positive balances</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                      <AlertCircle className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">1 Negative Balance Day</p>
                      <p className="text-xs text-muted-foreground">March 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Balance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">High Balance Days</span>
                    <span className="font-medium text-foreground">65%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-success" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Medium Balance Days</span>
                    <span className="font-medium text-foreground">30%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: '30%' }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Low Balance Days</span>
                    <span className="font-medium text-foreground">5%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-warning" style={{ width: '5%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
