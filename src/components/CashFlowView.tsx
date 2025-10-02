import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CashFlowView = () => {
  const monthlyData = [
    { month: "Jan", revenue: 685000, cashFlow: 92000, deposits: 42, transfers: 125000 },
    { month: "Feb", revenue: 720000, cashFlow: 108000, deposits: 45, transfers: 132000 },
    { month: "Mar", revenue: 695000, cashFlow: 95000, deposits: 41, transfers: 118000 },
    { month: "Apr", revenue: 735000, cashFlow: 112000, deposits: 48, transfers: 145000 },
    { month: "May", revenue: 710000, cashFlow: 102000, deposits: 44, transfers: 138000 },
    { month: "Jun", revenue: 705000, cashFlow: 98000, deposits: 43, transfers: 128000 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Loan Payments"
          value="$125,000"
          icon={TrendingDown}
          variant="warning"
        />
        <MetricCard
          label="Total Loan Proceeds"
          value="$500,000"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          label="Overdraft Count"
          value="3"
          icon={AlertTriangle}
          variant="destructive"
        />
        <MetricCard
          label="Bank Accounts"
          value="2 Accounts"
          description="Chase Business, Wells Fargo"
        />
      </div>

      {/* Monthly Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Cash Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Month</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Cash Flow</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Deposits</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Transfers In</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-3 text-sm font-medium text-foreground">{data.month}</td>
                    <td className="py-3 text-right text-sm text-foreground">
                      ${data.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-sm text-foreground">
                      ${data.cashFlow.toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-sm text-foreground">{data.deposits}</td>
                    <td className="py-3 text-right text-sm text-foreground">
                      ${data.transfers.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Loan Activity by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{data.month}</span>
                    <span className="font-medium text-foreground">
                      ${(data.cashFlow * 0.15).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(data.cashFlow / 120000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">NSF Fees & Returned Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Total NSF Fees</p>
                  <p className="text-2xl font-semibold text-destructive">$450</p>
                </div>
                <Badge variant="destructive">3 Incidents</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Returned Items</p>
                  <p className="text-2xl font-semibold text-warning">$1,250</p>
                </div>
                <Badge className="bg-warning text-warning-foreground">2 Items</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
