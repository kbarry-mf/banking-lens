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
  lowerIsBetter?: boolean;
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
  lowerIsBetter = false
}: MetricCardProps) => {
  // Determine status indicator based on variant
  const StatusIcon = variant === "warning" ? AlertCircle : variant === "destructive" ? AlertTriangle : null;
  const statusIconColor = variant === "warning" ? "text-warning" : variant === "destructive" ? "text-destructive" : "";

  // Calculate trend direction - flip logic if lower is better
  const changeValue = changePercent ?? changePoints;
  const isPositive = changeValue !== undefined 
    ? (lowerIsBetter ? changeValue < 0 : changeValue >= 0)
    : undefined;

  return (
    <Card className="p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            {StatusIcon && (
              <StatusIcon className={cn("h-3 w-3", statusIconColor)} />
            )}
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
                {changePoints > 0 ? "+" : ""}{changePoints} pts
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
