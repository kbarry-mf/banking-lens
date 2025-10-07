import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pencil, Check, X } from "lucide-react";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

const EditableField = ({ label, value, onSave }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-2 gap-3 py-2 border-b last:border-b-0 group hover:bg-accent/50 transition-colors">
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      <div className="flex items-center justify-between gap-2">
        {isEditing ? (
          <div className="flex items-center gap-1.5 flex-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-7 flex-1 text-xs"
              autoFocus
            />
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ) : (
          <>
            <span className="text-xs text-foreground">{value}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const DetailsView = () => {
  const [companyInfo, setCompanyInfo] = useState({
    businessDescription: "Custom Plastic Injection Molding",
    controlPerson: "Theresa Yates",
    useOfProceeds: "Finance Accounts Receivable",
    corporateStructure: "LLC",
  });

  const updateField = (field: keyof typeof companyInfo, value: string) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-3">
      <Accordion type="multiple" defaultValue={["company", "parties", "transaction"]} className="space-y-3">
        {/* Company Information Section */}
        <AccordionItem value="company" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
            <h2 className="text-sm font-semibold">Company Information</h2>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <div className="space-y-0">
              <EditableField
                label="Business Description"
                value={companyInfo.businessDescription}
                onSave={(value) => updateField("businessDescription", value)}
              />
              <EditableField
                label="Corporate Structure"
                value={companyInfo.corporateStructure}
                onSave={(value) => updateField("corporateStructure", value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Key Parties Section */}
        <AccordionItem value="parties" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
            <h2 className="text-sm font-semibold">Key Parties</h2>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <div className="space-y-0">
              <EditableField
                label="Control Person"
                value={companyInfo.controlPerson}
                onSave={(value) => updateField("controlPerson", value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transaction Details Section */}
        <AccordionItem value="transaction" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
            <h2 className="text-sm font-semibold">Transaction Details</h2>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <div className="space-y-0">
              <EditableField
                label="Use of Proceeds"
                value={companyInfo.useOfProceeds}
                onSave={(value) => updateField("useOfProceeds", value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
