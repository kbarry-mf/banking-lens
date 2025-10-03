import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calculator, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CompanyHeader } from "./CompanyHeader";
import { OfferCalculator } from "./OfferCalculator";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
  exploration: "executive" | "analyst" | "decision";
  onExplorationChange: (value: "executive" | "analyst" | "decision") => void;
}

export const Layout = ({ children, activeTab, onTabChange, exploration, onExplorationChange }: LayoutProps) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const explorationTitles = {
    executive: "Executive Brief",
    analyst: "Analyst Workspace",
    decision: "Decision Dashboard"
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-96' : ''}`}>
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Banking Lens</h1>
                  <p className="text-xs text-muted-foreground">{explorationTitles[exploration]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={exploration} onValueChange={onExplorationChange}>
                  <SelectTrigger className="w-[180px] h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive Brief</SelectItem>
                    <SelectItem value="analyst">Analyst Workspace</SelectItem>
                    <SelectItem value="decision">Decision Dashboard</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Overlay Calculator */}
                <Sheet open={calculatorOpen} onOpenChange={setCalculatorOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculator (Overlay)
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-xl p-0">
                    <OfferCalculator />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        {/* Company Header */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-6 py-3">
            <CompanyHeader exploration={exploration} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6">
            <Tabs value={activeTab} onValueChange={onTabChange}>
              <TabsList className="h-10 w-full justify-start rounded-none border-none bg-transparent p-0">
                <TabsTrigger 
                  value="summary" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="cash-flow"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Cash Flow
                </TabsTrigger>
                <TabsTrigger 
                  value="balances"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Balances
                </TabsTrigger>
                <TabsTrigger 
                  value="debt"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Debt
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-4">
          {children}
        </main>
      </div>

      {/* Sidebar Toggle - Chevron */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-card border-l border-t border-b rounded-l-lg p-2 shadow-lg hover:bg-accent transition-colors z-50"
          aria-label="Open calculator sidebar"
        >
          <ChevronLeft className="h-5 w-5 rotate-180" />
        </button>
      )}

      {/* Sidebar Calculator */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-card border-l shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Offer Calculator</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <OfferCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};
