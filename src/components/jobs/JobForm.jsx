import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from 'lucide-react';

const DEFAULT_STAGES = ['Applied', 'Screening', 'Technical Interview', 'Final Interview', 'Offer'];

const JobForm = ({ job, onSave, onCancel, order = 0 }) => {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    status: job?.status || 'active',
    tags: job?.tags ? job.tags.join(', ') : '',
    stages: job?.stages || [...DEFAULT_STAGES]
  });

  const [stageInput, setStageInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      return;
    }
    if (formData.stages.length < 3) {
      toast.error("Minimum 3 stages required", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      return;
    }
    // Send order if adding (optional, you can pass this in parent using jobs.length for new)
    onSave({
      id: job?.id, // Mirrored for PATCH/PUT, undefined triggers new id in back/db
      title: formData.title,
      status: formData.status,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      stages: formData.stages,
      order: job?.order ?? order
    });
  };

  const addStage = () => {
    if (stageInput.trim() && formData.stages.length < 10) {
      setFormData({
        ...formData,
        stages: [...formData.stages, stageInput.trim()]
      });
      setStageInput('');
    }
  };

  const removeStage = (index) => {
    if (formData.stages.length > 3) {
      setFormData({
        ...formData,
        stages: formData.stages.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-1 border-[#1ac2b6]">
      <ToastContainer />
      <h3 className="text-xl font-semibold mb-4">{job ? 'Edit Job' : 'Create New Job'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2b6] focus:outline-none"
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2b6]"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ac2b6] focus:outline-none"
            placeholder="React, TypeScript, Remote"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hiring Stages (min 3, max 10) *
          </label>
          <div className="space-y-2 mb-2">
            {formData.stages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-8">{index + 1}.</span>
                <span className="px-3 py-1 bg-gray-100 rounded text-sm flex-1">{stage}</span>
                {formData.stages.length > 3 && (
                  <button
                    type="button"
                    onClick={() => removeStage(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Remove stage"
                  >
                    <X className="text-red-500" size={25} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {formData.stages.length < 10 && (
            <div className="flex mt-2 space-x-2">
              <input
                type="text"
                value={stageInput}
                onChange={(e) => setStageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStage())}
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1ac2b6] focus:outline-none"
                placeholder="Add new stage"
              />
              <button
                type="button"
                onClick={addStage}
                className="px-3 py-1 bg-[#1ac2b6] text-white rounded-lg text-sm hover:bg-[#169d9e]"
              >
                Add
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Minimum 3 stages required. Current: {formData.stages.length}
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#1ac2b6] text-white rounded-lg hover:bg-[#169d9e]"
          >
            {job ? 'Update Job' : 'Create Job'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
