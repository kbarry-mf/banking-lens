import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { List } from "lucide-react";
import { useState } from "react";

interface TransactionsViewProps {
  exploration?: string;
}

export const TransactionsView = ({ exploration = "analyst" }: TransactionsViewProps) => {
  const [selectedContract, setSelectedContract] = useState("all");
  const [selectedRepayments, setSelectedRepayments] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const transactions = [
    { date: "Oct 7, 2025", memo: "ACH Loan Payment", debit: "$129,960.30", credit: "$0.00", running: "$4,730,555.80", returnC: "", associated: "", reversal: "" },
    { date: "Oct 6, 2025", memo: "ACH Loan Payment", debit: "$77,976.20", credit: "$0.00", running: "$3,618,095.20", returnC: "", associated: "", reversal: "" },
    { date: "Sep 30, 2025", memo: "ACH Loan Payment", debit: "$129,960.30", credit: "$0.00", running: "$4,860,516.10", returnC: "", associated: "", reversal: "" },
    { date: "Sep 29, 2025", memo: "ACH Loan Payment", debit: "$77,976.20", credit: "$0.00", running: "$3,696,071.40", returnC: "", associated: "", reversal: "" },
    { date: "Sep 23, 2025", memo: "ACH Loan Payment", debit: "$129,960.30", credit: "$0.00", running: "$4,990,476.40", returnC: "", associated: "", reversal: "" },
    { date: "Sep 22, 2025", memo: "ACH Loan Payment", debit: "$77,976.20", credit: "$0.00", running: "$3,774,047.60", returnC: "", associated: "", reversal: "" },
    { date: "Sep 16, 2025", memo: "ACH Loan Payment", debit: "$129,960.30", credit: "$0.00", running: "$5,120,436.70", returnC: "", associated: "", reversal: "" },
    { date: "Sep 15, 2025", memo: "ACH Loan Payment", debit: "$77,976.20", credit: "$0.00", running: "$3,852,023.80", returnC: "", associated: "", reversal: "" },
    { date: "Sep 9, 2025", memo: "ACH Loan Payment", debit: "$129,960.30", credit: "$0.00", running: "$5,250,397.00", returnC: "", associated: "", reversal: "" },
    { date: "Sep 8, 2025", memo: "Origination Fee", debit: "$0.00", credit: "$45,000.00", running: "$3,930,000.00", returnC: "", associated: "", reversal: "" },
    { date: "Sep 8, 2025", memo: "Funding RTR", debit: "$0.00", credit: "$930,000.00", running: "$3,885,000.00", returnC: "", associated: "", reversal: "" },
    { date: "Sep 8, 2025", memo: "Net Funding Amount", debit: "$0.00", credit: "$2,955,000.00", running: "$2,955,000.00", returnC: "", associated: "", reversal: "" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="py-2 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="rounded-full bg-green-600 p-1.5">
                <List className="h-4 w-4 text-white" />
              </div>
              Transactions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {/* Left Section */}
            <div className="space-y-2 p-3 border rounded-lg">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Select Contract</label>
                <Select value={selectedContract} onValueChange={setSelectedContract}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="contract1">Contract 1</SelectItem>
                    <SelectItem value="contract2">Contract 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Select Repayments</label>
                <Select value={selectedRepayments} onValueChange={setSelectedRepayments}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="repayment1">Repayment 1</SelectItem>
                    <SelectItem value="repayment2">Repayment 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                Export Transactions
              </Button>
            </div>

            {/* Middle Section */}
            <div className="space-y-2 p-3 border rounded-lg">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Start Date</label>
                <Input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">End Date</label>
                <Input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs" disabled>
                Export Transactions By Date
              </Button>
            </div>

            {/* Right Section */}
            <div className="space-y-2 p-3 border rounded-lg flex flex-col justify-between">
              <div>
                <label className="text-xs text-muted-foreground">Repayment: <span className="font-semibold text-foreground">All</span></label>
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs mt-auto">
                Generate Payoff Letter
              </Button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-9 px-3 py-2">Date</TableHead>
                  <TableHead className="h-9 px-3 py-2">Memo</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-right">Debit Amt.</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-right">Credit A...</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-right">Running ...</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-center">Return C...</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-center">Associat...</TableHead>
                  <TableHead className="h-9 px-3 py-2 text-center">Reversal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="px-3 py-1.5 text-sm">{txn.date}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm">{txn.memo}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-right font-semibold">{txn.debit}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-right">{txn.credit}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-right font-semibold">{txn.running}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-center text-muted-foreground">{txn.returnC || "-"}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-center text-muted-foreground">{txn.associated || "-"}</TableCell>
                    <TableCell className="px-3 py-1.5 text-sm text-center text-muted-foreground">{txn.reversal || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
