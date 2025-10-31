import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CandidateNote({ candidate }) {
  const [rejectionStage, setRejectionStage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [improvementSuggestions, setImprovementSuggestions] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSendNote = async () => {
    if (!rejectionStage) {
      toast.error("Please select a rejection stage", { position: "bottom-right" });
      return;
    }
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection", { position: "bottom-right" });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/candidates/${candidate.id}/rejection-note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rejectionReason,
          improvementSuggestions,
          stage: rejectionStage,
          candidateId: candidate.id,
        }),
      });

      if (response.ok) {
        toast.success("Note Sent Successfully!", { position: "bottom-right" });

        // clear form fields after sending
        setRejectionStage("");
        setRejectionReason("");
        setImprovementSuggestions("");
      } else {
        throw new Error("Failed to send note");
      }
    } catch (err) {
      console.error("Error sending note:", err);
      toast.error("❌ Failed to send note. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl  p-6 bg-white shadow-lg rounded-2xl border border-gray-100 relative">
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border border-red-100">
        <h2 className="text-lg font-semibold text-red-700 mb-1">
          Candidate Rejection Feedback
        </h2>
        <p className="text-sm text-gray-600">
          Help the candidate understand the decision and improve for future opportunities.
        </p>
      </div>

      {/* Rejection Stage */}
      <div>
        <label htmlFor="rejectionStage" className="block text-sm font-semibold text-gray-700 mb-2">
          Rejected at Stage <span className="text-red-500">*</span>
        </label>
        <select
          id="rejectionStage"
          value={rejectionStage}
          onChange={(e) => setRejectionStage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white text-gray-800 transition-all"
        >
          <option value="">Select stage...</option>
          <option value="Screen">Screen</option>
          <option value="Technical">Technical</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      {/* Rejection Reason */}
      <div>
        <label htmlFor="rejectionReason" className="block text-sm font-semibold text-gray-700 mb-2">
          Reason for Rejection <span className="text-red-500">*</span>
        </label>
        <textarea
          id="rejectionReason"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none transition-all"
          rows="4"
          placeholder="Explain why the candidate was not selected for this position..."
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />
      </div>

      {/* Suggestions */}
      <div>
        <label htmlFor="improvementSuggestions" className="block text-sm font-semibold text-gray-700 mb-2">
          Suggestions for Improvement (Optional)
        </label>
        <textarea
          id="improvementSuggestions"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
          rows="4"
          placeholder="Provide constructive feedback (e.g., technical skills, communication, experience)..."
          value={improvementSuggestions}
          onChange={(e) => setImprovementSuggestions(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium hover:from-red-700 hover:to-pink-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          onClick={handleSendNote}
          disabled={isSaving}
        >
          {isSaving ? "Sending..." : "Send Note to Candidate"}
        </button>
      </div>

      {/* Feedback Tips */}
      
    </div>
  );
}
