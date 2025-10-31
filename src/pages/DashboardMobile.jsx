import React from "react";

const DashboardMobile = ({ stats, recentCandidates, jobs, navigate }) => (
  <div className="block md:hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4 transition-colors duration-300">
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mt-1 text-gray-600">
        Welcome back! Here’s your hiring overview.
      </p>
    </div>
    {/* Stats: vertical stack */}
    <div className="flex flex-col gap-3 mb-6">
      {stats.map((stat, idx) => (
        <button
          key={idx}
          onClick={stat.onClick}
          className="flex items-center justify-between gap-4 rounded-lg shadow p-4 bg-gray-50 hover:bg-blue-50 focus:outline-none"
        >
          <div className="flex items-center gap-3">
            {stat.icon}
            <div>
              <p className="text-xs">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
    {/* Recent Candidates */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Candidates</h3>
      <div className="flex flex-col gap-3">
        {recentCandidates.map((candidate) => {
          const job = jobs.find((j) => j.id === candidate.jobId);
          return (
            <button
              key={candidate.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 hover:bg-blue-50"
              onClick={() => navigate(`/candidates/${candidate.id}`)}
              type="button"
              style={{ textAlign: "left" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center font-semibold text-gray-700">
                  {candidate.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {job?.title || "Unknown Job"}
                  </p>
                </div>
              </div>
              <span className="ml-4 text-xs font-medium rounded-full px-2 py-1 bg-gray-100 text-gray-700 capitalize">
                {candidate.stage || "N/A"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default DashboardMobile;
