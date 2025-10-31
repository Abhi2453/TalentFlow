import CandidateKanban from "../components/candidates/CandidateKanban";
import { useNavigate } from "react-router-dom";
export default function Kanban() {
  const navigate = useNavigate();
  return (
    <div>
      <CandidateKanban onSelect={c=>navigate(`/candidates/${c.id}`)}/>
    </div>
  );
}

   
