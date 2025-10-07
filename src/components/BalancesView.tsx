import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface BalancesViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const BalancesView = ({ exploration }: BalancesViewProps) => {
const monthlyBalances = [
    { month: "Apr 2025", avgBalance: 418000, weightedAvgAdjBalance: 398000, maxBalance: 725000, minBalance: 178000, negDays: 1 },
    { month: "May 2025", avgBalance: 452000, weightedAvgAdjBalance: 431000, maxBalance: 782000, minBalance: 212000, negDays: 0 },
    { month: "Jun 2025", avgBalance: 408000, weightedAvgAdjBalance: 389000, maxBalance: 698000, minBalance: 171000, negDays: 0 },
    { month: "Jul 2025", avgBalance: 438000, weightedAvgAdjBalance: 418000, maxBalance: 751000, minBalance: 198000, negDays: 0 },
    { month: "Aug 2025", avgBalance: 415000, weightedAvgAdjBalance: 396000, maxBalance: 712000, minBalance: 182000, negDays: 0 },
    { month: "Sep 2025", avgBalance: 461000, weightedAvgAdjBalance: 441000, maxBalance: 798000, minBalance: 221000, negDays: 0 },
  ];

  const chartData = monthlyBalances;

  return (
    <div className="space-y-4">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground">Average Daily Balance</p>
                <p className="mt-1 text-2xl font-bold text-success">$425K</p>
                <Badge className="mt-1 bg-success/10 text-success text-xs px-2 py-0.5">Healthy</Badge>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground">Adjusted Balance</p>
                <p className="mt-1 text-2xl font-bold text-foreground">$398K</p>
                <p className="mt-1 text-xs text-muted-foreground">After adjustments</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground">6-Month Minimum</p>
                <p className="mt-1 text-2xl font-bold text-foreground">$175K</p>
                <p className="mt-1 text-xs text-muted-foreground">Lowest point</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          {/* Balance by Month Chart */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm">Balance by Month</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ChartContainer
                config={{
                  weightedAvgAdjBalance: {
                    label: "Weighted Average Adjusted Balance",
                    color: "hsl(var(--primary))",
                  },
                  maxBalance: {
                    label: "Maximum Balance",
                    color: "hsl(var(--primary))",
                  },
                  minBalance: {
                    label: "Minimum Balance",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-80 w-full"
              >
                {exploration === "decision" ? (
                  <LineChart data={chartData} margin={{ left: 32, right: 8, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip 
                      content={<ChartTooltipContent 
                        formatter={(value, name) => {
                          const label = name === "weightedAvgAdjBalance" ? "Weighted Average Adjusted Balance" :
                                       name === "maxBalance" ? "Maximum Balance" :
                                       name === "minBalance" ? "Minimum Balance" : name;
                          return [`${label}: ${formatCurrency(Number(value))}`];
                        }} 
                      />} 
                    />
                    <Line type="monotone" dataKey="weightedAvgAdjBalance" stroke="var(--color-weightedAvgAdjBalance)" strokeWidth={3} dot={{ fill: "var(--color-weightedAvgAdjBalance)", r: 3 }} />
                    <Line type="monotone" dataKey="maxBalance" stroke="var(--color-maxBalance)" strokeWidth={1.5} strokeOpacity={0.4} dot={{ fill: "var(--color-maxBalance)", r: 3 }} />
                    <Line type="monotone" dataKey="minBalance" stroke="var(--color-minBalance)" strokeWidth={1.5} strokeOpacity={0.4} dot={{ fill: "var(--color-minBalance)", r: 3 }} />
                  </LineChart>
                ) : (
                  <LineChart data={chartData} margin={{ left: 32, right: 8, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip 
                      content={<ChartTooltipContent 
                        formatter={(value, name) => {
                          const label = name === "weightedAvgAdjBalance" ? "Weighted Average Adjusted Balance" :
                                       name === "maxBalance" ? "Maximum Balance" :
                                       name === "minBalance" ? "Minimum Balance" : name;
                          return [`${label}: ${formatCurrency(Number(value))}`];
                        }} 
                      />} 
                    />
                    <Line type="monotone" dataKey="weightedAvgAdjBalance" stroke="var(--color-weightedAvgAdjBalance)" strokeWidth={3} dot={{ fill: "var(--color-weightedAvgAdjBalance)", r: 3 }} />
                    <Line type="monotone" dataKey="maxBalance" stroke="var(--color-maxBalance)" strokeWidth={1.5} strokeOpacity={0.4} dot={{ fill: "var(--color-maxBalance)", r: 3 }} />
                    <Line type="monotone" dataKey="minBalance" stroke="var(--color-minBalance)" strokeWidth={1.5} strokeOpacity={0.4} dot={{ fill: "var(--color-minBalance)", r: 3 }} />
                  </LineChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Metric Cards - Vertical Stack */}
          <div className="flex flex-col gap-3">
            <MetricCard label="Adjusted Average Daily Balance" value="$398,500" priorValue="$372,000" changePercent={7} />
            <MetricCard label="Total Negative Days" value="1" priorValue="3" changePoints={-2} changeUnit="days" lowerIsBetter={true} variant="warning" />
          </div>
        </div>
      )}

      {/* Detailed Analysis - Different formats per exploration */}
      {exploration === "analyst" ? (
        <Card>
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-sm">Detailed Monthly Balance Analysis</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="pb-1.5 text-left text-xs font-medium text-muted-foreground" style={{ width: '8%' }}>Month</th>
                    <th className="pb-1.5 text-right text-xs font-medium text-muted-foreground" style={{ width: '20%' }}>Weighted Avg Adj Balance</th>
                    <th className="pb-1.5 text-right text-xs font-medium text-muted-foreground" style={{ width: '18%' }}>Avg Balance</th>
                    <th className="pb-1.5 text-right text-xs font-medium text-muted-foreground" style={{ width: '18%' }}>Max Balance</th>
                    <th className="pb-1.5 text-right text-xs font-medium text-muted-foreground" style={{ width: '18%' }}>Min Balance</th>
                    <th className="pb-1.5 text-center text-xs font-medium text-muted-foreground" style={{ width: '18%' }}>Negative Days</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBalances.map((data, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-1.5 text-xs font-medium text-foreground">{data.month}</td>
                      <td className="py-1.5 text-right text-xs text-foreground">${data.weightedAvgAdjBalance.toLocaleString()}</td>
                      <td className="py-1.5 text-right text-xs text-foreground">${data.avgBalance.toLocaleString()}</td>
                      <td className="py-1.5 text-right text-xs text-foreground">${data.maxBalance.toLocaleString()}</td>
                      <td className="py-1.5 text-right text-xs text-foreground">${data.minBalance.toLocaleString()}</td>
                      <td className="py-1.5 text-center">
                        <Badge variant={data.negDays > 0 ? "destructive" : "outline"} className="text-xs px-1.5 py-0">
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
