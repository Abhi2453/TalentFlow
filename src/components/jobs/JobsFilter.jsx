import { Plus } from "react-bootstrap-icons";

const JobsFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onCreate,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 px-0 py-2 mb-4">
      {/* 🔍 Search Bar */}
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
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 placeholder-gray-400 transition"
        />
      </div>

      {/* 📂 Status Dropdown */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none px-4 py-2 rounded-full border border-[#def4f3] bg-white/70 text-gray-700 shadow-sm focus:outline-none focus:ring-3 focus:ring-[#def4f3] focus:border-[#def4f3] transition cursor-pointer pr-10"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          ▼
        </span>
      </div>

      {/* ➕ Create Job Button */}
      <button
        onClick={onCreate}
        type="button"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1ac2b6] to-[#169d9e] text-white font-medium shadow-md hover:shadow-lg hover:text-gray-900 hover:scale-105 transition-transform duration-200"
      >
        <Plus size={20} />
        <span>Create Job</span>
      </button>
    </div>
  );
};

export default JobsFilter;
