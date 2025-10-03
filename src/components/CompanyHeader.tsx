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
              <CardTitle className="text-lg">Acme Corporation</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">dba First Capital Partners</p>
            </div>
            <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Address</p>
              <p className="mt-0.5 text-foreground">456 Oak Avenue, Apt 10, Somewhere, CA 90210</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Legal Entity</p>
              <p className="mt-0.5 text-foreground">LLC</p>
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
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground">Requested Loan Amount</p>
              <p className="mt-0.5 text-foreground font-normal">$2,500,000</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Date</p>
              <p className="mt-0.5 text-foreground">Jan 15, 2025</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Underwriter</p>
              <p className="mt-0.5 text-foreground">Sarah Johnson</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Application Type</p>
              <p className="mt-0.5 text-foreground">Resubmit</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
            <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">View Box Files</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-primary hover:underline">View Ocrolus Book</a>
          </div>
        </CardContent>
      </Card>;
  }
  if (exploration === "analyst") {
    return <Card className="shadow-none">
        <CardContent className="py-2 px-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-base font-semibold text-foreground">Acme Corporation</h2>
              <p className="text-xs text-muted-foreground">LLC • 8 years</p>
            </div>
            <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
          </div>
          <div className="grid gap-2 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <span className="font-medium text-muted-foreground">Broker:</span>
                <span className="ml-1.5 text-foreground">First Capital Partners</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Industry:</span>
                <span className="ml-1.5 text-foreground">325211: Plastics Material and Resin Manufacturing</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Requested Amount:</span>
                <span className="ml-1.5 font-semibold text-foreground">$2,500,000</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Type:</span>
                <span className="ml-1.5 text-foreground">Resubmit</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <span className="font-medium text-muted-foreground">Submitted:</span>
                <span className="ml-1.5 text-foreground">Jan 15, 2025</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Underwriter:</span>
                <span className="ml-1.5 text-foreground">Sarah Johnson</span>
              </div>
              <div>
                <a href="#" className="text-primary hover:underline">www.acmecorp.com</a>
              </div>
              <div>
                <a href="#" className="text-primary hover:underline">View Box Files</a>
              </div>
              <div>
                <a href="#" className="text-primary hover:underline">View Ocrolus Book</a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>;
  }

  // Decision Dashboard
  return <Card className="border-l-4 border-l-primary shadow-none">
      <CardContent className="py-3 px-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Acme Corporation</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Plastics Material and Resin Manufacturing</p>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-muted-foreground">LLC • 8 years</span>
              <a href="#" className="text-primary hover:underline flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
              <a href="#" className="text-primary hover:underline">Box Files</a>
              <a href="#" className="text-primary hover:underline">Ocrolus Book</a>
            </div>
          </div>
          <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">Under Review</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Requested Loan Amount" value="$2,500,000" icon={DollarSign} />
          <MetricCard label="Application Submitted" value="Jan 15, 2025" icon={Calendar} />
          <MetricCard label="Underwriter" value="Sarah Johnson" icon={User} />
          <MetricCard label="Application Type" value="Resubmit" icon={Building2} />
        </div>
      </CardContent>
    </Card>;
};