import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Jul", revenue: 695000 },
  { month: "Aug", revenue: 710000 },
  { month: "Sep", revenue: 705000 },
];

const cashFlowData = [
  { month: "Jul", cashFlow: 95000 },
  { month: "Aug", cashFlow: 102000 },
  { month: "Sep", cashFlow: 98000 },
];

interface SummaryViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const SummaryView = ({ exploration }: SummaryViewProps) => {
  return (
    <div className="space-y-4">
      {/* Credit Assessment */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-foreground">Credit Assessment</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="FICO Score"
            value="677"
            variant="success"
          />
          <MetricCard
            label="Mulligan Custom Score"
            value="199"
            variant="success"
          />
          <MetricCard
            label="Ocrolus Detect Flags"
            value="2"
            variant="warning"
            icon={AlertCircle}
          />
        </div>
      </div>

      {/* Banking Indicators */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-foreground">Banking Indicators</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Annualized Revenue"
            value="$8,450,000"
            icon={TrendingUp}
          />
          <MetricCard
            label="Annualized Cash Flow"
            value="$1,250,000"
            icon={DollarSign}
          />
          <MetricCard
            label="Average Daily Balance"
            value="$425,000"
          />
          <MetricCard
            label="Adjusted Average Daily Balance"
            value="$398,500"
          />
          <MetricCard
            label="Balance to Revenue Ratio"
            value="18.2%"
            variant="success"
          />
          <MetricCard
            label="Cash Flow to Revenue Ratio"
            value="14.8%"
            variant="success"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: exploration === "executive" ? "hsl(var(--chart-1))" : 
                         exploration === "analyst" ? "hsl(var(--primary))" : 
                         "hsl(var(--chart-3))",
                },
              }}
              className="h-48 pl-2"
            >
              {exploration === "decision" ? (
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    fill="var(--color-revenue)" 
                    fillOpacity={exploration === "analyst" ? 0.2 : 0.4}
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
          <CardContent className="px-4 pb-4">
            <ChartContainer
              config={{
                cashFlow: {
                  label: "Cash Flow",
                  color: exploration === "executive" ? "hsl(var(--chart-2))" : 
                         exploration === "analyst" ? "hsl(var(--success))" : 
                         "hsl(var(--chart-4))",
                },
              }}
              className="h-48 pl-2"
            >
              {exploration === "decision" ? (
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Bar dataKey="cashFlow" fill="var(--color-cashFlow)" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                  <Area 
                    type="monotone" 
                    dataKey="cashFlow" 
                    stroke="var(--color-cashFlow)" 
                    fill="var(--color-cashFlow)" 
                    fillOpacity={exploration === "analyst" ? 0.2 : 0.4}
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
