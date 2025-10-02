import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, DollarSign, Calendar, User, ExternalLink, AlertCircle } from "lucide-react";

export const SummaryView = () => {
  return (
    <div className="space-y-6">
      {/* Application Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Acme Corporation</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Manufacturing & Distribution</p>
            </div>
            <Badge className="bg-success text-success-foreground">Under Review</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Broker</p>
              <p className="mt-1 text-sm text-foreground">First Capital Partners</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Legal Entity</p>
              <p className="mt-1 text-sm text-foreground">LLC</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Years in Business</p>
              <p className="mt-1 text-sm text-foreground">8 years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">NAICS Code</p>
              <p className="mt-1 text-sm text-foreground">423120</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">View Box Files</a>
          </div>
        </CardContent>
      </Card>

      {/* Application Information */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Application Information</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Requested Loan Amount"
            value="$2,500,000"
            icon={DollarSign}
          />
          <MetricCard
            label="Application Submitted"
            value="Jan 15, 2025"
            icon={Calendar}
          />
          <MetricCard
            label="Underwriter"
            value="Sarah Johnson"
            icon={User}
          />
          <MetricCard
            label="Application Type"
            value="Equipment Financing"
            icon={Building2}
          />
        </div>
      </div>

      {/* Credit Assessment */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Credit Assessment</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="FICO Score"
            value="742"
            variant="success"
          />
          <MetricCard
            label="Mulligan Custom Score"
            value="A-"
            variant="success"
          />
          <MetricCard
            label="Ocrolus Detect Flags"
            value="2 Flags"
            variant="warning"
            icon={AlertCircle}
          />
        </div>
      </div>

      {/* Banking Indicators */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Banking Indicators</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Annualized Revenue"
            value="$8,450,000"
            icon={TrendingUp}
          />
          <MetricCard
            label="Annualized Cash Flow"
            value="$1,250,000"
            icon={DollarSign}
          />
          <MetricCard
            label="Average Daily Balance"
            value="$425,000"
          />
          <MetricCard
            label="Adjusted Average Daily Balance"
            value="$398,500"
          />
          <MetricCard
            label="Balance to Revenue Ratio"
            value="18.2%"
            variant="success"
          />
          <MetricCard
            label="Cash Flow to Revenue Ratio"
            value="14.8%"
            variant="success"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              Chart visualization placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cash Flow from Operations by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              Chart visualization placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
