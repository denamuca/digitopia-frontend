import React from "react";

interface RightSidePanelProps {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

const RightSidePanel: React.FC<RightSidePanelProps> = ({
  isOpen,
  content,
  onClose,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} className="p-2 text-gray-700 hover:bg-gray-200">
        Close
      </button>
      <div className="p-4">{content}</div>
    </div>
  );
};

export default RightSidePanel;
