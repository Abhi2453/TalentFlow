import { jobs } from "../data/jobsService";
import { candidates } from "../data/candidatesService";
import { assessments } from "../data/assessmentsService";

/**
 * Seeds a MirageJS server with jobs, candidates, and assessments.
 * @param {Server} server The MirageJS server instance.
 */
export function seedDatabase(server) {
  jobs.forEach(job => server.create("job", job));
  candidates.forEach(candidate => server.create("candidate", candidate));
  // Seed assessments per job
  if (assessments && Array.isArray(assessments)) {
    assessments.forEach(assessment => {
      // assessment object must have jobId and sections (with questions/structure above!)
      server.create("assessment", assessment);
    });
  }
}
