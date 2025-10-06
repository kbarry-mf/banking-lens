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
  visualVariant?: "leftBorder" | "topAccent" | "cornerBadge" | "glowEffect" | "backgroundTint";
}

export const MetricCard = ({ 
  label, 
  value, 
  icon: Icon, 
  variant = "default",
  description,
  priorValue,
  changePercent,
  visualVariant = "leftBorder"
}: MetricCardProps) => {
  const isPositive = changePercent !== undefined && changePercent >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  // Color mapping for variants
  const variantColors = {
    default: { border: "border-border", bg: "bg-muted", text: "text-muted-foreground", glow: "shadow-muted/20" },
    success: { border: "border-success", bg: "bg-success/10", text: "text-success", glow: "shadow-success/30" },
    warning: { border: "border-warning", bg: "bg-warning/10", text: "text-warning", glow: "shadow-warning/30" },
    destructive: { border: "border-destructive", bg: "bg-destructive/10", text: "text-destructive", glow: "shadow-destructive/30" },
  };

  const colors = variantColors[variant];

  // Visual variant styles
  const getCardStyles = () => {
    switch (visualVariant) {
      case "leftBorder":
        return variant === "default" 
          ? "border-border" 
          : `border-l-4 ${colors.border}`;
      
      case "topAccent":
        return variant === "default"
          ? "border-border"
          : `border-t-4 ${colors.border} ${colors.bg}`;
      
      case "cornerBadge":
        return "border-border relative overflow-hidden";
      
      case "glowEffect":
        return variant === "default"
          ? "border-border"
          : `border ${colors.border} shadow-lg ${colors.glow}`;
      
      case "backgroundTint":
        return variant === "default"
          ? "border-border"
          : `border ${colors.border} ${colors.bg}`;
      
      default:
        return "border-border";
    }
  };

  return (
    <Card className={cn("p-3", getCardStyles())}>
      {/* Corner Badge for cornerBadge variant */}
      {visualVariant === "cornerBadge" && variant !== "default" && (
        <div className={cn(
          "absolute -right-8 -top-8 h-16 w-16 rotate-45",
          colors.bg,
          `border-4 ${colors.border}`
        )} />
      )}
      
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
          <div className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            visualVariant === "glowEffect" && variant !== "default"
              ? `${colors.bg} ${colors.text}`
              : "bg-primary/10 text-primary"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    </Card>
  );
};
