import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";

const JobsList = ({ jobs = [], onEdit, onArchive, refreshJobs }) => {
  const [items, setItems] = useState(() => jobs.map(job => job.id));
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItems(jobs.map(job => job.id));
  }, [jobs.length]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    const newOrder = [...items];
    newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, active.id);
    setItems(newOrder);

    try {
      const res = await fetch(`/api/jobs/${active.id}/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromOrder: oldIndex, toOrder: newIndex }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Failed to reorder: ${data.error || "Unknown error"}`);
        setItems(jobs.map(job => job.id));
        return;
      }
      if (refreshJobs) await refreshJobs();
    } catch {
      alert("Reorder failed! Try again.");
      setItems(jobs.map(job => job.id));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {jobs
            .sort((a, b) => items.indexOf(a.id) - items.indexOf(b.id))
            .map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={onEdit}
                onArchive={onArchive}
              />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default JobsList;
