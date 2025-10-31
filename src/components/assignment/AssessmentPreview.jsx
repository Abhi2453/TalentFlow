import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssessmentPreview({ assessment }) {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("🔍 Assessment loaded:", assessment);
  }, [assessment]);

  if (!assessment?.sections?.length) {
    return (
      <div className="text-gray-500 text-center py-10">
        No sections to preview yet.
      </div>
    );
  }

  // Find question in the assessment by id and return its location
  function findQuestionById(qId) {
    for (let si = 0; si < assessment.sections.length; si++) {
      const sec = assessment.sections[si];
      for (let qi = 0; qi < sec.questions.length; qi++) {
        if (sec.questions[qi].id === qId) {
          return { question: sec.questions[qi], sectionIndex: si, questionIndex: qi };
        }
      }
    }
    return null;
  }

  // Decide visibility based on conditional
  function shouldShowQuestion(question, sectionIdx, questionIdx) {
    // If no conditional property exists, always show the question
    if (!question.conditional || !question.conditional.questionId) {
      return true;
    }

    // Find the parent question this depends on
    const parentMeta = findQuestionById(question.conditional.questionId);
    if (!parentMeta) {
      console.error(`❌ Parent question "${question.conditional.questionId}" NOT FOUND`);
      return false;
    }

    // Get the parent question's answer key
    const parentKey = `${parentMeta.sectionIndex}-${parentMeta.questionIndex}`;
    const parentAnswer = answers[parentKey];

    // If parent hasn't been answered, DON'T show this question
    if (
      parentAnswer === undefined ||
      parentAnswer === null ||
      parentAnswer === "" ||
      (Array.isArray(parentAnswer) && parentAnswer.length === 0)
    ) {
      return false;
    }

    // Check if parent answer matches the expected value (CASE-INSENSITIVE)
    const expectedValue = String(question.conditional.expectedValue).trim().toLowerCase();

    // Handle multi-choice (array of answers)
    if (Array.isArray(parentAnswer)) {
      const matches = parentAnswer.some(
        ans => String(ans).trim().toLowerCase() === expectedValue
      );
      return matches;
    }

    // Handle single-choice, text, or numeric (single value)
    const parentAnswerStr = String(parentAnswer).trim().toLowerCase();
    const matches = parentAnswerStr === expectedValue;
    
    return matches;
  }

  function handleChange(sectionIdx, questionIdx, value) {
    const key = `${sectionIdx}-${questionIdx}`;
    
    setAnswers((prev) => {
      const newAnswers = { ...prev, [key]: value };
      
      // Clear answers for conditional questions that depend on this question
      const currentQuestion = assessment.sections[sectionIdx].questions[questionIdx];
      
      // Find all questions that depend on this one
      assessment.sections.forEach((section, sIdx) => {
        section.questions.forEach((q, qIdx) => {
          if (q.conditional && q.conditional.questionId === currentQuestion.id) {
            const dependentKey = `${sIdx}-${qIdx}`;
            const expectedValue = String(q.conditional.expectedValue).trim().toLowerCase();
            
            // Check if the new answer matches the expected value (CASE-INSENSITIVE)
            let matches = false;
            
            if (Array.isArray(value)) {
              matches = value.some(
                v => String(v).trim().toLowerCase() === expectedValue
              );
            } else {
              matches = String(value).trim().toLowerCase() === expectedValue;
            }
            
            // If doesn't match, clear the dependent question's answer
            if (!matches && newAnswers[dependentKey]) {
              delete newAnswers[dependentKey];
              
              // Also clear any errors for that question
              setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[dependentKey];
                return newErrors;
              });
            }
          }
        });
      });
      
      return newAnswers;
    });

    // Validate the question
    const q = assessment.sections[sectionIdx].questions[questionIdx];
    let err = "";
    const isEmpty =
      (q.type === "multi-choice" && (!value || value.length === 0)) ||
      (q.type === "file-upload" && !value) ||
      ((q.type === "short-text" ||
        q.type === "long-text" ||
        q.type === "numeric") &&
        (!value || String(value).trim() === "")) ||
      (q.type === "single-choice" && (!value || value === ""));
    
    if (q.required && isEmpty) {
      err = "This field is required.";
    } else if (q.type === "numeric" && value !== "" && isNaN(value)) {
      err = "Please enter a valid number.";
    }
    
    setErrors((prev) => ({ ...prev, [key]: err }));
  }

  function handleSubmit() {
    const newErrors = {};
    let hasError = false;

    assessment.sections.forEach((section, sIdx) => {
      section.questions.forEach((q, qIdx) => {
        // Only validate visible questions
        if (!shouldShowQuestion(q, sIdx, qIdx)) return;
        
        const key = `${sIdx}-${qIdx}`;
        const val = answers[key];
        let err = "";
        
        const isEmpty =
          (q.type === "multi-choice" && (!val || val.length === 0)) ||
          (q.type === "file-upload" && !val) ||
          ((q.type === "short-text" ||
            q.type === "long-text" ||
            q.type === "numeric") &&
            (!val || String(val).trim() === "")) ||
          (q.type === "single-choice" && (!val || val === ""));
        
        if (q.required && isEmpty) {
          err = "This field is required.";
          hasError = true;
        } else if (q.type === "numeric" && val !== "" && isNaN(val)) {
          err = "Please enter a valid number.";
          hasError = true;
        }
        
        newErrors[key] = err;
      });
    });

    setErrors(newErrors);
    
    if (!hasError) {
      toast.success("Assessment submitted successfully!", { 
        position: "bottom-right", 
        autoClose: 2000 
      });
      console.log("Submitted answers:", answers);
    } else {
      toast.error("Please fill in all required fields.", {
        position: "bottom-right",
        autoClose: 3000
      });
    }
  }

  return (
    <div className="space-y-8">
      <ToastContainer />
      {assessment.sections.map((section, sIdx) => (
        <div
          key={section.id || sIdx}
          className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h2>
          {section.description && (
            <p className="text-sm text-gray-500 mb-4">{section.description}</p>
          )}

          <div className="space-y-6">
            {section.questions.map((q, qIdx) => {
              const key = `${sIdx}-${qIdx}`;
              const value = answers[key] ?? (q.type === "multi-choice" ? [] : "");
              const error = errors[key];
              const visible = shouldShowQuestion(q, sIdx, qIdx);

              // Don't render if not visible
              if (!visible) {
                return null;
              }

              return (
                <div 
                  key={key} 
                  className={`space-y-2 p-4 rounded-lg transition-all duration-300 ${
                    q.conditional ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-gray-50'
                  }`}
                >
                  <label className="block text-gray-700 font-medium">
                    {q.text} {q.required && <span className="text-red-500">*</span>}
                    {q.conditional && (
                      <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        Conditional
                      </span>
                    )}
                  </label>

                  {/* Single choice */}
                  {q.type === "single-choice" && (
                    <div className="flex gap-6 flex-wrap">
                      {(q.options || []).map((opt) => (
                        <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                          <input
                            type="radio"
                            name={key}
                            value={opt.text}
                            checked={value === opt.text}
                            onChange={() => handleChange(sIdx, qIdx, opt.text)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{opt.text}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Multi choice */}
                  {q.type === "multi-choice" && (
                    <div className="flex gap-4 flex-wrap">
                      {(q.options || []).map((opt) => {
                        const checked = Array.isArray(value) && value.includes(opt.text);
                        return (
                          <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                            <input
                              type="checkbox"
                              value={opt.text}
                              checked={checked}
                              onChange={(e) => {
                                const cur = Array.isArray(value) ? [...value] : [];
                                const updated = e.target.checked
                                  ? [...cur, opt.text]
                                  : cur.filter((v) => v !== opt.text);
                                handleChange(sIdx, qIdx, updated);
                              }}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{opt.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Short text */}
                  {q.type === "short-text" && (
                    <input
                      type="text"
                      value={value}
                      maxLength={q.validation?.maxLength}
                      onChange={(e) => handleChange(sIdx, qIdx, e.target.value)}
                      className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter short answer"
                    />
                  )}

                  {/* Long text */}
                  {q.type === "long-text" && (
                    <textarea
                      value={value}
                      rows={3}
                      maxLength={q.validation?.maxLength}
                      onChange={(e) => handleChange(sIdx, qIdx, e.target.value)}
                      className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter detailed answer"
                    />
                  )}

                  {/* Numeric */}
                  {q.type === "numeric" && (
                    <input
                      type="number"
                      value={value}
                      min={q.validation?.min}
                      max={q.validation?.max}
                      onChange={(e) => handleChange(sIdx, qIdx, e.target.value)}
                      className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter number"
                    />
                  )}

                  {/* File upload */}
                  {q.type === "file-upload" && (
                    <input
                      type="file"
                      onChange={(e) => handleChange(sIdx, qIdx, e.target.files?.[0]?.name || "")}
                      className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}

                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#1ac2b6] to-[#169d9e] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}
