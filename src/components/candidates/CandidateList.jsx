import { useState, useEffect, useRef } from "react";
import { jobs } from "../../data/jobsService"; // adjust path if needed

const PAGE_SIZE = 50;

const CandidateList = ({ onSelect }) => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [jobId, setJobId] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const containerRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams({
      search,
      stage,
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
      .catch((err) => console.error("Failed to fetch candidates:", err));
  }, [search, stage, jobId, page]);

 const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];


  return (
    <div >
      {/* 🔍 Search + Filters */}
      <div className="flex flex-wrap gap-3 pb-4 px-5 border-b border-gray-200 bg-white/80 backdrop-blur-md rounded-t-2xl sticky top-0 z-10">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[220px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 placeholder-gray-400 transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Stage Dropdown */}
        <div className="relative">
          <select
            className="appearance-none px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition cursor-pointer pr-10"
            value={stage}
            onChange={(e) => {
              setStage(e.target.value);
              setPage(1);
            }}
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All Stages"}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            ▼
          </span>
        </div>

        {/* Job Dropdown */}
        <div className="relative">
          <select
            className="appearance-none px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition cursor-pointer pr-10"
            value={jobId}
            onChange={(e) => {
              setJobId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Roles</option>
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

      {/* 👤 Candidate Grid */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {candidates.length > 0 ? (
          candidates.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect && onSelect(c)}
              className="group cursor-pointer bg-white/90 hover:bg-[#def4f3] border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#1ac2b6] transition-colors">
                    {c.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      c.stage === "hired"
                        ? "bg-green-100 text-green-700"
                        : c.stage === "rejected"
                        ? "bg-red-100 text-red-700"
                        : c.stage === "offer"
                        ? "bg-yellow-100 text-yellow-700"
                        : c.stage === "tech"
                        ? "bg-indigo-100 text-indigo-700"
                        : c.stage === "screen"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"

                    }`}
                  >
                    {c.stage || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{c.email}</p>
              </div>

              {c.jobTitle && (
                <div className="mt-3">
                  <span className="inline-block text-xs font-medium bg-[#def4f3] text-gray-700 px-3 py-1 rounded-md transition">
                    {c.jobTitle}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full p-10 text-center text-gray-400 border border-dashed border-gray-300 rounded-xl bg-white/60">
            No candidates found.
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-white/80 backdrop-blur-md rounded-b-2xl">
        <button
          disabled={page === 1}
          className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
          onClick={() => setPage((p) => p - 1)}
        >
          ⬅ Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </span>
        <button
          disabled={page * PAGE_SIZE >= total}
          className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default CandidateList;
