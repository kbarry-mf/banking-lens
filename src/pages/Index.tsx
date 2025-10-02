import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SummaryView } from "@/components/SummaryView";
import { CashFlowView } from "@/components/CashFlowView";
import { BalancesView } from "@/components/BalancesView";
import { DebtView } from "@/components/DebtView";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [exploration, setExploration] = useState<"executive" | "analyst" | "decision">("executive");

  const renderContent = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryView exploration={exploration} />;
      case "cash-flow":
        return <CashFlowView exploration={exploration} />;
      case "balances":
        return <BalancesView exploration={exploration} />;
      case "debt":
        return <DebtView exploration={exploration} />;
      default:
        return <SummaryView exploration={exploration} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      exploration={exploration}
      onExplorationChange={setExploration}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;
