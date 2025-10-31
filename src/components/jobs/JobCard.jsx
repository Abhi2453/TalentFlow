// src/components/jobs/JobCard.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Archive, RotateCcw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onEdit, onArchive }) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "pointer",
  };

  const isActive = job.status === "active";

  const handleCardClick = (e) => {
    // Don't navigate if clicking on drag handle or action buttons
    if (
      e.target.closest('.drag-handle') || 
      e.target.closest('.action-buttons')
    ) {
      return;
    }
    navigate(`/jobs/${job.id}/profile`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(job);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    onArchive(job);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={handleCardClick}
      className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow hover:shadow-md hover:border-[#1ac2b6] transition-all cursor-pointer relative group"
    >
      {/* View Details Indicator */}
      {/* <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={16} className="text-gray-400" />
      </div> */}

      <div className="flex justify-between items-start">
        {/* Left side — title and tags */}
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1ac2b6] transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-orange-100 text-orange-400"
              }`}
            >
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
            {job.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full border border-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Stages:</strong> {job.stages?.join(" → ")}
          </p>
          
          {/* Click hint */}
          <p className="text-xs text-[#1ac2b6] font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view details →
          </p>
        </div>

        {/* Right side — actions */}
        <div className="flex flex-col items-end space-y-2">
          {/* Drag handle */}
          <span
            {...listeners}
            className="drag-handle text-gray-500 hover:text-gray-700 transition-colors"
            style={{ cursor: "grab", fontSize: 22, lineHeight: "1" }}
            title="Drag to reorder"
            onClick={(e) => e.stopPropagation()}
          >
            ⁞⁞⁞
          </span>

          {/* Action buttons */}
          <div className="action-buttons flex space-x-1">
            <button
              type="button"
              onClick={handleEdit}
              className="p-3 mt-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              title="Edit Job"
            >
              <Pencil size={22} strokeWidth={1.75} />
            </button>
            
            <button
              type="button"
              onClick={handleArchive}
              className={`p-3 mt-2 rounded transition-colors ${
                isActive 
                  ? "hover:bg-orange-50 text-gray-700 hover:text-orange-600" 
                  : "hover:bg-green-50 text-gray-700 hover:text-green-600"
              }`}
              title={isActive ? "Archive Job" : "Unarchive Job"}
            >
              {isActive ? (
                <Archive size={22} strokeWidth={1.75} />
              ) : (
                <RotateCcw size={22} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
