import React from "react";
import { PlusCircle, Trash2, ChevronDown } from "lucide-react";

function generateOptionId(prefix = "opt") {
  return prefix + "-" + Math.floor(Math.random() * 1000000);
}

function generateQuestionId(prefix = "q") {
  return prefix + "-" + Math.floor(Math.random() * 1000000);
}

export default function BuilderEditor({ assessment, setAssessment, onSave }) {
  function addSection() {
    const sections = [...assessment.sections, { title: "New Section", description: "", questions: [] }];
    setAssessment({ ...assessment, sections });
  }

  function updateSectionTitle(idx, title) {
    const sections = [...assessment.sections];
    sections[idx].title = title;
    setAssessment({ ...assessment, sections });
  }

  function removeSection(idx) {
    const sections = assessment.sections.filter((_, i) => i !== idx);
    setAssessment({ ...assessment, sections });
  }

  function addQuestion(sIdx) {
    const newQuestion = {
      id: generateQuestionId(),
      text: "",
      type: "short-text",
      required: false,
      options: [],
      conditional: null,
    };
    const sections = [...assessment.sections];
    sections[sIdx].questions = [...sections[sIdx].questions, newQuestion];
    setAssessment({ ...assessment, sections });
  }

  function removeQuestion(sIdx, qIdx) {
    const sections = [...assessment.sections];
    const removedQuestionId = sections[sIdx].questions[qIdx].id;
    sections[sIdx].questions = sections[sIdx].questions.filter((_, i) => i !== qIdx);
    
    // Remove dependencies on this question
    sections.forEach((section) => {
      section.questions.forEach((q) => {
        if (q.conditional?.questionId === removedQuestionId) {
          q.conditional = null;
        }
      });
    });
    
    setAssessment({ ...assessment, sections });
  }

  function updateQuestion(sIdx, qIdx, changes) {
    const sections = [...assessment.sections];
    sections[sIdx].questions[qIdx] = { ...sections[sIdx].questions[qIdx], ...changes };
    setAssessment({ ...assessment, sections });
  }

  function addOption(sIdx, qIdx) {
    const sections = [...assessment.sections];
    const q = sections[sIdx].questions[qIdx];
    q.options = [...(q.options || []), { id: generateOptionId(), text: "" }];
    setAssessment({ ...assessment, sections });
  }

  function updateOption(sIdx, qIdx, optIdx, text) {
    const sections = [...assessment.sections];
    const q = sections[sIdx].questions[qIdx];
    q.options[optIdx].text = text;
    setAssessment({ ...assessment, sections });
  }

  function removeOption(sIdx, qIdx, optIdx) {
    const sections = [...assessment.sections];
    const q = sections[sIdx].questions[qIdx];
    q.options = q.options.filter((_, i) => i !== optIdx);
    setAssessment({ ...assessment, sections });
  }

  function updateConditional(sIdx, qIdx, questionId, expectedValue) {
    const sections = [...assessment.sections];
    if (!questionId) {
      sections[sIdx].questions[qIdx].conditional = null;
    } else {
      sections[sIdx].questions[qIdx].conditional = {
        questionId,
        expectedValue,
      };
    }
    setAssessment({ ...assessment, sections });
  }

  // Get all previous questions that can be dependencies
  function getAvailableQuestions(sIdx, qIdx) {
    const allQuestions = [];
    assessment.sections.forEach((section, sectIdx) => {
      section.questions.forEach((q, qIdxInSection) => {
        if (sectIdx < sIdx || (sectIdx === sIdx && qIdxInSection < qIdx)) {
          allQuestions.push({
            id: q.id,
            text: q.text,
            type: q.type,
            options: q.options,
            sIdx: sectIdx,
            qIdx: qIdxInSection,
          });
        }
      });
    });
    return allQuestions;
  }

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-10 py-4 w-full overflow-x-hidden">
      <button
        onClick={addSection}
        className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-6 
                   bg-[#1ac2b6] text-white rounded-lg hover:bg-[#169d9e] shadow-lg 
                   transition-all font-semibold text-sm sm:text-base w-full sm:w-auto"
      >
        <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Add Section
      </button>

      {assessment.sections.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-10">
          No sections yet — click "Add Section" to get started ✨
        </div>
      )}

      <div className="space-y-8">
        {assessment.sections.map((section, sIdx) => (
          <div
            key={sIdx}
            className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <input
                value={section.title}
                onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                placeholder="Section Title"
                className="text-base sm:text-lg font-semibold text-gray-800 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 border-b border-gray-200 pb-1"
              />
              <button
                onClick={() => removeSection(sIdx)}
                className="text-red-500 hover:text-red-600 p-1 sm:p-2"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <button
              onClick={() => addQuestion(sIdx)}
              className="flex items-center gap-1 sm:gap-2 mb-4 text-xs sm:text-sm text-[#169d9e] font-medium hover:underline"
            >
              <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Add Question
            </button>

            <div className="space-y-4">
              {section.questions.map((q, qIdx) => (
                <div key={q.id || qIdx}>
                  <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-all">
                    <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-2">
                      <input
                        value={q.text}
                        onChange={(e) =>
                          updateQuestion(sIdx, qIdx, { text: e.target.value })
                        }
                        className="flex-1 min-w-[180px] sm:min-w-[250px] border-b border-gray-300 focus:border-indigo-400 text-gray-800 px-1 py-1 text-sm sm:text-base focus:outline-none"
                        placeholder="Enter question text..."
                      />

                      <select
                        value={q.type}
                        onChange={(e) =>
                          updateQuestion(sIdx, qIdx, {
                            type: e.target.value,
                            options:
                              e.target.value === "single-choice" ||
                              e.target.value === "multi-choice"
                                ? q.options || []
                                : [],
                          })
                        }
                        className="px-2 py-1 sm:px-3 sm:py-1 border rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                      >
                        <option value="single-choice">Single Choice</option>
                        <option value="multi-choice">Multiple Choice</option>
                        <option value="short-text">Short Text</option>
                        <option value="long-text">Long Text</option>
                        <option value="numeric">Numeric</option>
                        <option value="file-upload">File Upload</option>
                      </select>

                      <label className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={q.required}
                          onChange={(e) =>
                            updateQuestion(sIdx, qIdx, {
                              required: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300"
                        />
                        Required
                      </label>

                      <button
                        onClick={() => removeQuestion(sIdx, qIdx)}
                        className="text-red-400 hover:text-red-600 ml-auto p-1 sm:p-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Options for choice questions */}
                    {(q.type === "single-choice" || q.type === "multi-choice") && (
                      <div className="space-y-2 mt-3">
                        <label className="text-xs sm:text-sm font-medium text-gray-700">
                          Options:
                        </label>
                        {(q.options || []).map((opt, optIdx) => (
                          <div key={opt.id || optIdx} className="flex flex-wrap gap-2 mb-1">
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) =>
                                updateOption(sIdx, qIdx, optIdx, e.target.value)
                              }
                              className="flex-1 border px-2 py-1 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                              placeholder={`Option ${optIdx + 1}`}
                            />
                            <button
                              className="text-red-500 hover:text-red-600 p-1"
                              onClick={() => removeOption(sIdx, qIdx, optIdx)}
                            >
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(sIdx, qIdx)}
                          className="text-[11px] sm:text-xs text-[#1ac2b6] py-1 px-2 border border-dashed border-blue-400 rounded-md hover:bg-blue-50 transition"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Conditional Logic Section */}
                  <div className="mt-2 ml-2 p-3 bg-[#def4f3] rounded-lg border-l-4 border-[#169d9e]">
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronDown className="w-4 h-4 text-[#169d9e]" />
                      <label className="text-xs sm:text-sm font-semibold text-[#169d9e]">
                        Show this question if:
                      </label>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <select
                        value={q.conditional?.questionId || ""}
                        onChange={(e) => {
                          if (e.target.value) {
                            updateConditional(sIdx, qIdx, e.target.value, "");
                          } else {
                            updateConditional(sIdx, qIdx, null, null);
                          }
                        }}
                        className="w-full px-2 py-1.5 border rounded-md focus:ring-2 focus:ring-[#1ac2b6] focus:outline-none"
                      >
                        <option value="">— No condition (always show) —</option>
                        {getAvailableQuestions(sIdx, qIdx).map((prevQ) => (
                          <option key={prevQ.id} value={prevQ.id}>
                            {prevQ.text || "Untitled Question"}
                          </option>
                        ))}
                      </select>

                      {q.conditional?.questionId && (
                        <>
                          {/* Get the parent question to show its options */}
                          {(() => {
                            const parentQ = getAvailableQuestions(sIdx, qIdx).find(
                              (pq) => pq.id === q.conditional.questionId
                            );
                            if (
                              parentQ &&
                              (parentQ.type === "single-choice" || parentQ.type === "multi-choice")
                            ) {
                              return (
                                <select
                                  value={q.conditional?.expectedValue || ""}
                                  onChange={(e) =>
                                    updateConditional(
                                      sIdx,
                                      qIdx,
                                      q.conditional.questionId,
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                >
                                  <option value="">— Select expected answer —</option>
                                  {parentQ.options.map((opt) => (
                                    <option key={opt.id} value={opt.text}>
                                      {opt.text || "Untitled Option"}
                                    </option>
                                  ))}
                                </select>
                              );
                            } else if (parentQ?.type === "short-text" || parentQ?.type === "long-text") {
                              return (
                                <input
                                  type="text"
                                  value={q.conditional?.expectedValue || ""}
                                  onChange={(e) =>
                                    updateConditional(
                                      sIdx,
                                      qIdx,
                                      q.conditional.questionId,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter expected text value..."
                                  className="w-full px-2 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                              );
                            } else if (parentQ?.type === "numeric") {
                              return (
                                <input
                                  type="number"
                                  value={q.conditional?.expectedValue || ""}
                                  onChange={(e) =>
                                    updateConditional(
                                      sIdx,
                                      qIdx,
                                      q.conditional.questionId,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter expected numeric value..."
                                  className="w-full px-2 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                              );
                            }
                            return null;
                          })()}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
