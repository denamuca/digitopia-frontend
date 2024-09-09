"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import store from "../../store";
import TopBar from "./TopBar";
import RightSidePanel from "./RightSidePanel";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [panelContent, setPanelContent] = useState<React.ReactNode>(null);

  const handleOpenProfilePanel = () => {
    setPanelContent(<div>User Profile Details</div>);
    setPanelOpen(true);
  };

  const handleOpenRecommendationPanel = (recommendation: React.ReactNode) => {
    setPanelContent(recommendation);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    setPanelContent(null);
  };

  return (
    <Provider store={store}>
      <TopBar
        onProfileClick={handleOpenProfilePanel}
        onRecommendationClick={handleOpenRecommendationPanel}
      />
      {children}
      <RightSidePanel
        isOpen={isPanelOpen}
        content={panelContent}
        onClose={handleClosePanel}
      />
    </Provider>
  );
}
