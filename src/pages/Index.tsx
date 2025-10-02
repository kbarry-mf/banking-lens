import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SummaryView } from "@/components/SummaryView";
import { CashFlowView } from "@/components/CashFlowView";
import { BalancesView } from "@/components/BalancesView";
import { DebtView } from "@/components/DebtView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const renderContent = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryView />;
      case "cash-flow":
        return <CashFlowView />;
      case "balances":
        return <BalancesView />;
      case "debt":
        return <DebtView />;
      default:
        return <SummaryView />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
