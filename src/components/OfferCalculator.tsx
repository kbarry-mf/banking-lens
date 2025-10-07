import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

export const OfferCalculator = () => {
  const [monthlySales] = useState(67891.00);
  const [totalRepayment] = useState(6572.00);
  const [fundingAmount, setFundingAmount] = useState("5300");
  const [term, setTerm] = useState("63");
  const [buyRate, setBuyRate] = useState("1.12000");
  const [maxMarkup, setMaxMarkup] = useState("0.12000");
  const [originationFee, setOriginationFee] = useState("295.00");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {/* Display Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Monthly Sales</Label>
              <p className="text-base font-semibold mt-1">{formatCurrency(monthlySales)}</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Total Repayment Amount</Label>
              <p className="text-base font-semibold mt-1">{formatCurrency(totalRepayment)}</p>
            </div>
          </div>

          {/* ISO Account */}
          <div className="space-y-1.5">
            <Label htmlFor="iso-account" className="text-xs font-medium">ISO Account</Label>
            <Select defaultValue="businessloans">
              <SelectTrigger id="iso-account" className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="businessloans">BusinessLoans.com</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Tier */}
          <div className="space-y-1.5">
            <Label htmlFor="pricing-tier" className="text-xs font-medium">Pricing Tier</Label>
            <Select defaultValue="mcs-tier1">
              <SelectTrigger id="pricing-tier" className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcs-tier1">MCS Tier 1 (50%) - 3 Months</SelectItem>
                <SelectItem value="mcs-tier2">MCS Tier 2 (40%) - 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Funding Amount & Freeze Funding */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="funding-amount" className="text-xs font-medium">Funding Amount $</Label>
              <Input
                id="funding-amount"
                type="number"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="freeze-funding" className="text-xs font-medium">Freeze Funding Amount</Label>
              <Select defaultValue="no">
                <SelectTrigger id="freeze-funding" className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Term & Payment Frequency */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="term" className="text-xs font-medium">Term (days)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="payment-frequency" className="text-xs font-medium">Payment Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger id="payment-frequency" className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calculated Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Payment Amount</Label>
              <p className="text-sm font-semibold mt-1">$521.60</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Monthly Payment Amount</Label>
              <p className="text-sm font-semibold mt-1">$2,190.72</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Monthly Holdback %</Label>
              <p className="text-sm font-semibold mt-1">3.23%</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Available Balance</Label>
              <p className="text-sm font-semibold mt-1">$2,422.00</p>
            </div>
          </div>

          {/* Buy Rate & Max Markup */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="buy-rate" className="text-xs font-medium">Buy Rate</Label>
              <Input
                id="buy-rate"
                type="number"
                step="0.00001"
                value={buyRate}
                onChange={(e) => setBuyRate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="max-markup" className="text-xs font-medium">Max Markup</Label>
              <Input
                id="max-markup"
                type="number"
                step="0.00001"
                value={maxMarkup}
                onChange={(e) => setMaxMarkup(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          {/* Total Factor & 6 Mo. Equivalent Factor */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Total Factor</Label>
              <p className="text-sm font-semibold mt-1">1.24</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">6 Mo. Equivalent Factor</Label>
              <p className="text-sm font-semibold mt-1">1.48</p>
            </div>
          </div>

          {/* Origination Fees */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="origination-fee" className="text-xs font-medium">Origination Fee $</Label>
              <Input
                id="origination-fee"
                type="number"
                step="0.01"
                value={originationFee}
                onChange={(e) => setOriginationFee(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="bg-accent/50 rounded-lg p-3">
              <Label className="text-xs text-muted-foreground">Origination Fee %</Label>
              <p className="text-sm font-semibold mt-1">5.57%</p>
            </div>
          </div>

          {/* Early Payoff Forgiveness Type */}
          <div className="bg-accent/50 rounded-lg p-3">
            <Label className="text-xs text-muted-foreground">Early Payoff Forgiveness Type</Label>
            <p className="text-sm font-semibold mt-1">50% Interest</p>
          </div>
        </div>
      </div>

      <div className="border-t px-4 py-3 bg-card">
        <Button className="w-full h-9">Save Offer Details</Button>
      </div>
    </div>
  );
};
