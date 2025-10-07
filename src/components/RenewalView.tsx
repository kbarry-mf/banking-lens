import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCw } from "lucide-react";

interface RenewalViewProps {
  exploration?: string;
}

export const RenewalView = ({ exploration = "analyst" }: RenewalViewProps) => {
  const topUpData = [
    { label: "Funding Date", loan1: "6/30/2025", loan2: "9/7/2025", refinanced: "-" },
    { label: "Funding Number", loan1: "1", loan2: "2", refinanced: "-" },
    { label: "Estimated Mo. Sales", loan1: "$14,166,666.67", loan2: "$6,350,110.17", refinanced: "$22,500,000.00" },
    { label: "Current Outstanding Balance", loan1: "$4,730,555.80", loan2: "$3,618,095.20", refinanced: "-" },
    { label: "Principal Balance", loan1: "$3,876,200.91", loan2: "$2,817,821.13", refinanced: "-" },
    { label: "Interest Balance", loan1: "$854,354.89", loan2: "$800,274.07", refinanced: "-" },
    { label: "% of Total RTR Remaining", loan1: "72.22%", loan2: "92.06%", refinanced: "-" },
    { label: "# of Days Remaining", loan1: "182", loan2: "232", refinanced: "-" },
    { label: "% Remaining Combined RTR Last Fundi...", loan1: "", loan2: "89.67%", refinanced: "-" },
    { label: "New Funds Provided", loan1: "$5,000,000.00", loan2: "$3,000,000.00", refinanced: "$5,000,000.00" },
    { label: "New Funds RTR", loan1: "$6,550,000.00", loan2: "$3,930,000.00", refinanced: "$6,800,000.00" },
    { label: "Principal Balance Refinanced", loan1: "$0.00", loan2: "$0.00", refinanced: "$3,876,200.91" },
    { label: "Revenue Balance Refinanced", loan1: "$0.00", loan2: "$0.00", refinanced: "$854,354.89" },
    { label: "New Contract Total RTR", loan1: "$6,550,000.00", loan2: "$3,930,000.00", refinanced: "$12,071,633.24" },
    { label: "New Contract Loan Amount", loan1: "$5,000,000.00", loan2: "$3,000,000.00", refinanced: "$8,876,200.91" },
    { label: "Effective Factor", loan1: "1.31", loan2: "1.31", refinanced: "1.36" },
    { label: "Term (Days)", loan1: "252", loan2: "252", refinanced: "252" },
    { label: "Payment Frequency", loan1: "Weekly", loan2: "Weekly", refinanced: "Weekly" },
    { label: "Payment", loan1: "$129,960.30", loan2: "$77,976.20", refinanced: "$239,516.53" },
    { label: "Third-Party Payoff Amount", loan1: "-", loan2: "-", refinanced: "$0.00" },
    { label: "New Funding Disbursement Amount", loan1: "$4,925,000.00", loan2: "$2,955,000.00", refinanced: "$4,875,000.00" },
    { label: "Monthly Payment", loan1: "$545,833.26", loan2: "$327,500.04", refinanced: "$1,005,969.44" },
    { label: "Combined Monthly Payment", loan1: "-", loan2: "-", refinanced: "$1,333,469.48" },
    { label: "Early Payoff Forgiveness Type", loan1: "50% Interest", loan2: "50% Interest", refinanced: "50% Interest" },
    { label: "Monthly Holdback %", loan1: "3.85%", loan2: "1.46%", refinanced: "4.471%", highlight: true },
    { label: "Combined Overall Monthly Holdback %", loan1: "-", loan2: "-", refinanced: "5.93%" },
    { label: "Combined Overall RTR at Funding", loan1: "$6,550,000.00", loan2: "$9,310,357.30", refinanced: "$15,689,728.44" },
    { label: "Max Overall Principal", loan1: "$6,694,022.04", loan2: "$6,694,022.04", refinanced: "$11,694,022.04" },
  ];

  const pricingData = [
    { label: "Pricing Tier", loan1: "MCS Tier 4 (50%) - 12 Months", loan2: "MCS Tier 4 (50%) - 12 Months", refinanced: "MCS Tier 4 (50%) - 12 Months" },
    { label: "Buy Rate", loan1: "1.25", loan2: "1.25", refinanced: "1.24" },
    { label: "Max Markup", loan1: "0.06", loan2: "0.06", refinanced: "0.12" },
    { label: "Total Factor", loan1: "1.31", loan2: "1.31", refinanced: "1.36" },
    { label: "6 Mo. Equivalent Factor", loan1: "1.007", loan2: "1.007", refinanced: "1.18" },
    { label: "Origination Fee", loan1: "$75,000.00", loan2: "$45,000.00", refinanced: "$125,000.00" },
    { label: "Orig Points Swapped", loan1: "", loan2: "", refinanced: "" },
  ];

  return (
    <div className="space-y-4">
      {/* Top-Up Offer(s) Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <RefreshCw className="h-5 w-5 text-primary" />
            Top-Up Offer(s)
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            Refinance Loan <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px] h-9 px-3 py-2"></TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Active Loan 1
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Active Loan 2
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Refinanced Loan
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topUpData.map((row, idx) => (
                  <TableRow key={idx} className={row.highlight ? "bg-blue-50 dark:bg-blue-950" : ""}>
                    <TableCell className="font-medium text-muted-foreground px-3 py-1.5 text-sm">{row.label}</TableCell>
                    <TableCell className={`text-center px-3 py-1.5 text-sm ${row.loan1.includes('$') || row.loan1.includes('%') || !isNaN(Number(row.loan1)) ? 'text-primary font-semibold' : ''}`}>
                      {row.loan1 || '-'}
                    </TableCell>
                    <TableCell className="text-center px-3 py-1.5 text-sm">{row.loan2 || '-'}</TableCell>
                    <TableCell className="text-center px-3 py-1.5 text-sm">{row.refinanced || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="rounded-full bg-primary p-2">
              <svg className="h-5 w-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px] h-9 px-3 py-2"></TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Active Loan 1
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Active Loan 2
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center h-9 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      Refinanced Loan
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-muted-foreground px-3 py-1.5 text-sm">{row.label}</TableCell>
                    <TableCell className={`text-center px-3 py-1.5 text-sm ${row.loan1.includes('$') || !isNaN(Number(row.loan1)) ? 'text-primary font-semibold' : ''}`}>
                      {row.loan1 || '-'}
                    </TableCell>
                    <TableCell className="text-center px-3 py-1.5 text-sm">{row.loan2 || '-'}</TableCell>
                    <TableCell className="text-center px-3 py-1.5 text-sm">{row.refinanced || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end p-4">
            <Button size="lg" className="bg-[#1a5f7a] hover:bg-[#144a5f]">
              Create Offer(s)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
