import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const JOBS_COLORS = {
  "Active Jobs": "#22c55e",   // Green
  "Archived Jobs": "#6b7280", // Gray
};

const chartStyle = `
  .recharts-sector:focus,
  .recharts-pie:focus,
  .recharts-layer rect:focus {
    outline: none !important;
  }
`;

const JobsByStatus = ({ activeJobs, totalJobs }) => {
  const archivedJobs = totalJobs - activeJobs.length;
  const data = [
    { name: "Active Jobs", value: activeJobs.length, fill: JOBS_COLORS["Active Jobs"] },
    { name: "Archived Jobs", value: archivedJobs, fill: JOBS_COLORS["Archived Jobs"] },
  ];

  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-center items-center h-96 w-full">
      <h3 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
        Jobs by Status
      </h3>
      <div className="flex  ml-20 items-center justify-between w-full flex-1">
        {/* Donut Chart */}
        <div className="relative w-52 h-52 border-non" >
          <ResponsiveContainer width="100%" height="100%">
             <style>{chartStyle}</style>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                cornerRadius={6}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                  backgroundColor: "white",
                  // border: "1px solid #e5e7eb",
                  // borderRadius: "8px",
                  fontWeight: "bold",
                  color: "#111827",
                  
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Total */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-900">
              {total}
            </span>
          </div>
        </div>
        {/* Legend */}
        <div className="mr-20">
          <div className="mb-3 font-semibold text-gray-700">Job Status</div>
          <ul className="space-y-2">
            {data.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-gray-800">{item.name}</span>
                </span>
                <span className="text-sm font-bold tabular-nums text-gray-900">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobsByStatus;
