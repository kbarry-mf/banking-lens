import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface MemoField {
  id: string;
  label: string;
  placeholder: string;
}

const memoFields: MemoField[] = [
  {
    id: "businessDescription",
    label: "Business Description & Request Overview",
    placeholder: "Enter business description and request overview...",
  },
  {
    id: "credit",
    label: "Credit",
    placeholder: "Enter credit analysis...",
  },
  {
    id: "banking",
    label: "Banking",
    placeholder: "Enter banking analysis...",
  },
  {
    id: "financials",
    label: "Financials",
    placeholder: "Enter financial analysis...",
  },
  {
    id: "publicRecords",
    label: "Public Records",
    placeholder: "Enter public records information...",
  },
  {
    id: "underwriterNotes",
    label: "Underwriter Call Notes",
    placeholder: "Enter underwriter call notes...",
  },
  {
    id: "teamDiscussion",
    label: "Internal Team Discussion",
    placeholder: "Enter internal team discussion notes...",
  },
  {
    id: "recommendation",
    label: "Credit Recommendation & Rationale",
    placeholder: "Enter credit recommendation and rationale...",
  },
];

export const MemoView = () => {
  // Default sample data
  const defaultMemoData = {
    businessDescription: "Acme Corporation (dba California Plastics) is an 8-year-old manufacturer of plastic materials and resins based in Los Angeles, CA. The company is requesting $2,500,000 in funding to support working capital needs and consolidate existing debt. This is a resubmit application following previous engagement with our institution.",
    credit: "Personal FICO score of 677 indicates moderate credit strength. Mulligan Custom Score of 199 suggests moderate risk profile. Review of credit reports shows consistent payment history with no recent delinquencies. Existing credit lines remain current with utilization at 42%.",
    banking: "Six months of bank statements reviewed via Ocrolus show consistent deposit activity with annualized revenue of $8.45M. Average daily balance of $398,500 represents 18.2% balance-to-revenue ratio, slightly elevated but within acceptable parameters. Two Ocrolus Detect signals identified relate to minor formatting inconsistencies, not indicative of fraud. NSF activity minimal with only 1 occurrence in review period.",
    financials: "Annualized cash flow from operations of $1.25M demonstrates 14.8% cash flow-to-revenue ratio, providing adequate debt service coverage. Monthly cash flow averaging $104,000 shows consistency with seasonal variations expected in manufacturing. Revenue trend positive with steady growth trajectory. Working capital position adequate to support operations and proposed debt structure.",
    publicRecords: "Corporate records verified through Middesk show company in good standing with California Secretary of State. No tax liens, judgments, or bankruptcies identified. Business entity properly registered as LLC. Principal address matches application. No adverse legal proceedings identified in public record search.",
    underwriterNotes: "Call conducted with John Smith, CEO, on " + new Date().toLocaleDateString() + ". Confirmed use of proceeds for working capital and debt consolidation. Discussed seasonal cash flow patterns tied to manufacturing cycles. Management expressed confidence in current order pipeline and customer relationships. Company maintains relationships with major automotive and consumer goods manufacturers.",
    teamDiscussion: "Underwriting team reviewed application in committee meeting. Credit profile shows solid fundamentals with manageable risk indicators. Banking activity supports revenue claims. Existing debt structure presents opportunity for consolidation with favorable pricing. Recommend approval with standard monitoring covenants.",
    recommendation: "APPROVE - Recommend funding at requested amount of $2,500,000. Credit profile demonstrates solid fundamentals with manageable risk indicators. Cash flow adequate for proposed debt service. Pricing tier MCS Tier 1 appropriate given score and banking performance. Standard monitoring and reporting covenants recommended."
  };

  const [memoData, setMemoData] = useState<Record<string, string>>(() => {
    const savedData = localStorage.getItem("memoData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Merge with defaults to ensure all fields have values
      return { ...defaultMemoData, ...parsed };
    }
    return defaultMemoData;
  });

  useEffect(() => {
    localStorage.setItem("memoData", JSON.stringify(memoData));
  }, [memoData]);

  const handleChange = (id: string, value: string) => {
    setMemoData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-4 p-4">
      {memoFields.map((field) => (
        <Card key={field.id} className="p-4">
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={memoData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="min-h-[120px] resize-y"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
