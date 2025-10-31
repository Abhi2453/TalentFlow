import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Colors for each candidate stage
const STAGE_COLORS = {
  tech: "#9e28edff",      // purple
  screen: "#0d8bb2ff",    // green
  rejected: "#ef4444",    // red
  offer: "#ffb700ff",       // orange
  hired: "#10d638ff",     // teal
  applied: "#0004ebff",   // indigo
};

const chartStyle = `
  .recharts-sector:focus,
  .recharts-pie:focus,
  .recharts-layer rect:focus {
    outline: none !important;
  }
`;

const DEFAULT_COLOR = "#E5E7EB"; // Tailwind gray

function toData({ candidates, counts, data }) {
  if (data && data.length) {
    return data.map(d => ({
      ...d,
      fill: d.fill ?? STAGE_COLORS[d.name] ?? DEFAULT_COLOR
    }));
  }

  let stageCounts = {};
  if (counts) {
    stageCounts = counts;
  } else if (candidates) {
    stageCounts = candidates.reduce((acc, c) => {
      const stage = c.stage ?? "Unknown";
      acc[stage] = (acc[stage] ?? 0) + 1;
      return acc;
    }, {});
  }

  return Object.entries(stageCounts)
    .map(([stage, count]) => ({
      name: stage,
      value: count,
      fill: STAGE_COLORS[stage] ?? DEFAULT_COLOR
    }))
    .filter(d => d.value > 0); // only show non-zero slices
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  const name = entry?.name ?? entry?.payload?.name;
  const value = entry?.value ?? entry?.payload?.value;
  const color = entry?.payload?.fill ?? "#111827";
  return (
    <div
      className="px-4 py-2 text-base font-semibold shadow-lg rounded-lg"
      style={{
        background: color,
        color: "#fff",
        letterSpacing: "0.01em",
        minWidth: "100px"
      }}
    >
      {name}: <span style={{ fontWeight: 900 }}>{value}</span>
    </div>
  );
}

const CandidatesByStatus = ({ candidates, counts, data, title }) => {
  const pieData = toData({ candidates, counts, data });
  const total = pieData.reduce((a, b) => a + (b.value || 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-center items-center h-96 w-full">
      <h3 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">{title || "Approval Status"}</h3>
      <div className="flex items-center justify-between w-full flex-1">
        {/* Pie chart area */}
        <div className="relative ml-15 w-52 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <style>{chartStyle}</style>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                cornerRadius={8}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-semibold">{total}</span>
          </div>
        </div>
        <div className="mr-10">
          <div className="mb-3 font-semibold text-gray-700">{title || "Candidate Status"}</div>
          <ul className="space-y-2">
            {pieData.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-gray-600">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                </div>
                <span className="text-sm font-semibold tabular-nums">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidatesByStatus;
