import React, { useState, useEffect } from "react";
import BuilderEditor from "../components/assignment/BuilderEditor";
import AssessmentPreview from "../components/assignment/AssessmentPreview";
import { ToastContainer, toast } from "react-toastify";
import { Save } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function AssessmentsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [assessment, setAssessment] = useState(null);
  const [mode, setMode] = useState("builder"); // builder | preview
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setSelectedJobId(data.jobs?.[0]?.id || "");
      });
  }, []);

  useEffect(() => {
    if (!selectedJobId) return;
    setLoading(true);
    fetch(`/api/assessments/${selectedJobId}`)
      .then((r) => r.json())
      .then((data) => {
        setAssessment(data || { jobId: selectedJobId, sections: [] });
        setLoading(false);
      });
  }, [selectedJobId]);

  function saveAssessment(data) {
    return fetch(`/api/assessments/${selectedJobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Save failed");
        setAssessment(data);
        toast.success("Assessment Saved Successfully!", { position: "bottom-right", autoClose: 2000 });
      })
      .catch(() => {
        toast.error("Failed to save assessment.", { position: "top-center", autoClose: 3000 });
      });
  }

  if (!jobs.length) return <div>Loading jobs...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
            Assignments
          </h1>
          {/* Responsive select + buttons section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
              <label className="font-semibold text-gray-700 text-lg">
                Select Job:
              </label>
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full sm:w-auto"
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="bg-gradient-to-r bg-[#1ac2b6] text-white rounded-lg px-4 py-2 font-medium shadow-md hover:bg-[#169d9e] hover:shadow-lg transition-all w-full sm:w-auto"
                onClick={() =>
                  setMode(mode === "builder" ? "preview" : "builder")
                }
              >
                {mode === "builder" ? "Preview" : "Edit Builder"}
              </button>
              {mode === "builder" && (
                <button
                  onClick={() => saveAssessment(assessment)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 font-medium shadow-md flex items-center gap-2 transition-all w-full sm:w-auto"
                  type="button"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
              )}
            </div>
          </div>
          {mode === "preview" ? (
            <AssessmentPreview assessment={assessment} />
          ) : (
            <BuilderEditor
              assessment={assessment}
              setAssessment={setAssessment}
              onSave={saveAssessment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
