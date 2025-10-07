import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SummaryView } from "@/components/SummaryView";
import { DetailsView } from "@/components/DetailsView";
import { CashFlowView } from "@/components/CashFlowView";
import { BalancesView } from "@/components/BalancesView";
import { DebtView } from "@/components/DebtView";
import { RelatedView } from "@/components/RelatedView";
import { RenewalView } from "@/components/RenewalView";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const renderContent = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryView exploration="analyst" onTabChange={setActiveTab} />;
      case "details":
        return <DetailsView />;
      case "cash-flow":
        return <CashFlowView exploration="analyst" />;
      case "balances":
        return <BalancesView exploration="analyst" />;
      case "debt":
        return <DebtView exploration="analyst" />;
      case "related":
        return <RelatedView exploration="analyst" />;
      case "renewal":
        return <RenewalView exploration="analyst" />;
      default:
        return <SummaryView exploration="analyst" onTabChange={setActiveTab} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;
