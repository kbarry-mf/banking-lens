import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { DollarSign, Calendar, User, Building2, ExternalLink } from "lucide-react";
interface CompanyHeaderProps {
  exploration: "executive" | "analyst" | "decision";
}
export const CompanyHeader = ({
  exploration
}: CompanyHeaderProps) => {
  if (exploration === "executive") {
    return <Card className="shadow-none">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-lg">
                  <a href="#" className="hover:underline">Acme Corporation</a>
                </CardTitle>
                <span className="text-xs text-muted-foreground">dba California Plastics</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">First Capital Partners</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
              <Badge className="bg-chart-1 text-white text-xs px-2 py-0.5">Mid Market</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Address</p>
              <p className="mt-0.5 text-foreground">1234 Industrial Way, Los Angeles, CA 90001</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Type</p>
              <p className="mt-0.5 text-foreground">Resubmit</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Years in Business</p>
              <p className="mt-0.5 text-foreground">8 years</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Industry</p>
              <p className="mt-0.5 text-foreground">325211: Plastics Material and Resin Manufacturing</p>
            </div>
          </div>
          <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Requested Loan Amount</p>
              <p className="mt-0.5 text-foreground font-normal">$2,500,000</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Date</p>
              <p className="mt-0.5 text-foreground">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Underwriter</p>
              <p className="mt-0.5 text-foreground">Sarah Johnson</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
            <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Box</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Middesk</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Ocrolus</a>
          </div>
        </CardContent>
      </Card>;
  }
  if (exploration === "analyst") {
    return <Card className="shadow-none">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-lg">
                  <a href="#" className="hover:underline">Acme Corporation</a>
                </CardTitle>
                <span className="text-xs text-muted-foreground">dba California Plastics</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">First Capital Partners</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
              <Badge className="bg-chart-1 text-white text-xs px-2 py-0.5">Mid Market</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Address</p>
              <p className="mt-0.5 text-foreground">1234 Industrial Way, Los Angeles, CA 90001</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Type</p>
              <p className="mt-0.5 text-foreground">Resubmit</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Years in Business</p>
              <p className="mt-0.5 text-foreground">8 years</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Industry</p>
              <p className="mt-0.5 text-foreground">325211: Plastics Material and Resin Manufacturing</p>
            </div>
          </div>
          <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Requested Loan Amount</p>
              <p className="mt-0.5 text-foreground font-normal">$2,500,000</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Date</p>
              <p className="mt-0.5 text-foreground">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Underwriter</p>
              <p className="mt-0.5 text-foreground">Sarah Johnson</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
            <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Box</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Middesk</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">Ocrolus</a>
          </div>
        </CardContent>
      </Card>;
  }

  // Decision Dashboard
  return <Card className="border-l-4 border-l-primary shadow-none">
      <CardContent className="py-3 px-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-bold text-foreground">
                <a href="#" className="hover:underline">Acme Corporation</a>
              </h2>
              <span className="text-xs text-muted-foreground">dba California Plastics</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">First Capital Partners</p>
            <p className="text-xs text-muted-foreground mt-0.5">Plastics Material and Resin Manufacturing</p>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-muted-foreground">LLC • 8 years</span>
              <a href="#" className="text-primary hover:underline flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
              <a href="#" className="text-primary hover:underline">Box Files</a>
              <a href="#" className="text-primary hover:underline">Middesk</a>
              <a href="#" className="text-primary hover:underline">Ocrolus Book</a>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
            <Badge className="bg-chart-1 text-white text-xs px-2 py-0.5">Mid Market</Badge>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Requested Loan Amount" value="$2,500,000" icon={DollarSign} />
          <MetricCard label="Application Submitted" value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} icon={Calendar} />
          <MetricCard label="Underwriter" value="Sarah Johnson" icon={User} />
          <MetricCard label="Application Type" value="Resubmit" icon={Building2} />
        </div>
      </CardContent>
    </Card>;
};