import { useMemo } from 'react';

const useJobManagement = (
  jobs = [],
  saveJobs,
  searchTerm = '',
  statusFilter = 'all'
) => {
  const filteredJobs = useMemo(() =>
    (jobs || [])
      .filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || job.status === statusFilter)
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [jobs, searchTerm, statusFilter]
  );

  const handleCreateOrEdit = (jobData, editingJob) => {
    if (editingJob) {
      const updatedJobs = jobs.map(job =>
        job.id === editingJob.id ? { ...job, ...jobData } : job
      );
      saveJobs(updatedJobs);
    } else {
      const newJob = {
        id: `job-${Date.now()}`,
        order: jobs.length,
        stages: jobData.stages || [
          'Applied',
          'Screening',
          'Technical Interview',
          'Final Interview',
          'Offer'
        ],
        ...jobData
      };
      saveJobs([...jobs, newJob]);
    }
  };

  const handleArchive = (jobId) => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId
        ? { ...job, status: job.status === 'active' ? 'archived' : 'active' }
        : job
    );
    saveJobs(updatedJobs);
  };

  const handleReorder = (items) => {
    const reorderedJobs = items.map((id, index) => {
      const job = jobs.find(j => j.id === id);
      return job ? { ...job, order: index } : null;
    }).filter(Boolean);
    saveJobs(reorderedJobs);
  };

  return {
    filteredJobs,
    handleCreateOrEdit,
    handleArchive,
    handleReorder
  };
};

export default useJobManagement;
