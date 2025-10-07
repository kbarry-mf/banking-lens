import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
              font-size: 24px;
              margin-bottom: 8px;
              color: #000;
            }
            h2 {
              font-size: 18px;
              margin-top: 24px;
              margin-bottom: 12px;
              color: #000;
              border-bottom: 2px solid #333;
              padding-bottom: 4px;
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
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              margin: 16px 0;
            }
            .metric {
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .metric-label {
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .metric-value {
              font-size: 16px;
              font-weight: 600;
              color: #000;
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
            .memo-field {
              margin-bottom: 20px;
            }
            .memo-text {
              font-size: 12px;
              line-height: 1.8;
              white-space: pre-wrap;
              color: #444;
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
    credit: memoData.credit || "Personal FICO score of 677 represents a 32-point improvement from prior review (645), indicating positive credit trajectory. Mulligan Custom Score of 199 (up 17 points from 182) suggests moderate risk profile. Review of credit reports shows consistent payment history with no recent delinquencies. Existing credit lines remain current with utilization at 42%.",
    banking: memoData.banking || "Six months of bank statements reviewed via Ocrolus show consistent deposit activity with annualized revenue of $8.45M (+7% YoY). Average daily balance of $398,500 represents 18.2% balance-to-revenue ratio, slightly elevated but within acceptable parameters. Two Ocrolus Detect signals identified relate to minor formatting inconsistencies, not indicative of fraud. NSF activity minimal with only 1 occurrence in review period.",
    financials: memoData.financials || "Annualized cash flow from operations of $1.25M demonstrates 14.8% cash flow-to-revenue ratio, providing adequate debt service coverage. Monthly cash flow averaging $104,000 shows consistency with seasonal variations expected in manufacturing. Revenue trend positive with 7% growth trajectory. Working capital position adequate to support operations and proposed debt structure.",
    publicRecords: memoData.publicRecords || "Corporate records verified through Middesk show company in good standing with California Secretary of State. No tax liens, judgments, or bankruptcies identified. Business entity properly registered as LLC. Principal address matches application. No adverse legal proceedings identified in public record search.",
    underwriterNotes: memoData.underwriterNotes || "Call conducted with John Smith, CEO, on " + new Date().toLocaleDateString() + ". Confirmed use of proceeds for working capital and debt consolidation. Discussed seasonal cash flow patterns tied to manufacturing cycles. Management expressed confidence in current order pipeline and customer relationships. Company maintains relationships with major automotive and consumer goods manufacturers.",
    teamDiscussion: memoData.teamDiscussion || "Underwriting team reviewed application in committee meeting. Consensus that credit profile has improved materially since last review. Banking activity supports revenue claims. Existing debt structure presents opportunity for consolidation with favorable pricing. Recommend approval with standard monitoring covenants.",
    recommendation: memoData.recommendation || "APPROVE - Recommend funding at requested amount of $2,500,000. Credit profile demonstrates improvement trajectory with manageable risk indicators. Cash flow adequate for proposed debt service. Pricing tier MCS Tier 1 appropriate given score and banking performance. Standard monitoring and reporting covenants recommended."
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
            {/* Header */}
            <div className="header">
              <h1>Credit Memorandum</h1>
              <div className="company-info">Acme Corporation (dba California Plastics)</div>
              <div className="company-info">Application ID: UND-00597881</div>
              <div className="company-info">Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div className="company-info">Underwriter: Sarah Johnson</div>
            </div>

            {/* Executive Summary */}
            <div className="section">
              <h2>Executive Summary</h2>
              <div className="metrics-grid">
                <div className="metric">
                  <div className="metric-label">Company</div>
                  <div className="metric-value">Acme Corporation</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                    Plastics Material and Resin Manufacturing
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Requested Amount</div>
                  <div className="metric-value">$2,500,000</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                    Years in Business: 8
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Annualized Revenue</div>
                  <div className="metric-value">{formatCurrency(8450000)}</div>
                  <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px' }}>
                    ↑ 7% YoY
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">FICO Score</div>
                  <div className="metric-value">677</div>
                  <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px' }}>
                    ↑ 32 points
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Annualized Cash Flow</div>
                  <div className="metric-value">{formatCurrency(1250000)}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                    14.8% of revenue
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">Mulligan Custom Score</div>
                  <div className="metric-value">199</div>
                  <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px' }}>
                    ↑ 17 points
                  </div>
                </div>
              </div>
            </div>

            {/* Offer Terms */}
            <div className="section">
              <h2>Proposed Offer Terms</h2>
              <div className="offer-details">
                <div className="offer-row">
                  <span className="offer-label">Funding Amount</span>
                  <span className="offer-value">$5,300.00</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Term</span>
                  <span className="offer-value">63 days</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Payment Frequency</span>
                  <span className="offer-value">Weekly</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Payment Amount</span>
                  <span className="offer-value">$521.60</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Monthly Holdback %</span>
                  <span className="offer-value">3.23%</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Buy Rate</span>
                  <span className="offer-value">1.12000</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Total Factor</span>
                  <span className="offer-value">1.24</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Origination Fee</span>
                  <span className="offer-value">$295.00 (5.57%)</span>
                </div>
                <div className="offer-row">
                  <span className="offer-label">Pricing Tier</span>
                  <span className="offer-value">MCS Tier 1 (50%) - 3 Months</span>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="section">
              <h2>Detailed Analysis</h2>

              <div className="memo-field">
                <h3>Business Description & Request Overview</h3>
                <div className="memo-text">{sampleMemoData.businessDescription}</div>
              </div>

              <div className="memo-field">
                <h3>Credit</h3>
                <div className="memo-text">{sampleMemoData.credit}</div>
              </div>

              <div className="memo-field">
                <h3>Banking</h3>
                <div className="memo-text">{sampleMemoData.banking}</div>
              </div>

              <div className="memo-field">
                <h3>Financials</h3>
                <div className="memo-text">{sampleMemoData.financials}</div>
              </div>

              <div className="memo-field">
                <h3>Public Records</h3>
                <div className="memo-text">{sampleMemoData.publicRecords}</div>
              </div>

              <div className="memo-field">
                <h3>Underwriter Call Notes</h3>
                <div className="memo-text">{sampleMemoData.underwriterNotes}</div>
              </div>

              <div className="memo-field">
                <h3>Internal Team Discussion</h3>
                <div className="memo-text">{sampleMemoData.teamDiscussion}</div>
              </div>

              <div className="memo-field">
                <h3>Credit Recommendation & Rationale</h3>
                <div className="memo-text">{sampleMemoData.recommendation}</div>
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