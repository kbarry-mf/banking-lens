import { useState, useEffect } from "react";
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
  const [fundingAmount, setFundingAmount] = useState(() => {
    const saved = localStorage.getItem("calculatorData");
    return saved ? JSON.parse(saved).fundingAmount : "5,300.00";
  });
  const [term, setTerm] = useState(() => {
    const saved = localStorage.getItem("calculatorData");
    return saved ? JSON.parse(saved).term : "63";
  });
  const [buyRate, setBuyRate] = useState(() => {
    const saved = localStorage.getItem("calculatorData");
    return saved ? JSON.parse(saved).buyRate : "1.12000";
  });
  const [maxMarkup, setMaxMarkup] = useState(() => {
    const saved = localStorage.getItem("calculatorData");
    return saved ? JSON.parse(saved).maxMarkup : "0.12000";
  });
  const [originationFee, setOriginationFee] = useState(() => {
    const saved = localStorage.getItem("calculatorData");
    return saved ? JSON.parse(saved).originationFee : "295.00";
  });

  useEffect(() => {
    localStorage.setItem("calculatorData", JSON.stringify({
      fundingAmount,
      term,
      buyRate,
      maxMarkup,
      originationFee
    }));
  }, [fundingAmount, term, buyRate, maxMarkup, originationFee]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-3">
          {/* Display Fields */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Monthly Sales</Label>
              <p className="text-sm font-semibold mt-0.5">{formatCurrency(monthlySales)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Total Repayment Amount</Label>
              <p className="text-sm font-semibold mt-0.5">{formatCurrency(totalRepayment)}</p>
            </div>
          </div>

          {/* ISO Account */}
          <div className="space-y-1">
            <Label htmlFor="iso-account" className="text-xs font-medium">ISO Account</Label>
            <Select defaultValue="businessloans">
              <SelectTrigger id="iso-account" className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="businessloans">BusinessLoans.com</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Tier */}
          <div className="space-y-1">
            <Label htmlFor="pricing-tier" className="text-xs font-medium">Pricing Tier</Label>
            <Select defaultValue="mcs-tier1">
              <SelectTrigger id="pricing-tier" className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcs-tier1">MCS Tier 1 (50%) - 3 Months</SelectItem>
                <SelectItem value="mcs-tier2">MCS Tier 2 (40%) - 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Funding Amount & Freeze Funding */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="funding-amount" className="text-xs font-medium">Funding Amount $</Label>
              <Input
                id="funding-amount"
                type="text"
                value={fundingAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setFundingAmount(value);
                }}
                onBlur={(e) => {
                  const num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                  if (!isNaN(num)) {
                    setFundingAmount(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                  }
                }}
                onFocus={(e) => {
                  const num = e.target.value.replace(/,/g, '');
                  setFundingAmount(num);
                }}
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="freeze-funding" className="text-xs font-medium">Freeze Funding Amount</Label>
              <Select defaultValue="no">
                <SelectTrigger id="freeze-funding" className="h-8">
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
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="term" className="text-xs font-medium">Term (days)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="payment-frequency" className="text-xs font-medium">Payment Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger id="payment-frequency" className="h-8">
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Payment Amount</Label>
              <p className="text-sm font-semibold mt-0.5">$521.60</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Monthly Payment Amount</Label>
              <p className="text-sm font-semibold mt-0.5">$2,190.72</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Monthly Holdback %</Label>
              <p className="text-sm font-semibold mt-0.5">3.23%</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Available Balance</Label>
              <p className="text-sm font-semibold mt-0.5">$2,422.00</p>
            </div>
          </div>

          {/* Buy Rate & Max Markup */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="buy-rate" className="text-xs font-medium">Buy Rate</Label>
              <Input
                id="buy-rate"
                type="number"
                step="0.00001"
                value={buyRate}
                onChange={(e) => setBuyRate(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="max-markup" className="text-xs font-medium">Max Markup</Label>
              <Input
                id="max-markup"
                type="number"
                step="0.00001"
                value={maxMarkup}
                onChange={(e) => setMaxMarkup(e.target.value)}
                className="h-8"
              />
            </div>
          </div>

          {/* Total Factor & 6 Mo. Equivalent Factor */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Total Factor</Label>
              <p className="text-sm font-semibold mt-0.5">1.24</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">6 Mo. Equivalent Factor</Label>
              <p className="text-sm font-semibold mt-0.5">1.48</p>
            </div>
          </div>

          {/* Origination Fees */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="origination-fee" className="text-xs font-medium">Origination Fee $</Label>
              <Input
                id="origination-fee"
                type="number"
                step="0.01"
                value={originationFee}
                onChange={(e) => setOriginationFee(e.target.value)}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Origination Fee %</Label>
              <p className="text-sm font-semibold mt-0.5">5.57%</p>
            </div>
          </div>

          {/* Early Payoff Forgiveness Type */}
          <div>
            <Label className="text-xs text-muted-foreground">Early Payoff Forgiveness Type</Label>
            <p className="text-sm font-semibold mt-0.5">50% Interest</p>
          </div>
        </div>
      </div>

      <div className="border-t px-4 py-2.5 bg-card">
        <Button className="w-full h-8">Save Offer Details</Button>
      </div>
    </div>
  );
};
