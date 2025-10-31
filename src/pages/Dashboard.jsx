import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  BriefcaseFill,
  People,
  PeopleFill,
  FileEarmarkText,
  FileEarmarkTextFill,
} from "react-bootstrap-icons";
import JobsByStatus from "./JobByStatus";
import CandidatesByStatus from "./CandidatesByStatus.jsx";
import Header from "../components/common/header.jsx";
import DashboardMobile from "./DashboardMobile";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/jobs?pageSize=1000")
      .then((r) => r.json())
      .then((data) => setJobs(data.jobs || []));
    fetch("/api/candidates?pageSize=1000")
      .then((r) => r.json())
      .then((data) => setCandidates(data.candidates || []));
    fetch("/api/assessments")
      .then((r) => r.json())
      .then((data) => setAssessments(data.assessments || []));
  }, []);

  const activeJobs = jobs.filter((job) => job.status === "active");
  const totalJobs = jobs.length;
  const totalCandidates = candidates.length;
  const totalAssessments = assessments.length;

  const stats = [
    {
      title: "Active Jobs",
      value: activeJobs.length,
      icon: <BriefcaseFill size={35} color="#42c05dff" />,
      iconHover: <Briefcase size={37} color="green" />,
      color: "green-100",
      textColor: "text-blue-600",
      onClick: () => navigate("/jobs?status=active"),
    },
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: <BriefcaseFill size={35} color="#ff8000ff" />,
      iconHover: <Briefcase size={37} color="#c26100ff" />,
      color: "orange-100",
      textColor: "text-green-600",
      onClick: () => navigate("/jobs"),
    },
    {
      title: "Total Candidates",
      value: totalCandidates,
      icon: <PeopleFill size={32} color="#645cfcff" />,
      iconHover: <People size={35} color="#4338ca" />,
      color: "indigo-100",
      textColor: "text-purple-600",
      onClick: () => navigate("/candidates"),
    },
    {
      title: "Total Assessments",
      value: totalAssessments,
      icon: <FileEarmarkTextFill size={32} color="red" />,
      iconHover: <FileEarmarkText size={32} color="red" />,
      color: "red-100",
      textColor: "text-orange-600",
      onClick: () => navigate("/assignments"),
    },
  ];

  const recentCandidates = candidates.slice(0, 5);

  return (
    <>
      {/* Desktop Dashboard (unchanged from your original, including iconHover) */}
      <div className="hidden md:block rounded-lg border border-gray-200 bg-white shadow-sm p-6 transition-colors duration-300">
        <div className="mb-8 flex flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="mt-2 text-gray-600">
              Welcome back! Here's an overview of your hiring status.
            </p>
          </div>
          <Header />
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={stat.onClick}
              className="relative group w-full text-left rounded-lg shadow p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus:outline-none overflow-hidden"
            >
              <span
                className={`absolute left-0 top-0 h-full w-24 bg-${stat.color} rounded-r-full transform -translate-x-24 group-hover:translate-x-0 transition-transform duration-300 z-10 pointer-events-none`}
              />
              <div className="relative flex items-center justify-between z-20">
                <div className="w-12 h-12 rounded-full flex-shrink-0 relative">
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                    {stat.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    {stat.iconHover}
                  </div>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        {/* Analytics Row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-6 mb-8">
          <div className="w-full lg:w-1/2">
            <JobsByStatus activeJobs={activeJobs} totalJobs={totalJobs} />
          </div>
          <div className="w-full lg:w-1/2">
            <CandidatesByStatus candidates={candidates} />
          </div>
        </div>
        {/* Recent Candidates */}
        <div className="mt-6">
          <div className="rounded-2xl bg-white shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
              Recent Candidates
            </h3>
            <div className="flex flex-col gap-4">
              {recentCandidates.map((candidate) => {
                const job = jobs.find((j) => j.id === candidate.jobId);
                const stage = candidate.stage?.toLowerCase() || "unknown";
                const badgeClass =
                  stage === "hired"
                    ? "bg-green-100 text-green-700"
                    : stage === "rejected"
                    ? "bg-red-100 text-red-700"
                    : stage === "offer"
                    ? "bg-yellow-100 text-yellow-700"
                    : stage === "tech"
                    ? "bg-indigo-100 text-indigo-700"
                    : stage === "screen"
                    ? "bg-purple-100 text-purple-700"
                    : stage === "applied"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700";

                return (
                  <button
                    key={candidate.id}
                    className="w-full flex items-center justify-between bg-white-50 hover:bg-[#def4f3] border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                    type="button"
                    style={{ textAlign: "left" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${badgeClass} flex items-center justify-center font-semibold text-gray-700`}>
                        {candidate.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {job?.title || "Unknown Job"}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${badgeClass}`}>
                      {candidate.stage || "N/A"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Dashboard */}
      <DashboardMobile
        stats={stats}
        recentCandidates={recentCandidates}
        jobs={jobs}
        navigate={navigate}
      />
    </>
  );
};

export default Dashboard;
