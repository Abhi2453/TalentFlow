import React, { useState } from 'react';
import { Edit3, Plus, Trash2, AlertCircle, Info, Save, X } from 'lucide-react';
import { updateEligibilityCriteria } from '../../data/db';

const EligibilityCriteria = ({ jobId, criteria, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [criteriaList, setCriteriaList] = useState(criteria || []);
  const [newCriterion, setNewCriterion] = useState({
    criterion: '',
    requirement: '',
    mandatory: true,
  });
  const [saving, setSaving] = useState(false);

  const handleAddCriterion = () => {
    if (newCriterion.criterion.trim() && newCriterion.requirement.trim()) {
      setCriteriaList([
        ...criteriaList,
        { id: `ec${Date.now()}`, ...newCriterion },
      ]);
      setNewCriterion({ criterion: '', requirement: '', mandatory: true });
    }
  };

  const handleRemoveCriterion = (id) => {
    setCriteriaList(criteriaList.filter((c) => c.id !== id));
  };

  const handleUpdateCriterion = (id, field, value) => {
    setCriteriaList(
      criteriaList.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateEligibilityCriteria(jobId, criteriaList);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error saving criteria:', error);
      alert('Failed to save eligibility criteria');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            Eligibility Criteria
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Define requirements candidates must meet
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
          >
            <Edit3 className="w-4 h-4" /> Edit Criteria
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {/* Add New Criterion Form */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3 border border-blue-100">
            <h3 className="font-medium text-gray-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" /> Add New Criterion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Criterion Type
                </label>
                <input
                  type="text"
                  value={newCriterion.criterion}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      criterion: e.target.value,
                    })
                  }
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Education, Experience, Skills"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Requirement
                </label>
                <input
                  type="text"
                  value={newCriterion.requirement}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      requirement: e.target.value,
                    })
                  }
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Bachelor's degree in CS"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mandatory-new"
                checked={newCriterion.mandatory}
                onChange={(e) =>
                  setNewCriterion({
                    ...newCriterion,
                    mandatory: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-blue-600"
              />
              <label
                htmlFor="mandatory-new"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Mandatory requirement
              </label>
            </div>
            <button
              onClick={handleAddCriterion}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" /> Add Criterion
            </button>
          </div>

          {/* Existing Criteria List */}
          <div className="space-y-3">
            {criteriaList.map((criterion) => (
              <div
                key={criterion.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Criterion Type
                    </label>
                    <input
                      type="text"
                      value={criterion.criterion}
                      onChange={(e) =>
                        handleUpdateCriterion(
                          criterion.id,
                          'criterion',
                          e.target.value
                        )
                      }
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Requirement
                    </label>
                    <input
                      type="text"
                      value={criterion.requirement}
                      onChange={(e) =>
                        handleUpdateCriterion(
                          criterion.id,
                          'requirement',
                          e.target.value
                        )
                      }
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`mandatory-${criterion.id}`}
                      checked={criterion.mandatory}
                      onChange={(e) =>
                        handleUpdateCriterion(
                          criterion.id,
                          'mandatory',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label
                      htmlFor={`mandatory-${criterion.id}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Mandatory requirement
                    </label>
                  </div>
                  <button
                    onClick={() => handleRemoveCriterion(criterion.id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-white border border-red-200 hover:bg-red-600 px-3 py-1.5 rounded-md transition"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}

            {criteriaList.length === 0 && (
              <p className="text-center text-gray-500 italic py-4">
                No criteria added yet. Use the form above to add criteria.
              </p>
            )}
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Criteria'}
            </button>
            <button
              onClick={() => {
                setCriteriaList(criteria || []);
                setIsEditing(false);
              }}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              disabled={saving}
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {criteriaList.map((criterion) => (
            <div
              key={criterion.id}
              className="p-4 border border-gray-200 rounded-lg flex items-start gap-4 bg-gray-50"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  criterion.mandatory
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {criterion.mandatory ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 flex items-center gap-2">
                  {criterion.criterion}
                  {criterion.mandatory && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                      Mandatory
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {criterion.requirement}
                </p>
              </div>
            </div>
          ))}

          {criteriaList.length === 0 && (
            <p className="text-center text-gray-500 italic py-8">
              No eligibility criteria defined yet. Click Edit to add criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EligibilityCriteria;
