import { useState, useEffect } from "react";
import { jobs } from "../../data/jobsService"; // ✅ update path if needed
import { Search, Briefcase } from "lucide-react";

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
const PAGE_SIZE = 40;

export default function CandidateKanban() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [jobId, setJobId] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Load filtered candidates
  useEffect(() => {
    const params = new URLSearchParams({
      search,
      jobId,
      page,
      pageSize: PAGE_SIZE,
    }).toString();

    fetch(`/api/candidates?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setCandidates(data.candidates || []);
        setTotal(data.total || 0);
      })
      .catch(() => setCandidates([]));
  }, [search, jobId, page]);

  // Handle drop event to update candidate stage
  const onDropCandidate = async (candId, newStage) => {
    await fetch(`/api/candidates/${candId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: newStage }),
    });
    setCandidates((cs) =>
      cs.map((c) => (c.id === candId ? { ...c, stage: newStage } : c))
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg border border-gray-200 px-2 py-5 sm:px-3 sm:py-8">
      <div className="flex flex-wrap items-center gap-3 mb-6 sticky top-0 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-sm z-10">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 placeholder-gray-400 transition"
          />
        </div>

        {/* Job Filter Dropdown */}
        <div className="relative">
          <select
            className="appearance-none px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition cursor-pointer pr-10"
            value={jobId}
            onChange={(e) => {
              setJobId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
      </div>

      {/* 🧱 Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage}
            candidates={candidates.filter((c) => c.stage === stage)}
            onDrop={(candId) => onDropCandidate(candId, stage)}
          />
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-6 px-4 py-3 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
        >
          ⬅ Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * PAGE_SIZE >= total}
          className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

/* 🧩 Stage Column Component */
function StageColumn({ stage, candidates, onDrop }) {
  const [dragOver, setDragOver] = useState(false);

  const stageColors = {
    applied: "from-blue-50 to-blue-100 border-blue-200",
    screen: "from-purple-50 to-purple-100 border-purple-200",
    tech: "from-indigo-50 to-indigo-100 border-indigo-200",
    offer: "from-yellow-50 to-yellow-100 border-yellow-200",
    hired: "from-green-50 to-green-100 border-green-200",
    rejected: "from-red-50 to-red-100 border-red-200",
   
  };

  return (
    <div
      className={`flex-1 min-w-[220px] p-3 rounded-2xl border transition-all duration-300 
        ${
          dragOver
            ? "border-blue-400 bg-blue-50/60 shadow-inner"
            : `bg-gradient-to-br ${stageColors[stage] || "from-gray-50 to-gray-100"}`
        }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const candId = e.dataTransfer.getData("text/cand-id");
        if (candId) onDrop && onDrop(candId);
      }}
    >
      <div className="text-center font-semibold text-gray-800 mb-3 capitalize">
        {stage}
      </div>

      {/* Candidate Cards */}
      {candidates.length > 0 ? (
        candidates.map((c) => (
          <div
            key={c.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/cand-id", c.id)}
            title={`Drag to move ${c.name}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 mb-3 p-3 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="font-medium text-gray-900">{c.name}</div>
            <div className="text-xs text-gray-500">{c.email}</div>
            <div className="text-xs text-gray-400 italic">{c.jobTitle}</div>
          </div>
        ))
      ) : (
        <div className="text-xs text-gray-400 text-center italic mt-4">
          No candidates
        </div>
      )}
    </div>
  );
}
