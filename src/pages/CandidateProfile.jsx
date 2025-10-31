import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CandidateTimeline from "../components/candidates/CandidateTimeline";
import { jobs } from "../data/jobsService"; // adjust path if needed

export default function CandidateProfilePage() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`/api/candidates/${id}`)
      .then(r => r.json())
      .then(cand => {
        setCandidate(cand);
        // Find the job by jobId
        const foundJob = jobs.find(j => j.id === cand.jobId);
        setJob(foundJob);
      });
  }, [id]);

  if (!candidate) return <div>Loading candidate...</div>;
  if (!job) return <div>Loading job info...</div>;

  return (
    <div className="rounded-lg border h-full border-gray-200 bg-white shadow-sm p-3 transition-colors duration-300">
      <CandidateTimeline candidate={candidate} stages={job.stages} />
    </div>
  );
}
