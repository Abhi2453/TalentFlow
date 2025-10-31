import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import JobsHeader from "../components/jobs/JobsHeader";
import JobsFilter from "../components/jobs/JobsFilter";
import JobsList from "../components/jobs/JobsList";
import JobForm from "../components/jobs/JobForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pageSize = 10;

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Get status from ?status=active in URL on initial load
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    if (urlStatus && urlStatus !== statusFilter) {
      setStatusFilter(urlStatus);
    }
    // eslint-disable-next-line
  }, []); // Runs only on initial load

  const refreshJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        pageSize,
        search: searchTerm,
        status: statusFilter,
      }).toString();
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotalJobs(typeof data.total === "number" ? data.total : 0);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
      setTotalJobs(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshJobs();
    // eslint-disable-next-line
  }, [currentPage, searchTerm, statusFilter]);

  const onJobClick = (jobId) => {
    navigate(`/jobs/${jobId}/profile`);
  };

  const onArchive = async (job) => {
    try {
      await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: job.status === "active" ? "archived" : "active",
        })
      });

      toast.success(`Job ${job.status === "active" ? "Archived" : "Unarchived"} successfully!`, { 
        position: "bottom-right", 
        autoClose: 2000 
      });
      await refreshJobs();
    } catch (error) {
      toast.error("Failed to archive job.", { 
        position: "top-center", 
        autoClose: 3000 
      });
      console.error("Failed to archive job:", error);
    }
  };

  const onSaveJob = async (jobData) => {
    try {
      if (editingJob) {
        await fetch(`/api/jobs/${editingJob.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
        toast.success("Job updated successfully!", { 
          position: "bottom-right", 
          autoClose: 2000 
        });
      } else {
        await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
        toast.success("Job created successfully!", { 
          position: "bottom-right", 
          autoClose: 2000 
        });
      }
      setShowForm(false);
      setEditingJob(null);
      await refreshJobs();
    } catch (error) {
      toast.error("Failed to save job.", { 
        position: "top-center", 
        autoClose: 3000 
      });
      console.error("Failed to save job:", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalJobs / pageSize));

  return (
    <div className="m-1 border border-gray-200 shadow-sm bg-white rounded-lg p-6">
      <ToastContainer />
      <JobsHeader />
      <JobsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onCreate={() => {
          setEditingJob(null);
          setShowForm(true);
        }}
      />
      {showForm && (
        <JobForm
          job={editingJob}
          onSave={onSaveJob}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <JobsList
          jobs={jobs}
          onJobClick={onJobClick}
          onEdit={(job) => {
            setEditingJob(job);
            setShowForm(true);
          }}
          onArchive={onArchive}
          refreshJobs={refreshJobs}
        />
      )}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
