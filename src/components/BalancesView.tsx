import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Average Daily Balance"
          value="$425,000"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          label="Adjusted Average Daily Balance"
          value="$398,500"
          icon={TrendingUp}
        />
        <MetricCard
          label="Minimum Balance (6 Mo)"
          value="$175,000"
          icon={TrendingDown}
        />
      </div>

      {/* Monthly Balance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Balance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyBalances.map((data, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Month</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{data.month}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Balance</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    ${data.avgBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Min Balance</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    ${data.minBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Negative Days</p>
                  <p className={`mt-1 text-lg font-semibold ${data.negDays > 0 ? 'text-destructive' : 'text-success'}`}>
                    {data.negDays}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Balance Analysis */}
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
    </div>
  );
};
