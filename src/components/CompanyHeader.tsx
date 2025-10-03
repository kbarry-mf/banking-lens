import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { DollarSign, Calendar, User, Building2, ExternalLink } from "lucide-react";

interface CompanyHeaderProps {
  exploration: "executive" | "analyst" | "decision";
}

export const CompanyHeader = ({ exploration }: CompanyHeaderProps) => {
  if (exploration === "executive") {
    return (
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
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Requested Loan Amount</p>
              <p className="mt-1 text-sm font-semibold text-foreground">$2,500,000</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Application Date</p>
              <p className="mt-1 text-sm text-foreground">Jan 15, 2025</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Underwriter</p>
              <p className="mt-1 text-sm text-foreground">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Application Type</p>
              <p className="mt-1 text-sm text-foreground">New</p>
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
    );
  }

  if (exploration === "analyst") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Acme Corporation</h2>
              <p className="text-sm text-muted-foreground">Manufacturing & Distribution • LLC • 8 years</p>
            </div>
            <Badge className="bg-success text-success-foreground">Under Review</Badge>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-medium text-muted-foreground">Broker:</span>
                <span className="ml-2 text-foreground">First Capital Partners</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">NAICS:</span>
                <span className="ml-2 text-foreground">423120</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Loan Amount:</span>
                <span className="ml-2 font-semibold text-foreground">$2,500,000</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Application:</span>
                <span className="ml-2 text-foreground">New</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-medium text-muted-foreground">Submitted:</span>
                <span className="ml-2 text-foreground">Jan 15, 2025</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Underwriter:</span>
                <span className="ml-2 text-foreground">Sarah Johnson</span>
              </div>
              <div>
                <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
              </div>
              <div>
                <a href="#" className="text-primary hover:underline">View Box Files</a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Decision Dashboard
  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Acme Corporation</h2>
            <p className="text-sm text-muted-foreground mt-1">Manufacturing & Distribution</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-muted-foreground">LLC • 8 years • NAICS 423120</span>
              <a href="#" className="text-primary hover:underline flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
              <a href="#" className="text-primary hover:underline">Box Files</a>
            </div>
          </div>
          <Badge className="bg-success text-success-foreground">Under Review</Badge>
        </div>
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
            value="New"
            icon={Building2}
          />
        </div>
      </CardContent>
    </Card>
  );
};
