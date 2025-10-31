import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobProfileNavBar from '../components/job-profile/JobProfileNavBar';
import JobDescription from '../components/job-profile/JobDescription';
import HiringWorkflow from '../components/job-profile/HiringWorkflow';
import EligibilityCriteria from '../components/job-profile/EligibilityCriteria';
import AdditionalQuestions from '../components/job-profile/AdditionalQuestions';
import { getCompleteJobInfo } from '../data/db';

const JobProfile = () => {
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobData();
  }, [jobId]);

  const loadJobData = async () => {
    try {
      setLoading(true);
      const data = await getCompleteJobInfo(jobId);
      setJobData(data);
    } catch (error) {
      console.error('Error loading job data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdate = () => {
    loadJobData(); // Refresh data after updates
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Loading job profile...</p>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-500">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {/* Job Title */}
              <h1 className="text-2xl font-bold text-gray-800">{jobData.title}</h1>

              {/* Status + Tags */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize shadow-sm ${
                    jobData.status === 'active'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}
                >
                  {jobData.status}
                </span>

                {/* Tags / Skills */}
                <div className="flex gap-2 flex-wrap">
                  {jobData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="w-25 h-9 flex items-center justify-center rounded-xl text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 shadow-sm transition"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <JobProfileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'description' && (
          <JobDescription
            jobId={jobId}
            description={jobData.details?.description}
            ctc={jobData.details?.ctc}
            onUpdate={handleDataUpdate}
          />
        )}

        {activeTab === 'workflow' && (
          <HiringWorkflow
            jobId={jobId}
            stages={jobData.stages}
            onUpdate={handleDataUpdate}
          />
        )}

        {activeTab === 'eligibility' && (
          <EligibilityCriteria
            jobId={jobId}
            criteria={jobData.details?.eligibilityCriteria || []}
            onUpdate={handleDataUpdate}
          />
        )}

        {activeTab === 'questions' && (
          <AdditionalQuestions
            jobId={jobId}
            questions={jobData.details?.commonQuestions || []}
            onUpdate={handleDataUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default JobProfile;
