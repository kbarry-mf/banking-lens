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
  const [memoData, setMemoData] = useState<Record<string, string>>(() => {
    const savedData = localStorage.getItem("memoData");
    return savedData ? JSON.parse(savedData) : {};
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
