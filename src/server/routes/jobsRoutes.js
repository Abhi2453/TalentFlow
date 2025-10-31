// src/mirage/routes/jobsRoutes.js

import { Response } from "miragejs";
import { 
  db, 
  updateJob, 
  createJob as createJobInDB,
  getJobDetails,
  saveJobDetails,
  updateJobDescription,
  updateJobCTC,
  addCommonQuestion,
  updateCommonQuestionById,
  deleteCommonQuestionById,
  updateEligibilityCriteria,
  addEligibilityCriterion,
  updateEligibilityCriterionById,
  deleteEligibilityCriterionById
} from "../../data/db";

export function jobsRoutes() {
  // GET /jobs - List all jobs with pagination and filtering
  this.get("/jobs", (schema, request) => {
    let { search = '', status = 'all', page = 1, pageSize = 5 } = request.queryParams;
    
    let jobs = schema.jobs.all().models;
    
    // Filter by search
    if (search) {
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Filter by status
    if (status !== 'all') {
      jobs = jobs.filter(job => job.status === status);
    }
    
    // Sort by order
    jobs = jobs.sort((a, b) => a.order - b.order);
    
    // Pagination
    const total = jobs.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedJobs = jobs.slice(startIndex, startIndex + parseInt(pageSize));
    
    return {
      jobs: paginatedJobs.map(j => j.attrs),
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages: Math.ceil(total / pageSize)
    };
  });

  // GET /jobs/:id - Get single job
  this.get("/jobs/:id", async (schema, request) => {
    let id = request.params.id;
    let job = schema.jobs.find(id);
    
    if (!job) {
      return new Response(404, {}, { error: "Job not found" });
    }
    
    return job.attrs;
  });

  // GET /jobs/:id/details - Get job details (description, CTC, etc.)
  this.get("/jobs/:id/details", async (schema, request) => {
    let id = request.params.id;
    
    try {
      const details = await getJobDetails(id);
      
      if (!details) {
        return new Response(404, {}, { error: "Job details not found" });
      }
      
      return details;
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // POST /jobs - Create new job
  this.post("/jobs", async (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    
    // Generate ID and slug
    attrs.id = attrs.id || `job-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    attrs.slug = attrs.slug || attrs.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    attrs.status = attrs.status || "active";
    attrs.order = attrs.order ?? schema.jobs.all().length;
    attrs.tags = attrs.tags || [];
    attrs.stages = attrs.stages || ["applied", "screen", "tech", "offer"];
    
    // Create in MirageJS
    let job = schema.jobs.create(attrs);
    
    // Create in Dexie
    await db.jobs.put(job.attrs);
    
    // Create empty job details if provided
    if (attrs.details) {
      await saveJobDetails(attrs.id, attrs.details);
    }
    
    return job.attrs;
  });

  // PATCH /jobs/:id - Update job basic info
  this.patch("/jobs/:id", async (schema, request) => {
    let id = request.params.id;
    let newAttrs = JSON.parse(request.requestBody);
    let job = schema.jobs.find(id);
    
    if (!job) {
      return new Response(404, {}, { error: "Job not found" });
    }
    
    // Update slug if title changed
    if (newAttrs.title && newAttrs.title !== job.title) {
      newAttrs.slug = newAttrs.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    
    job.update(newAttrs);
    await updateJob(id, newAttrs);
    
    return job.attrs;
  });

  // PATCH /jobs/:id/details - Update job details
  this.patch("/jobs/:id/details", async (schema, request) => {
    let id = request.params.id;
    let detailsData = JSON.parse(request.requestBody);
    
    try {
      await saveJobDetails(id, detailsData);
      const updatedDetails = await getJobDetails(id);
      
      return updatedDetails;
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/description - Update job description
  this.patch("/jobs/:id/description", async (schema, request) => {
    let id = request.params.id;
    let { description } = JSON.parse(request.requestBody);
    
    try {
      await updateJobDescription(id, description);
      const details = await getJobDetails(id);
      
      return { description: details.description };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/ctc - Update job CTC
  this.patch("/jobs/:id/ctc", async (schema, request) => {
    let id = request.params.id;
    let { ctc } = JSON.parse(request.requestBody);
    
    try {
      await updateJobCTC(id, ctc);
      const details = await getJobDetails(id);
      
      return { ctc: details.ctc };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // POST /jobs/:id/questions - Add common question
  this.post("/jobs/:id/questions", async (schema, request) => {
    let id = request.params.id;
    let question = JSON.parse(request.requestBody);
    
    try {
      await addCommonQuestion(id, question);
      const details = await getJobDetails(id);
      
      return { questions: details.commonQuestions };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/questions/:questionId - Update common question
  this.patch("/jobs/:id/questions/:questionId", async (schema, request) => {
    let { id, questionId } = request.params;
    let updatedQuestion = JSON.parse(request.requestBody);
    
    try {
      await updateCommonQuestionById(id, questionId, updatedQuestion);
      const details = await getJobDetails(id);
      
      return { questions: details.commonQuestions };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // DELETE /jobs/:id/questions/:questionId - Delete common question
  this.delete("/jobs/:id/questions/:questionId", async (schema, request) => {
    let { id, questionId } = request.params;
    
    try {
      await deleteCommonQuestionById(id, questionId);
      const details = await getJobDetails(id);
      
      return { questions: details.commonQuestions };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/eligibility - Update eligibility criteria
  this.patch("/jobs/:id/eligibility", async (schema, request) => {
    let id = request.params.id;
    let { criteria } = JSON.parse(request.requestBody);
    
    try {
      await updateEligibilityCriteria(id, criteria);
      const details = await getJobDetails(id);
      
      return { eligibilityCriteria: details.eligibilityCriteria };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // POST /jobs/:id/eligibility - Add eligibility criterion
  this.post("/jobs/:id/eligibility", async (schema, request) => {
    let id = request.params.id;
    let criterion = JSON.parse(request.requestBody);
    
    try {
      await addEligibilityCriterion(id, criterion);
      const details = await getJobDetails(id);
      
      return { eligibilityCriteria: details.eligibilityCriteria };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/eligibility/:criterionId - Update eligibility criterion
  this.patch("/jobs/:id/eligibility/:criterionId", async (schema, request) => {
    let { id, criterionId } = request.params;
    let updatedCriterion = JSON.parse(request.requestBody);
    
    try {
      await updateEligibilityCriterionById(id, criterionId, updatedCriterion);
      const details = await getJobDetails(id);
      
      return { eligibilityCriteria: details.eligibilityCriteria };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // DELETE /jobs/:id/eligibility/:criterionId - Delete eligibility criterion
  this.delete("/jobs/:id/eligibility/:criterionId", async (schema, request) => {
    let { id, criterionId } = request.params;
    
    try {
      await deleteEligibilityCriterionById(id, criterionId);
      const details = await getJobDetails(id);
      
      return { eligibilityCriteria: details.eligibilityCriteria };
    } catch (error) {
      return new Response(500, {}, { error: error.message });
    }
  });

  // PATCH /jobs/:id/reorder - Reorder jobs
  this.patch("/jobs/:id/reorder", async (schema, request) => {
    let id = request.params.id;
    let { fromOrder, toOrder } = JSON.parse(request.requestBody);
    
    let jobsArr = schema.jobs.all().models.sort((a, b) => a.order - b.order);
    const idx = jobsArr.findIndex(j => j.id === id);
    
    if (idx === -1) {
      return new Response(404, {}, { error: "Job not found" });
    }
    
    // Reorder logic
    const job = jobsArr.splice(idx, 1)[0];
    jobsArr.splice(toOrder, 0, job);
    jobsArr.forEach((j, idx) => {
      j.update({ order: idx });
    });
    
    // Update in Dexie
    await db.jobs.bulkPut(jobsArr.map(j => j.attrs));
    
    return { jobs: jobsArr.map(j => j.attrs) };
  });

  // DELETE /jobs/:id - Delete job
  this.delete("/jobs/:id", async (schema, request) => {
    let id = request.params.id;
    let job = schema.jobs.find(id);
    
    if (!job) {
      return new Response(404, {}, { error: "Job not found" });
    }
    
    // Delete from MirageJS
    job.destroy();
    
    // Delete from Dexie
    await db.jobs.delete(id);
    await db.jobDetails.delete(id);
    
    return new Response(204);
  });
}
