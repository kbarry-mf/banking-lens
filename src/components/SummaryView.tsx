import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Apr", revenue: 682000 },
  { month: "May", revenue: 745000 },
  { month: "Jun", revenue: 698000 },
  { month: "Jul", revenue: 725000 },
  { month: "Aug", revenue: 691000 },
  { month: "Sep", revenue: 738000 },
];

const cashFlowData = [
  { month: "Apr", cashFlow: 88000 },
  { month: "May", cashFlow: 112000 },
  { month: "Jun", cashFlow: 94000 },
  { month: "Jul", cashFlow: 105000 },
  { month: "Aug", cashFlow: 89000 },
  { month: "Sep", cashFlow: 118000 },
];

interface SummaryViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const SummaryView = ({ exploration }: SummaryViewProps) => {
  return (
    <div className="space-y-4">
      {/* All Metrics in Single Section - Showcasing 5 Visual Variations */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Variation 1: Left Border (Original) */}
        <MetricCard
          label="FICO Score"
          value="677"
          variant="success"
          priorValue="645"
          changePercent={5}
          visualVariant="leftBorder"
        />
        {/* Variation 2: Top Accent */}
        <MetricCard
          label="Mulligan Custom Score"
          value="199"
          variant="success"
          priorValue="182"
          changePercent={9}
          visualVariant="topAccent"
        />
        {/* Variation 3: Corner Badge */}
        <MetricCard
          label="Annualized Revenue"
          value="$8,450,000"
          icon={TrendingUp}
          priorValue="$7,920,000"
          changePercent={7}
          visualVariant="cornerBadge"
        />
        {/* Variation 4: Glow Effect */}
        <MetricCard
          label="Annualized Cash Flow"
          value="$1,250,000"
          icon={DollarSign}
          priorValue="$1,180,000"
          changePercent={6}
          visualVariant="glowEffect"
        />
        {/* Variation 5: Background Tint */}
        <MetricCard
          label="Average Daily Balance"
          value="$425,000"
          priorValue="$398,000"
          changePercent={7}
          visualVariant="backgroundTint"
        />
        {/* Showing warning with Left Border */}
        <MetricCard
          label="Adjusted Average Daily Balance"
          value="$398,500"
          priorValue="$372,000"
          changePercent={7}
          visualVariant="leftBorder"
        />
        {/* Showing success with Top Accent */}
        <MetricCard
          label="Balance to Revenue Ratio"
          value="18.2%"
          variant="success"
          priorValue="17.8%"
          changePercent={2}
          visualVariant="topAccent"
        />
        {/* Showing success with Corner Badge */}
        <MetricCard
          label="Cash Flow to Revenue Ratio"
          value="14.8%"
          variant="success"
          priorValue="14.9%"
          changePercent={-1}
          visualVariant="cornerBadge"
        />
        {/* Warning with all variations cycling */}
        <MetricCard
          label="Ocrolus Detect Flags"
          value="2"
          variant="warning"
          icon={AlertCircle}
          priorValue="4"
          changePercent={-50}
          visualVariant="glowEffect"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
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
        <Card>
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
