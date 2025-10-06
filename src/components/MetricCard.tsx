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
  lowerIsBetter = false
}: MetricCardProps) => {
  // Determine status indicator based on variant
  const StatusIcon = variant === "warning" ? AlertCircle : variant === "destructive" ? AlertTriangle : null;
  const statusIconColor = variant === "warning" ? "text-warning" : variant === "destructive" ? "text-destructive" : "";

  // Calculate trend direction - flip logic if lower is better
  const isPositive = changePercent !== undefined 
    ? (lowerIsBetter ? changePercent < 0 : changePercent >= 0)
    : undefined;

  return (
    <Card className="p-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
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
        {StatusIcon && (
          <div className="flex h-5 w-5 items-center justify-center">
            <StatusIcon className={cn("h-5 w-5", statusIconColor)} />
          </div>
        )}
      </div>
    </Card>
  );
};
