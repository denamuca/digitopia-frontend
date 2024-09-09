// app/chart/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GanttChart from "../components/GanttChart";
import RightSidePanel from "../components/RightSidePanel";

export default function ChartPage() {
  const [impactRuns, setImpactRuns] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8484/impact-runs",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setImpactRuns(response.data);
      });
  }, [accessToken]);

  useEffect(() => {
    if (impactRuns.length > 0) {
      const impactRunId = impactRuns[0].id;
      axios
        .get(
          `http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8283/impact-run/${impactRunId}/recommendations`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          setRecommendations(response.data);
        });
    }
  }, [impactRuns, accessToken]);

  const handleRecommendationClick = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setIsPanelOpen(true);
  };

  return (
    <div className="chart-page">
      <div className="left-panel">
        <h2>Recommendations</h2>
        <ul>
          {recommendations.map((rec: any) => (
            <li key={rec.id} onClick={() => handleRecommendationClick(rec)}>
              {rec.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="gantt-chart-container">
        <GanttChart data={recommendations} />
      </div>
      <RightSidePanel
        isOpen={isPanelOpen}
        content={<div>{(selectedRecommendation as any)?.details}</div>}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
