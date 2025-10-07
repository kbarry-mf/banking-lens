import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";

interface MemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MemoModal = ({ open, onOpenChange }: MemoModalProps) => {
  const handleDownloadPDF = () => {
    // Get the memo content
    const memoContent = document.getElementById('memo-content');
    if (!memoContent) return;

    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Credit Memo - Acme Corporation</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 24px;
              color: #000;
              font-weight: bold;
            }
            h2 {
              font-size: 20px;
              margin-top: 28px;
              margin-bottom: 16px;
              color: #000;
              font-weight: bold;
              border-bottom: 2px solid #333;
              padding-bottom: 6px;
            }
            h3 {
              font-size: 14px;
              margin-top: 16px;
              margin-bottom: 8px;
              color: #555;
            }
            .header {
              margin-bottom: 32px;
              border-bottom: 3px solid #000;
              padding-bottom: 16px;
            }
            .company-info {
              font-size: 12px;
              color: #666;
              margin-bottom: 4px;
            }
            .memo-field {
              margin-bottom: 20px;
            }
            h3 {
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 6px;
              color: #333;
            }
            .metric-value {
              font-size: 18px;
              font-weight: 600;
              color: #000;
              margin-bottom: 2px;
            }
            .section {
              margin-bottom: 24px;
              page-break-inside: avoid;
            }
            .offer-details {
              background: #f9f9f9;
              padding: 16px;
              border-radius: 4px;
              margin: 12px 0;
            }
            .offer-row {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              border-bottom: 1px solid #e5e5e5;
            }
            .offer-row:last-child {
              border-bottom: none;
            }
            .offer-label {
              font-size: 12px;
              color: #666;
            }
            .offer-value {
              font-size: 12px;
              font-weight: 600;
            }
            .memo-text {
              font-size: 12px;
              line-height: 1.8;
              color: #444;
            }
            .memo-text p {
              margin-bottom: 8px;
            }
            .memo-text ul, .memo-text ol {
              margin-left: 20px;
              margin-bottom: 8px;
            }
            .memo-text strong {
              font-weight: 600;
            }
            .memo-text em {
              font-style: italic;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${memoContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  // Get saved memo data from localStorage
  const getSavedMemoData = () => {
    const savedData = localStorage.getItem("memoData");
    return savedData ? JSON.parse(savedData) : {};
  };

  const memoData = getSavedMemoData();

  // Sample data for memo fields
  const sampleMemoData = {
    businessDescription: memoData.businessDescription || "Acme Corporation (dba California Plastics) is an 8-year-old manufacturer of plastic materials and resins based in Los Angeles, CA. The company is requesting $2,500,000 in funding to support working capital needs and consolidate existing debt. This is a resubmit application following previous engagement with our institution.",
    credit: memoData.credit || "Personal FICO score of 677 indicates moderate credit strength. Mulligan Custom Score of 199 suggests moderate risk profile. Review of credit reports shows consistent payment history with no recent delinquencies. Existing credit lines remain current with utilization at 42%.",
    banking: memoData.banking || "Six months of bank statements reviewed via Ocrolus show consistent deposit activity with annualized revenue of $8.45M. Average daily balance of $398,500 represents 18.2% balance-to-revenue ratio, slightly elevated but within acceptable parameters. Two Ocrolus Detect signals identified relate to minor formatting inconsistencies, not indicative of fraud. NSF activity minimal with only 1 occurrence in review period.",
    financials: memoData.financials || "Annualized cash flow from operations of $1.25M demonstrates 14.8% cash flow-to-revenue ratio, providing adequate debt service coverage. Monthly cash flow averaging $104,000 shows consistency with seasonal variations expected in manufacturing. Revenue trend positive with steady growth trajectory. Working capital position adequate to support operations and proposed debt structure.",
    publicRecords: memoData.publicRecords || "Corporate records verified through Middesk show company in good standing with California Secretary of State. No tax liens, judgments, or bankruptcies identified. Business entity properly registered as LLC. Principal address matches application. No adverse legal proceedings identified in public record search.",
    underwriterNotes: memoData.underwriterNotes || "Call conducted with John Smith, CEO, on " + new Date().toLocaleDateString() + ". Confirmed use of proceeds for working capital and debt consolidation. Discussed seasonal cash flow patterns tied to manufacturing cycles. Management expressed confidence in current order pipeline and customer relationships. Company maintains relationships with major automotive and consumer goods manufacturers.",
    teamDiscussion: memoData.teamDiscussion || "Underwriting team reviewed application in committee meeting. Credit profile shows solid fundamentals with manageable risk indicators. Banking activity supports revenue claims. Existing debt structure presents opportunity for consolidation with favorable pricing. Recommend approval with standard monitoring covenants.",
    recommendation: memoData.recommendation || "APPROVE - Recommend funding at requested amount of $2,500,000. Credit profile demonstrates solid fundamentals with manageable risk indicators. Cash flow adequate for proposed debt service. Pricing tier MCS Tier 1 appropriate given score and banking performance. Standard monitoring and reporting covenants recommended."
  };

  // Sample company data
  const companyData = {
    name: "Acme Corporation",
    address: "123 Main Street, Los Angeles, CA 90001",
    yearsInBusiness: "8",
    industry: "Plastics Material and Resin Manufacturing",
    website: "www.acmecorp.com"
  };

  const applicationData = {
    id: "UND-00597881",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    requestedAmount: "$2,500,000",
    type: "Working Capital & Debt Consolidation",
    broker: "Smith Financial Group"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Credit Memorandum
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div id="memo-content">
            {/* Company Name as Title */}
            <div className="header">
              <h1>{companyData.name}</h1>
            </div>

            {/* Company Overview */}
            <div className="section">
              <h2>Company Overview</h2>
              <div className="memo-field">
                <h3>Address</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: companyData.address }} />
              </div>
              <div className="memo-field">
                <h3>Years in Business</h3>
                <div className="memo-text">{companyData.yearsInBusiness}</div>
              </div>
              <div className="memo-field">
                <h3>Industry</h3>
                <div className="memo-text">{companyData.industry}</div>
              </div>
              <div className="memo-field">
                <h3>Website</h3>
                <div className="memo-text">{companyData.website}</div>
              </div>
            </div>

            {/* Application Overview */}
            <div className="section">
              <h2>Application Overview</h2>
              <div className="memo-field">
                <h3>Application ID</h3>
                <div className="memo-text">{applicationData.id}</div>
              </div>
              <div className="memo-field">
                <h3>Application Date</h3>
                <div className="memo-text">{applicationData.date}</div>
              </div>
              <div className="memo-field">
                <h3>Requested Loan Amount</h3>
                <div className="memo-text">{applicationData.requestedAmount}</div>
              </div>
              <div className="memo-field">
                <h3>Application Type</h3>
                <div className="memo-text">{applicationData.type}</div>
              </div>
              <div className="memo-field">
                <h3>Broker</h3>
                <div className="memo-text">{applicationData.broker}</div>
              </div>
            </div>

            {/* Credit Overview */}
            <div className="section">
              <h2>Credit Overview</h2>
              <div className="memo-field">
                <h3>FICO Score</h3>
                <div className="memo-text">677</div>
              </div>
              <div className="memo-field">
                <h3>Mulligan Custom Score</h3>
                <div className="memo-text">199</div>
              </div>
            </div>

            {/* Banking Overview */}
            <div className="section">
              <h2>Banking Overview</h2>
              <div className="memo-field">
                <h3>Annualized Revenue</h3>
                <div className="memo-text">{formatCurrency(8450000)}</div>
              </div>
              <div className="memo-field">
                <h3>Annualized Cash Flow</h3>
                <div className="memo-text">{formatCurrency(1250000)}</div>
              </div>
              <div className="memo-field">
                <h3>Adjusted Average Daily Balance</h3>
                <div className="memo-text">{formatCurrency(398500)}</div>
              </div>
              <div className="memo-field">
                <h3>Balance to Revenue Ratio</h3>
                <div className="memo-text">18.2%</div>
              </div>
              <div className="memo-field">
                <h3>Cash Flow to Revenue Ratio</h3>
                <div className="memo-text">14.8%</div>
              </div>
            </div>

            {/* Offer Details */}
            <div className="section">
              <h2>Offer Details</h2>
              <div className="memo-field">
                <h3>Funding Amount</h3>
                <div className="memo-text">$5,300.00</div>
              </div>
              <div className="memo-field">
                <h3>Term</h3>
                <div className="memo-text">63 days</div>
              </div>
              <div className="memo-field">
                <h3>Pricing Tier</h3>
                <div className="memo-text">MCS Tier 1 (50%) - 3 Months</div>
              </div>
              <div className="memo-field">
                <h3>Buy Rate</h3>
                <div className="memo-text">1.12000</div>
              </div>
              <div className="memo-field">
                <h3>Max Markup</h3>
                <div className="memo-text">12%</div>
              </div>
              <div className="memo-field">
                <h3>Factor</h3>
                <div className="memo-text">1.24</div>
              </div>
              <div className="memo-field">
                <h3>Payment Frequency</h3>
                <div className="memo-text">Weekly</div>
              </div>
              <div className="memo-field">
                <h3>Monthly Holdback %</h3>
                <div className="memo-text">3.23%</div>
              </div>
              <div className="memo-field">
                <h3>Origination Fee</h3>
                <div className="memo-text">$295.00 (5.57%)</div>
              </div>
            </div>

            {/* Memo */}
            <div className="section">
              <h2>Memo</h2>
              <div className="memo-field">
                <h3>Business Description & Request Overview</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.businessDescription }} />
              </div>
              <div className="memo-field">
                <h3>Credit</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.credit }} />
              </div>
              <div className="memo-field">
                <h3>Banking</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.banking }} />
              </div>
              <div className="memo-field">
                <h3>Financials</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.financials }} />
              </div>
              <div className="memo-field">
                <h3>Public Records</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.publicRecords }} />
              </div>
              <div className="memo-field">
                <h3>Underwriter Call Notes</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.underwriterNotes }} />
              </div>
              <div className="memo-field">
                <h3>Internal Team Discussion</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.teamDiscussion }} />
              </div>
              <div className="memo-field">
                <h3>Credit Recommendation & Rationale</h3>
                <div className="memo-text" dangerouslySetInnerHTML={{ __html: sampleMemoData.recommendation }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};