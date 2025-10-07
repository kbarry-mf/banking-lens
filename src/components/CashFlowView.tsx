import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { parse } from "date-fns";

interface CashFlowViewProps {
  exploration: "executive" | "analyst" | "decision";
}

export const CashFlowView = ({ exploration }: CashFlowViewProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Match the values from SummaryView charts
  const monthlyData = [
    { month: "Apr 2025", transfersIn: 115000, loanDeposits: 85000, revenue: 682000, loanPayments: 22000, transfersOut: 45000, cashFlow: 88000, overdrafts: 0 },
    { month: "May 2025", transfersIn: 152000, loanDeposits: 95000, revenue: 745000, loanPayments: 25000, transfersOut: 52000, cashFlow: 112000, overdrafts: 1 },
    { month: "Jun 2025", transfersIn: 121000, loanDeposits: 78000, revenue: 698000, loanPayments: 21000, transfersOut: 38000, cashFlow: 94000, overdrafts: 0 },
    { month: "Jul 2025", transfersIn: 143000, loanDeposits: 88000, revenue: 725000, loanPayments: 23000, transfersOut: 48000, cashFlow: 105000, overdrafts: 1 },
    { month: "Aug 2025", transfersIn: 118000, loanDeposits: 72000, revenue: 691000, loanPayments: 19000, transfersOut: 35000, cashFlow: 89000, overdrafts: 1 },
    { month: "Sep 2025", transfersIn: 158000, loanDeposits: 102000, revenue: 738000, loanPayments: 27000, transfersOut: 55000, cashFlow: 118000, overdrafts: 0 },
  ];

  // Calculate totals
  const totals = monthlyData.reduce((acc, curr) => ({
    transfersIn: acc.transfersIn + curr.transfersIn,
    loanDeposits: acc.loanDeposits + curr.loanDeposits,
    revenue: acc.revenue + curr.revenue,
    loanPayments: acc.loanPayments + curr.loanPayments,
    transfersOut: acc.transfersOut + curr.transfersOut,
    cashFlow: acc.cashFlow + curr.cashFlow,
    overdrafts: acc.overdrafts + curr.overdrafts,
  }), { transfersIn: 0, loanDeposits: 0, revenue: 0, loanPayments: 0, transfersOut: 0, cashFlow: 0, overdrafts: 0 });

  const bankAccounts = [
    { last4: "4521", bankName: "Chase Business", accountType: "Checking", beginDate: "2023-01-15", endDate: "2024-09-30" },
    { last4: "8832", bankName: "Wells Fargo", accountType: "Savings", beginDate: "2023-03-22", endDate: "2024-09-30" },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!sortColumn) return monthlyData;
    
    return [...monthlyData].sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a];
      const bVal = b[sortColumn as keyof typeof b];
      
      // Special handling for month column to sort chronologically
      if (sortColumn === 'month' && typeof aVal === 'string' && typeof bVal === 'string') {
        const aDate = parse(aVal, 'MMM yyyy', new Date());
        const bDate = parse(bVal, 'MMM yyyy', new Date());
        return sortDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 ml-1 inline opacity-0 group-hover:opacity-50" />;
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-3 w-3 ml-1 inline" />
      : <ChevronDown className="h-3 w-3 ml-1 inline" />;
  };

  const sortedData = getSortedData();
  const chartData = monthlyData;

  return (
    <div className="space-y-4">
      {/* Summary Metrics - Different layouts per exploration */}
      {exploration === "executive" ? (
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
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
          
          <Card>
            <CardHeader 
              className="pb-2 pt-4 px-4 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Monthly Cash Flow Analysis</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{monthlyData.length} months</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isExpanded ? "Hide Details" : "Show Details"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('month')}>
                        Month<SortIcon column="month" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('transfersIn')}>
                        Transfers In<SortIcon column="transfersIn" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('loanDeposits')}>
                        Loan Deposits<SortIcon column="loanDeposits" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('revenue')}>
                        Revenue<SortIcon column="revenue" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('loanPayments')}>
                        Loan Payments<SortIcon column="loanPayments" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('transfersOut')}>
                        Transfers Out<SortIcon column="transfersOut" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('cashFlow')}>
                        Cash Flow<SortIcon column="cashFlow" />
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground">CF %</th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground group" onClick={() => handleSort('overdrafts')}>
                        Overdrafts<SortIcon column="overdrafts" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isExpanded && sortedData.map((data, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 text-xs font-medium text-foreground">{data.month}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.transfersIn.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.loanDeposits.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.revenue.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.loanPayments.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.transfersOut.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-foreground">${data.cashFlow.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs font-medium text-success">
                          {((data.cashFlow / data.revenue) * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 text-right text-xs text-foreground">{data.overdrafts}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 font-semibold bg-muted/50">
                      <td className="py-3 text-xs text-foreground">Total</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.transfersIn.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.loanDeposits.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.revenue.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.loanPayments.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.transfersOut.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-foreground">${totals.cashFlow.toLocaleString()}</td>
                      <td className="py-3 text-right text-xs font-medium text-success">
                        {((totals.cashFlow / totals.revenue) * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 text-right text-xs text-foreground">{totals.overdrafts}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics Summary */}
          <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
            <MetricCard 
              label="Total NSF Fees" 
              value="$450" 
              variant="destructive"
              description="3 incidents"
            />
            <MetricCard 
              label="Returned Items" 
              value="$1,250" 
              variant="warning"
              description="2 items"
            />
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
      {exploration === "analyst" ? null : (
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-2">
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
