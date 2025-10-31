import CandidateHeader from "../components/candidates/CandidateHeader";
import CandidateList from "../components/candidates/CandidateList";
import { useNavigate } from "react-router-dom";

export default function Candidates() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg border border-gray-200">
      <CandidateHeader />
      <CandidateList onSelect={cand=>navigate(`/candidates/${cand.id}`)} />
    </div>
  );
}
