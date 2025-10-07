import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, ChevronLeft, CheckCircle, XCircle, FileWarning, Send, Upload, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyHeader } from "./CompanyHeader";
import { OfferCalculator } from "./OfferCalculator";
import { MemoView } from "./MemoView";
import { ChatterView } from "./ChatterView";
import { DetailsView } from "./DetailsView";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"calculator" | "chatter" | "memo">("calculator");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:mr-96' : ''}`}>
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Underwriting</span>
                  <h1 className="text-xl font-bold text-foreground">UND-00597881</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* All buttons visible on large screens, progressively hide on smaller */}
                <Button variant="outline" size="sm" className="hidden lg:flex">
                  <CheckCircle className="h-4 w-4" />
                  Claim
                </Button>
                <Button variant="outline" size="sm" className="hidden lg:flex">
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <FileWarning className="h-4 w-4" />
                  Condition
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Upload className="h-4 w-4" />
                  Submit
                </Button>
                <Button variant="default" size="sm">
                  <Send className="h-4 w-4" />
                  Present
                </Button>

                {/* Dropdown for overflow buttons - only show when buttons are hidden */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card z-50">
                    {/* Submit - hidden on sm and up */}
                    <DropdownMenuItem className="sm:hidden">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit
                    </DropdownMenuItem>
                    {/* Condition - hidden on md and up */}
                    <DropdownMenuItem className="md:hidden">
                      <FileWarning className="h-4 w-4 mr-2" />
                      Condition
                    </DropdownMenuItem>
                    {/* Decline - hidden on lg and up */}
                    <DropdownMenuItem className="lg:hidden">
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </DropdownMenuItem>
                    {/* Claim - hidden on lg and up */}
                    <DropdownMenuItem className="lg:hidden">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Claim
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Company Header */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-6 py-3">
            <CompanyHeader exploration="analyst" />
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
                <TabsTrigger 
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="related"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Related
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
        className={`fixed right-0 top-0 h-full w-full lg:w-96 bg-card border-l shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Tabs value={sidebarTab} onValueChange={(value) => setSidebarTab(value as "calculator" | "chatter" | "memo")} className="flex-1">
              <TabsList className="h-9 w-full justify-start bg-transparent p-0">
                <TabsTrigger 
                  value="calculator"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Calculator
                </TabsTrigger>
                <TabsTrigger 
                  value="chatter"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Chatter
                </TabsTrigger>
                <TabsTrigger 
                  value="memo"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Memo
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            {sidebarTab === "calculator" ? (
              <OfferCalculator />
            ) : sidebarTab === "memo" ? (
              <MemoView />
            ) : (
              <ChatterView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
