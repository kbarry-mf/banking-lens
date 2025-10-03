import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  description?: string;
  priorValue?: string;
  changePercent?: number;
}

export const MetricCard = ({ 
  label, 
  value, 
  icon: Icon, 
  variant = "default",
  description,
  priorValue,
  changePercent
}: MetricCardProps) => {
  const variantStyles = {
    default: "border-border",
    success: "border-l-4 border-l-success",
    warning: "border-l-4 border-l-warning",
    destructive: "border-l-4 border-l-destructive",
  };

  const isPositive = changePercent !== undefined && changePercent >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className={cn("p-3", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-lg font-semibold text-foreground">{value}</p>
            {priorValue && (
              <p className="text-xs text-muted-foreground">vs {priorValue}</p>
            )}
          </div>
          {changePercent !== undefined && (
            <div className={cn(
              "mt-0.5 flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}>
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(changePercent)}% vs prior submission</span>
            </div>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
