import { useEffect, useState } from "react";
import { jobs } from "../../data/jobsService";
import CandidateNote from "./CandidateNotes";

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

const statusIcons = {
  rejected: (
    <span className="inline-block w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-red-500">
      ✖
    </span>
  ),
  done: (
    <span className="inline-block w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-green-600">
      ✔
    </span>
  ),
  current: (
    <span className="inline-block w-4 h-4 bg-green-500 rounded-full border-2 border-green-600"></span>
  ),
  future: (
    <span className="inline-block w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded-full"></span>
  ),
};

export default function CandidateTimeline({ candidate }) {
  const [timeline, setTimeline] = useState([]);
  const [job, setJob] = useState(null);
  const [rejectionStage, setRejectionStage] = useState(null);
  const [isRejected, setIsRejected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const res = await fetch(`/api/candidates/${candidate.id}/timeline`);
        const data = await res.json();

        console.log("📥 API Response:", data);

        const timelineData = Array.isArray(data.timeline)
          ? data.timeline
          : data;

        setTimeline(timelineData);

        const rejectedEvent = timelineData.find(
          (e) => e.stage?.toLowerCase() === "rejected"
        );

        if (rejectedEvent) {
          setIsRejected(true);
          setRejectionStage(rejectedEvent.rejectedFrom || timelineData.at(-2)?.stage);
        }
      } catch (err) {
        console.error("❌ Error fetching timeline:", err);
      } finally {
        setLoading(false);
      }
    }

    const foundJob = jobs.find((j) => j.id === candidate.jobId);
    setJob(foundJob);
    loadTimeline();
  }, [candidate.id, candidate.jobId]);

  if (loading) return <div className="p-4">Loading timeline...</div>;
  if (!job) return <div className="p-4 text-red-500">Job not found</div>;

  // --- Normalize helper ---
  function normalizeStage(stage) {
    return stage
      ?.toLowerCase()
      .trim()
      .replace(/ing$/, "") // turns "screening" -> "screen"
      .replace(/[^a-z]/g, ""); // removes spaces/underscores etc.
  }

  const jobStagesLower = job.stages.map((s) => normalizeStage(s));
  const timelineStages = timeline.map((e) => normalizeStage(e.stage || ""));
  const lastTimelineStage = timelineStages.at(-1) || null;

  // --- DEBUG LOGS: see what's actually matching ---
  console.groupCollapsed(`🧩 CandidateTimeline Debug: ${candidate.name}`);
  console.log("Job ID:", candidate.jobId);
  console.log("Job Title:", job.title);
  console.log("Job Stages:", job.stages);
  console.log("Job Stages (normalized):", jobStagesLower);
  console.log("Candidate Stage:", candidate.stage);
  console.log("Timeline raw:", timeline);
  console.log("Timeline normalized:", timelineStages);
  console.log("Last timeline stage:", lastTimelineStage);
  console.groupEnd();

  let currentStageIdx = -1;
  if (lastTimelineStage && lastTimelineStage !== "rejected") {
    currentStageIdx = jobStagesLower.indexOf(lastTimelineStage);
    if (currentStageIdx === -1) currentStageIdx = 0; // fallback
  } else if (timelineStages.length === 1) {
    currentStageIdx = 0;
  }

  const rejectionStageIdx = rejectionStage
    ? jobStagesLower.indexOf(normalizeStage(rejectionStage))
    : -1;

  function allDone(stage) {
    return typeof stage === "string" && normalizeStage(stage) === "hired";
  }

  function getStageStatus(idx) {
    if (timelineStages.length > 0 && allDone(lastTimelineStage)) {
      return "done";
    }

    if (isRejected && rejectionStageIdx !== -1) {
      if (idx < rejectionStageIdx) return "done";
      if (idx === rejectionStageIdx) return "rejected";
      return "future";
    }

    if (currentStageIdx !== -1) {
      if (idx < currentStageIdx) return "done";
      if (idx === currentStageIdx) return "current";
      return "future";
    }

    return "future";
  }

  // --- REJECTED VIEW ---
  if (isRejected) {
    return (
      <div className="p-4 space-y-3">
        <div className="mb-6">
          <div className="text-xl font-bold">{candidate.name}</div>
          <div className="text-gray-600">{candidate.email}</div>
          <div className="text-sm pt-1 text-gray-400">{candidate.jobTitle}</div>
        </div>

        <div className="mb-4">
          <h3 className="text-red-600 font-bold text-lg">REJECTED</h3>
          {rejectionStage && (
            <div className="text-gray-500 text-sm">
              Rejected from: <b>{capitalize(rejectionStage)}</b>
            </div>
          )}
        </div>

        <CandidateNote
          candidate={candidate}
          rejectionStage={rejectionStage}
        />
      </div>
    );
  }

  // --- NORMAL TIMELINE ---
  return (
    <div className="p-4 space-y-3">
      <div className="mb-6">
        <div className="text-xl font-bold">{candidate.name}</div>
        <div className="text-gray-600">{candidate.email}</div>
        <div className="text-sm pt-1 text-gray-400">{candidate.jobTitle}</div>
      </div>

      <div>
        {job.stages.map((stage, idx) => {
          const status = getStageStatus(idx);
          const nextStatus =
            idx < jobStagesLower.length - 1 ? getStageStatus(idx + 1) : null;

          let lineColor = "bg-gray-300";
          if (
            (status === "done" || status === "current") &&
            (nextStatus === "done" || nextStatus === "current")
          ) {
            lineColor = "bg-green-400";
          }

          const stageTextClass =
            status === "done" || status === "current"
              ? "font-semibold text-green-700"
              : "text-gray-600";

          return (
            <div key={stage} className="flex items-start relative pt-0 pb-6">
              <div className="flex flex-col items-center mr-4">
                <div>{statusIcons[status]}</div>
                {idx < job.stages.length - 1 && (
                  <div className={`w-px h-8 ${lineColor}`}></div>
                )}
              </div>
              <div>
                <div className={`${stageTextClass} text-base`}>
                  {capitalize(stage.replace(/_/g, " "))}
                </div>
                {status === "current" && (
                  <div className="text-xs text-blue-600 font-semibold">
                    Currently here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
