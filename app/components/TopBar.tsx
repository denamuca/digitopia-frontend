"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import Image from "next/image";
import DigitopiaLogo from "../digitopia-logo.svg";
import { useState } from "react";
import RightSidePanel from "./RightSidePanel";
import UserProfile from "./UserProfile";
import { fetchOrganizationDetails } from "../../store/organizationSlice";

interface TopBarProps {
  onRecommendationClick: (recommendation: React.ReactNode) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onRecommendationClick }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  const handleProfileClick = () => {
    console.log("userInfo:", userInfo); // Add this to check the structure
    if (userInfo?.organizationId) {
      setIsProfilePanelOpen(true);
      dispatch(fetchOrganizationDetails(userInfo.organizationId))
        .unwrap()
        .then(() => console.log("Organization details fetched successfully"))
        .catch((error) =>
          console.error("Error fetching organization details:", error)
        );
    } else {
      console.error("No organization ID available");
    }
  };

  const handleCloseProfilePanel = () => {
    setIsProfilePanelOpen(false);
  };

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image priority src={DigitopiaLogo} alt="Digitopia" />
        </div>
        <div className="flex-grow flex items-center justify-center space-x-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link href="/chart" className="text-blue-500 hover:underline">
            Chart
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{userInfo.name}</span>
          <button
            onClick={handleProfileClick}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
          <button
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 text-gray-700"
            onClick={() =>
              onRecommendationClick(<div>Sample Recommendation Details</div>)
            }
          >
            Sample Recommendation
          </button>
        </div>
      </nav>

      <RightSidePanel
        isOpen={isProfilePanelOpen}
        onClose={handleCloseProfilePanel}
        content={<UserProfile />}
      />
    </>
  );
};

export default TopBar;
