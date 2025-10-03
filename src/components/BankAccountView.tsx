import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BankAccountViewProps {
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

export const BankAccountView = ({ exploration }: BankAccountViewProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};
