import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  description?: string;
}

export const MetricCard = ({ 
  label, 
  value, 
  icon: Icon, 
  variant = "default",
  description 
}: MetricCardProps) => {
  const variantStyles = {
    default: "border-border",
    success: "border-l-4 border-l-success",
    warning: "border-l-4 border-l-warning",
    destructive: "border-l-4 border-l-destructive",
  };

  return (
    <Card className={cn("p-4", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
