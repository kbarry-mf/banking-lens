import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, History, Building2, Network, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface RelatedViewProps {
  exploration: "executive" | "analyst" | "decision";
}

const bankAccounts = [
  {
    accountNumber: "****5678",
    bank: "Wells Fargo Bank",
    accountHolder: "California Plastics Inc.",
    address: "1234 Industrial Way, Los Angeles, CA 90001"
  },
  {
    accountNumber: "****9012",
    bank: "Bank of America",
    accountHolder: "California Plastics Inc.",
    address: "1234 Industrial Way, Los Angeles, CA 90001"
  },
  {
    accountNumber: "****3456",
    bank: "Chase Bank",
    accountHolder: "California Plastics Inc.",
    address: "1234 Industrial Way, Los Angeles, CA 90001"
  }
];

const guarantors = [
  {
    name: "John Parrott III",
    ssn: "230-33-7150",
    dob: "5/16/1984",
    creditScore: 814,
    ownership: "100.00%"
  }
];

const offers = [
  {
    status: "Accepted",
    amount: "$1,000,000.00",
    tier: "MCS Tier 2 (10...)",
    term: "12 months",
    rate: "1.3900",
    markup: "5.000%",
    factor: "1.4400",
    type: "Regular"
  },
  {
    status: "Present to Sales",
    amount: "$1,000,000.00",
    tier: "MCS Tier 2 (10...)",
    term: "12 months",
    rate: "1.3900",
    markup: "5.000%",
    factor: "1.4400",
    type: "Conditional"
  },
  {
    status: "Present to Sales",
    amount: "$1,000,000.00",
    tier: "MCS Tier 2 (50...)",
    term: "18 months",
    rate: "1.3900",
    markup: "12.000%",
    factor: "1.5100",
    type: "Regular"
  }
];

const applicationHistory = [
  {
    closeDate: "12/15/2024",
    amount: "$1,000,000.00",
    status: "Approved",
    decision: "Accepted"
  },
  {
    closeDate: "11/20/2024",
    amount: "$750,000.00",
    status: "Declined",
    decision: "Rejected"
  },
  {
    closeDate: "10/05/2024",
    amount: "$500,000.00",
    status: "Approved",
    decision: "Accepted"
  }
];

const isoSubmissions = [
  {
    broker: "ABC Capital Partners",
    primaryISO: true,
    originalISO: false,
    createdDate: "12/01/2024"
  },
  {
    broker: "XYZ Funding Solutions",
    primaryISO: false,
    originalISO: true,
    createdDate: "11/15/2024"
  },
  {
    broker: "Merchant Finance Group",
    primaryISO: false,
    originalISO: false,
    createdDate: "10/20/2024"
  }
];

export const RelatedView = ({ exploration }: RelatedViewProps) => {
  return (
    <div className="space-y-3">
      {/* Guarantors */}
      <Card>
        <div className="p-2.5 border-b">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                <Users className="h-3.5 w-3.5 text-red-600" />
              </div>
              <h3 className="text-sm font-semibold">Guarantors ({guarantors.length})</h3>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground ml-9">
            {guarantors.length} item • Sorted by Primary Contact • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-8">
                  <TableHead className="text-xs py-1.5">Name</TableHead>
                  <TableHead className="text-xs py-1.5">Social Security Number</TableHead>
                  <TableHead className="text-xs py-1.5">Date of Birth</TableHead>
                  <TableHead className="text-xs py-1.5">Credit Score</TableHead>
                  <TableHead className="text-xs py-1.5">Ownership Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guarantors.map((guarantor, index) => (
                  <TableRow key={index} className="h-9">
                    <TableCell className="font-medium text-primary text-xs py-1.5">{guarantor.name}</TableCell>
                    <TableCell className="text-xs py-1.5">{guarantor.ssn}</TableCell>
                    <TableCell className="text-xs py-1.5">{guarantor.dob}</TableCell>
                    <TableCell className="text-xs py-1.5">{guarantor.creditScore}</TableCell>
                    <TableCell className="text-xs py-1.5">{guarantor.ownership}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-2 text-center border-t">
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* Offers */}
      <Card>
        <div className="p-2.5 border-b">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <DollarSign className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold">Offers ({offers.length})</h3>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground ml-9">
            {offers.length} items • Sorted by Status • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-8">
                  <TableHead className="text-xs py-1.5">Status</TableHead>
                  <TableHead className="text-xs py-1.5">Amount</TableHead>
                  <TableHead className="text-xs py-1.5">Tier</TableHead>
                  <TableHead className="text-xs py-1.5">Term</TableHead>
                  <TableHead className="text-xs py-1.5">Rate</TableHead>
                  <TableHead className="text-xs py-1.5">Markup</TableHead>
                  <TableHead className="text-xs py-1.5">Factor</TableHead>
                  <TableHead className="text-xs py-1.5">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((offer, index) => (
                  <TableRow key={index} className="h-9">
                    <TableCell className="font-medium text-xs py-1.5">{offer.status}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.amount}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.tier}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.term}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.rate}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.markup}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.factor}</TableCell>
                    <TableCell className="text-xs py-1.5">{offer.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-2 text-center border-t">
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* Application History */}
      <Card>
        <div className="p-2.5 border-b">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                <History className="h-3.5 w-3.5 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold">Application History ({applicationHistory.length})</h3>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground ml-9">
            {applicationHistory.length} items • Sorted by Close Date • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-8">
                  <TableHead className="text-xs py-1.5">Close Date</TableHead>
                  <TableHead className="text-xs py-1.5">Amount</TableHead>
                  <TableHead className="text-xs py-1.5">Status</TableHead>
                  <TableHead className="text-xs py-1.5">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationHistory.map((history, index) => (
                  <TableRow key={index} className="h-9">
                    <TableCell className="font-medium text-xs py-1.5">{history.closeDate}</TableCell>
                    <TableCell className="text-xs py-1.5">{history.amount}</TableCell>
                    <TableCell className="text-xs py-1.5">{history.status}</TableCell>
                    <TableCell className="text-xs py-1.5">{history.decision}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-2 text-center border-t">
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* ISO Submissions */}
      <Card>
        <div className="p-2.5 border-b">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                <Network className="h-3.5 w-3.5 text-orange-600" />
              </div>
              <h3 className="text-sm font-semibold">ISO Submissions ({isoSubmissions.length})</h3>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground ml-9">
            {isoSubmissions.length} items • Sorted by Created Date • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-8">
                  <TableHead className="text-xs py-1.5">Broker</TableHead>
                  <TableHead className="text-center text-xs py-1.5">Primary ISO</TableHead>
                  <TableHead className="text-center text-xs py-1.5">Original ISO</TableHead>
                  <TableHead className="text-xs py-1.5">Created Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isoSubmissions.map((submission, index) => (
                  <TableRow key={index} className="h-9">
                    <TableCell className="font-medium text-xs py-1.5">{submission.broker}</TableCell>
                    <TableCell className="py-1.5">
                      <div className="flex items-center justify-center">
                        <Checkbox checked={submission.primaryISO} disabled className="h-4 w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="flex items-center justify-center">
                        <Checkbox checked={submission.originalISO} disabled className="h-4 w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-1.5">{submission.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-2 text-center border-t">
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
