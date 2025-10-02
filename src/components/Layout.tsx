import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
  exploration: "executive" | "analyst" | "decision";
  onExplorationChange: (value: "executive" | "analyst" | "decision") => void;
}

export const Layout = ({ children, activeTab, onTabChange, exploration, onExplorationChange }: LayoutProps) => {
  const explorationTitles = {
    executive: "Executive Brief",
    analyst: "Analyst Workspace",
    decision: "Decision Dashboard"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Banking Lens</h1>
                <p className="text-sm text-muted-foreground">{explorationTitles[exploration]}</p>
              </div>
            </div>
            <Select value={exploration} onValueChange={onExplorationChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="executive">Executive Brief</SelectItem>
                <SelectItem value="analyst">Analyst Workspace</SelectItem>
                <SelectItem value="decision">Decision Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="h-12 w-full justify-start rounded-none border-none bg-transparent p-0">
              <TabsTrigger 
                value="summary" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger 
                value="cash-flow"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Cash Flow
              </TabsTrigger>
              <TabsTrigger 
                value="balances"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Balances
              </TabsTrigger>
              <TabsTrigger 
                value="debt"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Debt
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
};
