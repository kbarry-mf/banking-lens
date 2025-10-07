import { useState, useEffect } from "react";
import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, ChevronLeft, CheckCircle, XCircle, FileWarning, Send, Upload, MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyHeader } from "./CompanyHeader";
import { OfferCalculator } from "./OfferCalculator";
import { MemoView } from "./MemoView";
import { ChatterView } from "./ChatterView";
import { DetailsView } from "./DetailsView";
import { MemoModal } from "./MemoModal";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"calculator" | "chatter" | "memo">("calculator");
  const [sidebarWidth, setSidebarWidth] = useState(384); // 96 * 4 = 384px (w-96)
  const [isResizing, setIsResizing] = useState(false);
  const [memoModalOpen, setMemoModalOpen] = useState(false);
  const [underwriter, setUnderwriter] = useState<string>("");

  const handleClaimToggle = () => {
    setUnderwriter(prev => prev ? "" : "Kenny Barry");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    // Clamp width between 280px (min) and 600px (max)
    const clampedWidth = Math.min(Math.max(newWidth, 280), 600);
    setSidebarWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add/remove mouse event listeners for resizing
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col transition-all duration-300" 
        style={{ marginRight: sidebarOpen ? `${sidebarWidth}px` : '0' }}
      >
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-3 max-w-[1600px]">
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
                <Button variant="outline" size="sm" onClick={() => setMemoModalOpen(true)} className="flex">
                  <FileText className="h-4 w-4" />
                  Memo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClaimToggle}
                  className={`${sidebarOpen ? 'hidden xl:flex' : 'hidden md:flex'} ${!underwriter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                >
                  <CheckCircle className="h-4 w-4" />
                  Claim
                </Button>
                <Button variant="outline" size="sm" className={`${sidebarOpen ? 'hidden xl:flex' : 'hidden md:flex'}`}>
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
                <Button variant="outline" size="sm" className={`${sidebarOpen ? 'hidden lg:flex' : 'flex'}`}>
                  <FileWarning className="h-4 w-4" />
                  Condition
                </Button>
                <Button variant="outline" size="sm" className="flex">
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
                    <Button variant="outline" size="sm" className={`${sidebarOpen ? 'xl:hidden' : 'md:hidden'}`}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card z-50">
                    {/* Condition - hidden on lg and up when sidebar open, always visible when closed */}
                    <DropdownMenuItem className={`${sidebarOpen ? 'lg:hidden' : 'hidden'}`}>
                      <FileWarning className="h-4 w-4 mr-2" />
                      Condition
                    </DropdownMenuItem>
                    {/* Decline - hidden on xl and up */}
                    <DropdownMenuItem className={`${sidebarOpen ? 'xl:hidden' : 'md:hidden'}`}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </DropdownMenuItem>
                    {/* Claim - hidden on xl and up */}
                    <DropdownMenuItem onClick={handleClaimToggle} className={`${sidebarOpen ? 'xl:hidden' : 'md:hidden'}`}>
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
          <div className="container mx-auto px-6 py-3 max-w-[1600px]">
            <CompanyHeader exploration="analyst" underwriter={underwriter} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6 max-w-[1600px]">
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
                <TabsTrigger 
                  value="renewal"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Renewal
                </TabsTrigger>
                <TabsTrigger 
                  value="transactions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-4 max-w-[1600px]">
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
        className={`fixed right-0 top-0 h-full bg-card border-l shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: sidebarOpen ? `${sidebarWidth}px` : '100%', maxWidth: '100%' }}
      >
        {/* Resize Handle */}
        {sidebarOpen && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/20 active:bg-primary/40 transition-colors group"
            style={{ touchAction: 'none' }}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-border group-hover:bg-primary/40 rounded-r transition-colors" />
          </div>
        )}
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
                  value="memo"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Memo
                </TabsTrigger>
                <TabsTrigger 
                  value="chatter"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm"
                >
                  Chatter
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

      {/* Memo Modal */}
      <MemoModal open={memoModalOpen} onOpenChange={setMemoModalOpen} />
    </div>
  );
};
