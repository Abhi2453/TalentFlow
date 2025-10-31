// src/mirage/server.js

import { createServer, Model } from "miragejs";
import { 
  db,
  initDexieWithSeedData, 
  getAllJobsFromDexie,
  initDexieCandidates, 
  getAllCandidates,
  seedJobDetails,
  seedAssessments
} from "../data/db";
import { jobs as jobsSeed, jobDetailsSeed } from '../data/jobsService';
import { initializeCandidates } from '../data/candidatesService';
import { assessments } from '../data/assessmentsService';
import { jobsRoutes } from "./routes/jobsRoutes";
import { candidatesRoutes } from "./routes/candidatesRoutes";
import { assessmentRoutes } from "./routes/assessmentsRoutes";

let serverInstance = null;

export async function startServer() {
  if (serverInstance) return serverInstance;
  
  try {
    // 1. Seed Dexie jobs table
    await initDexieWithSeedData(jobsSeed);
    const jobs = await getAllJobsFromDexie();
    if (!jobs || jobs.length === 0) {
      throw new Error('No jobs available!');
    }

    // 2. Seed Dexie jobDetails table
    await seedJobDetails(jobDetailsSeed);

    // 3. Seed candidates
    const candidatesSeed = initializeCandidates(jobs);
    await initDexieCandidates(candidatesSeed);
    const candidates = await getAllCandidates();

    // 4. Seed assessments
    const assessmentsSeed = assessments || [];
    await seedAssessments(assessmentsSeed);

    // 5. Create MirageJS server
    serverInstance = createServer({
      models: {
        job: Model,
        candidate: Model,
        assessment: Model
      },
      
      seeds(server) {
        // Seed MirageJS with data from Dexie
        jobs.forEach(job => server.create("job", job));
        candidates.forEach(cand => server.create("candidate", cand));
        assessmentsSeed.forEach(assessment => server.create("assessment", assessment));
      },
      
      routes() {
        this.namespace = "api";
        
        // Register route handlers
        jobsRoutes.call(this);
        candidatesRoutes.call(this);
        assessmentRoutes.call(this);
        
        // Pass-through for external APIs if needed
        this.passthrough("https://api.external.com/**");
      }
    });

    console.log('✅ Server started successfully!');
    console.log(`   📋 Jobs: ${jobs.length}`);
    console.log(`   👥 Candidates: ${candidates.length}`);
    console.log(`   📝 Assessments: ${assessmentsSeed.length}`);
    console.log(`   📄 Job Details: ${jobDetailsSeed.length}`);
    
    return serverInstance;
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    throw error;
  }
}

export function stopServer() {
  if (serverInstance) {
    serverInstance.shutdown();
    serverInstance = null;
    console.log('🛑 Server stopped');
  }
}
