import React, { useState } from "react";
import { Plus, ArrowUp, ArrowDown, Trash2, Edit3, Save, X, Workflow as WorkflowIcon, CheckCircle2 } from "lucide-react";
import { updateJob } from "../../data/db";

const HiringWorkflow = ({ jobId, stages, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stagesList, setStagesList] = useState(
    (stages || []).filter((s) => s.toLowerCase() !== "hired")
  );
  const [newStage, setNewStage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddStage = () => {
    if (newStage.trim()) {
      setStagesList([...stagesList, newStage.trim().toLowerCase()]);
      setNewStage("");
    }
  };

  const handleRemoveStage = (index) => {
    setStagesList(stagesList.filter((_, i) => i !== index));
  };

  const handleMoveStage = (index, direction) => {
    const newStages = [...stagesList];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newStages.length) {
      [newStages[index], newStages[newIndex]] = [
        newStages[newIndex],
        newStages[index],
      ];
      setStagesList(newStages);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateJob(jobId, { stages: stagesList });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error saving stages:", error);
      alert("Failed to save hiring workflow");
    } finally {
      setSaving(false);
    }
  };

  const getStageColor = (index) => {
    const colors = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-green-100 text-green-700 border-green-200",
      "bg-orange-100 text-orange-700 border-orange-200",
      "bg-pink-100 text-pink-700 border-pink-200",
      "bg-indigo-100 text-indigo-700 border-indigo-200",
    ];
    return colors[index % colors.length];
  };

  const getStageDotColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <WorkflowIcon className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Hiring Workflow</h2>
              <p className="text-sm text-gray-600">Define the stages candidates go through</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors border border-purple-200 font-medium"
            >
              <Edit3 size={16} />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-6">
            {/* Add Stage Form */}
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Add New Stage
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddStage()}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="e.g., Technical Interview, HR Round"
                />
                <button
                  onClick={handleAddStage}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Plus size={18} />
                  Add Stage
                </button>
              </div>
            </div>

            {/* Stages List */}
            {stagesList.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Current Stages ({stagesList.length})
                </h3>
                {stagesList.map((stage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg p-4 transition-all hover:border-purple-300 hover:shadow-sm group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800 capitalize">
                        {stage}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleMoveStage(index, "up")}
                        disabled={index === 0}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <button
                        onClick={() => handleMoveStage(index, "down")}
                        disabled={index === stagesList.length - 1}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown size={18} />
                      </button>
                      <button
                        onClick={() => handleRemoveStage(index)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove Stage"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <WorkflowIcon className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No stages added yet. Add your first stage above.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving || stagesList.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Workflow
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setStagesList(
                    (stages || []).filter((s) => s.toLowerCase() !== "hired")
                  );
                  setIsEditing(false);
                }}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                disabled={saving}
              >
                <X size={18} className="inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            {stagesList.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <WorkflowIcon className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500 mb-2">No stages defined yet</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Click Edit to add hiring stages
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Timeline View */}
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-purple-200"></div>

                  {/* Stages */}
                  <div className="space-y-6">
                    {stagesList.map((stage, index) => (
                      <div key={index} className="relative flex items-start gap-4 group">
                        {/* Timeline Dot */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-12 h-12 ${getStageDotColor(index)} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform`}>
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                        </div>

                        {/* Stage Card */}
                        <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group-hover:-translate-y-0.5">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg capitalize">
                                {stage}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Stage {index + 1} of {stagesList.length}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(index)}`}>
                              Step {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Final Stage - Hired */}
                    <div className="relative flex items-start gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                          <CheckCircle2 className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-green-900 text-lg">
                              Hired
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                              Final stage - Candidate accepted
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-xs font-medium">
                            Final
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm text-gray-600 mb-1">Total Stages</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stagesList.length + 1}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Including final hire stage</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Interview Stages</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stagesList.length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Before final decision</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HiringWorkflow;
