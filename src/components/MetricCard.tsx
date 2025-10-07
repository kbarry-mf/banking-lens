import { Card } from "@/components/ui/card";
import { LucideIcon, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  description?: string;
  priorValue?: string;
  changePercent?: number;
  changePoints?: number; // For displaying change in points instead of percentage
  changeUnit?: string; // Custom unit label (defaults to "pts")
  lowerIsBetter?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}

export const MetricCard = ({ 
  label, 
  value, 
  icon: Icon, 
  variant = "default",
  description,
  priorValue,
  changePercent,
  changePoints,
  changeUnit = "pts",
  lowerIsBetter = false,
  onClick,
  clickable = false
}: MetricCardProps) => {
  // Determine status indicator color based on variant
  const dotColor = variant === "warning" ? "bg-warning" : variant === "destructive" ? "bg-destructive" : null;

  // Calculate trend direction - flip logic if lower is better
  const changeValue = changePercent ?? changePoints;
  const isPositive = changeValue !== undefined 
    ? (lowerIsBetter ? changeValue < 0 : changeValue >= 0)
    : undefined;

  return (
    <Card 
      className={cn(
        "p-3",
        clickable && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {dotColor && (
          <div className={cn("w-1 h-full rounded-full flex-shrink-0", dotColor)} />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            {changePercent !== undefined && (
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {changePercent > 0 ? "+" : ""}{changePercent}%
              </span>
            )}
            {changePoints !== undefined && (
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {changePoints > 0 ? "+" : ""}{changePoints} {changeUnit}
              </span>
            )}
          </div>
          {priorValue && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span>→</span>
              <span>{priorValue}</span>
            </p>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
