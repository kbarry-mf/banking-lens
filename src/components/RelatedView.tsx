import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, History, Building2 } from "lucide-react";

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

export const RelatedView = ({ exploration }: RelatedViewProps) => {
  return (
    <div className="space-y-6">
      {/* Bank Accounts */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Bank Accounts ({bankAccounts.length})</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-13">
            {bankAccounts.length} items • Sorted by Account Number • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Holder</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{account.accountNumber}</TableCell>
                    <TableCell>{account.bank}</TableCell>
                    <TableCell>{account.accountHolder}</TableCell>
                    <TableCell>{account.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 text-center border-t">
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* Guarantors */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Guarantors ({guarantors.length})</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-13">
            {guarantors.length} item • Sorted by Primary Contact • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Social Security Number</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Ownership Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guarantors.map((guarantor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-primary">{guarantor.name}</TableCell>
                    <TableCell>{guarantor.ssn}</TableCell>
                    <TableCell>{guarantor.dob}</TableCell>
                    <TableCell>{guarantor.creditScore}</TableCell>
                    <TableCell>{guarantor.ownership}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 text-center border-t">
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* Offers */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Offers ({offers.length})</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-13">
            {offers.length} items • Sorted by Offer Name • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Markup</TableHead>
                  <TableHead>Factor</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((offer, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{offer.status}</TableCell>
                    <TableCell>{offer.amount}</TableCell>
                    <TableCell>{offer.tier}</TableCell>
                    <TableCell>{offer.term}</TableCell>
                    <TableCell>{offer.rate}</TableCell>
                    <TableCell>{offer.markup}</TableCell>
                    <TableCell>{offer.factor}</TableCell>
                    <TableCell>{offer.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 text-center border-t">
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>

      {/* Application History */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <History className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Application History ({applicationHistory.length})</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-13">
            {applicationHistory.length} items • Sorted by Close Date • Updated a few seconds ago
          </p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationHistory.map((history, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{history.closeDate}</TableCell>
                    <TableCell>{history.amount}</TableCell>
                    <TableCell>{history.status}</TableCell>
                    <TableCell>{history.decision}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 text-center border-t">
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
