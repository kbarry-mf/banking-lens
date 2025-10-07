import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Apr 2025", revenue: 682000 },
  { month: "May 2025", revenue: 745000 },
  { month: "Jun 2025", revenue: 698000 },
  { month: "Jul 2025", revenue: 725000 },
  { month: "Aug 2025", revenue: 691000 },
  { month: "Sep 2025", revenue: 738000 },
];

const cashFlowData = [
  { month: "Apr 2025", cashFlow: 88000 },
  { month: "May 2025", cashFlow: 112000 },
  { month: "Jun 2025", cashFlow: 94000 },
  { month: "Jul 2025", cashFlow: 105000 },
  { month: "Aug 2025", cashFlow: 89000 },
  { month: "Sep 2025", cashFlow: 118000 },
];

interface SummaryViewProps {
  exploration: "executive" | "analyst" | "decision";
  onTabChange?: (tab: string) => void;
}

export const SummaryView = ({ exploration, onTabChange }: SummaryViewProps) => {
  return (
    <div className="space-y-4">
      {/* All Metrics Grouped Together */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Annualized Revenue"
          value="$8,450,000"
          priorValue="$7,920,000"
          changePercent={7}
          clickable
          onClick={() => onTabChange?.("cash-flow")}
        />
        <MetricCard
          label="FICO Score"
          value="677"
          priorValue="645"
          changePoints={32}
        />
        <MetricCard
          label="Mulligan Custom Score"
          value="199"
          variant="warning"
          priorValue="182"
          changePoints={17}
        />
        <MetricCard
          label="Annualized Cash Flow"
          value="$1,250,000"
          priorValue="$1,180,000"
          changePercent={6}
          clickable
          onClick={() => onTabChange?.("cash-flow")}
        />
        <MetricCard
          label="Adjusted Average Daily Balance"
          value="$398,500"
          priorValue="$372,000"
          changePercent={7}
          clickable
          onClick={() => onTabChange?.("balances")}
        />
        <MetricCard
          label="Balance to Revenue Ratio"
          value="18.2%"
          variant="destructive"
          priorValue="17.8%"
          changePercent={0.4}
        />
        <MetricCard
          label="Cash Flow to Revenue Ratio"
          value="14.8%"
          priorValue="14.9%"
          changePercent={-0.1}
        />
        <MetricCard
          label="Ocrolus Detect Signals"
          value="2"
          variant="warning"
        />
      </div>

      {/* Charts Section - Clickable */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onTabChange?.("cash-flow")}>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: exploration === "executive" ? "hsl(var(--chart-1))" : 
                         exploration === "analyst" ? "hsl(var(--primary))" : 
                         "hsl(var(--chart-3))",
                },
              }}
              className="h-48 w-full"
            >
              {exploration === "decision" ? (
                <BarChart data={revenueData} margin={{ left: 32, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={revenueData} margin={{ left: 32, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    fill="none"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-revenue)", r: 4 }}
                  />
                </AreaChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onTabChange?.("cash-flow")}>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Cash Flow from Operations by Month</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ChartContainer
              config={{
                cashFlow: {
                  label: "Cash Flow",
                  color: exploration === "executive" ? "hsl(var(--chart-2))" : 
                         exploration === "analyst" ? "hsl(var(--success))" : 
                         "hsl(var(--chart-4))",
                },
              }}
              className="h-48 w-full"
            >
              {exploration === "decision" ? (
                <BarChart data={cashFlowData} margin={{ left: 32, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Bar dataKey="cashFlow" fill="var(--color-cashFlow)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={cashFlowData} margin={{ left: 32, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Area 
                    type="monotone" 
                    dataKey="cashFlow" 
                    stroke="var(--color-cashFlow)" 
                    fill="none"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-cashFlow)", r: 4 }}
                  />
                </AreaChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
