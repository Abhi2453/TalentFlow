import React, { useState } from "react";
import { Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { updateJobDescription, updateJobCTC } from "../../data/db";

const JobDescription = ({ jobId, description, ctc, onUpdate }) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingCTC, setIsEditingCTC] = useState(false);
  const [descValue, setDescValue] = useState(description || "");
  const [ctcValue, setCtcValue] = useState(
    ctc || { min: 0, max: 0, currency: "INR", benefits: [] }
  );
  const [newBenefit, setNewBenefit] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSaveDescription = async () => {
    try {
      setSaving(true);
      await updateJobDescription(jobId, descValue);
      setIsEditingDesc(false);
      onUpdate();
    } catch (error) {
      console.error("Error saving description:", error);
      alert("Failed to save description");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCTC = async () => {
    try {
      setSaving(true);
      await updateJobCTC(jobId, ctcValue);
      setIsEditingCTC(false);
      onUpdate();
    } catch (error) {
      console.error("Error saving CTC:", error);
      alert("Failed to save CTC");
    } finally {
      setSaving(false);
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setCtcValue({
        ...ctcValue,
        benefits: [...(ctcValue.benefits || []), newBenefit.trim()],
      });
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    setCtcValue({
      ...ctcValue,
      benefits: ctcValue.benefits.filter((_, i) => i !== index),
    });
  };

  // 🧠 Markdown-like parser: lines starting with '##' => heading, others => paragraph
  const renderDescription = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    return lines.map((line, index) => {
      if (line.trim().startsWith("##")) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-800 mt-3">
            {line.replace(/^##\s*/, "")}
          </h3>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Job Description Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
          {!isEditingDesc && (
            <button
              onClick={() => setIsEditingDesc(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Edit3 size={18} /> Edit
            </button>
          )}
        </div>

        {isEditingDesc ? (
          <div className="space-y-4">
            <textarea
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter job description... Use '## ' before a line for heading"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveDescription}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={18} /> {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setDescValue(description || "");
                  setIsEditingDesc(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                disabled={saving}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-gray-700">
            {descValue ? (
              renderDescription(descValue)
            ) : (
              <p className="italic text-gray-400">
                No description available. Click Edit to add one.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Compensation Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Compensation & Benefits
          </h2>
          {!isEditingCTC && (
            <button
              onClick={() => setIsEditingCTC(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Edit3 size={18} /> Edit
            </button>
          )}
        </div>

        {isEditingCTC ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Minimum CTC
                </label>
                <input
                  type="number"
                  value={ctcValue.min}
                  onChange={(e) =>
                    setCtcValue({
                      ...ctcValue,
                      min: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Maximum CTC
                </label>
                <input
                  type="number"
                  value={ctcValue.max}
                  onChange={(e) =>
                    setCtcValue({
                      ...ctcValue,
                      max: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Currency
                </label>
                <select
                  value={ctcValue.currency}
                  onChange={(e) =>
                    setCtcValue({ ...ctcValue, currency: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Benefits
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {ctcValue.benefits?.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {benefit}
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddBenefit()}
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a benefit (e.g., Health Insurance)"
                />
                <button
                  onClick={handleAddBenefit}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveCTC}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={18} /> {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setCtcValue(
                    ctc || { min: 0, max: 0, currency: "INR", benefits: [] }
                  );
                  setIsEditingCTC(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                disabled={saving}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Salary Range
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                {ctcValue.currency} {ctcValue.min?.toLocaleString()} -{" "}
                {ctcValue.max?.toLocaleString()}
              </p>
            </div>

            {ctcValue.benefits?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ctcValue.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
