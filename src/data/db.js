import Dexie from "dexie";

export const db = new Dexie('JobBoardDB');

// Version 1: Initial schema
db.version(1).stores({
  jobs: 'id, title, status, order, slug, tags, stages',
  candidates: 'id, name, email, jobId, jobTitle, stage',
  timelines: '++id, candidateId, stage, date, note',
  notes: '++id, candidateId, author, text, date',
  assessments: 'jobId'
});

// Version 2: Add jobDetails table
db.version(2).stores({
  jobs: 'id, title, status, order, slug, tags, stages',
  jobDetails: 'jobId', // New: Comprehensive job information
  candidates: 'id, name, email, jobId, jobTitle, stage',
  timelines: '++id, candidateId, stage, date, note',
  notes: '++id, candidateId, author, text, date',
  assessments: 'jobId'
});

// ==================== SEED FUNCTIONS ====================

// Seed jobs first!
export async function initDexieWithSeedData(jobsSeed) {
  await db.open();
  const count = await db.jobs.count();
  if (count === 0) {
    await db.jobs.bulkPut(jobsSeed);
  }
}

// Seed candidates, dynamically, with valid jobs!
export async function initDexieCandidates(candidatesSeed) {
  await db.open();
  const count = await db.candidates.count();
  if (count === 0) {
    await db.candidates.bulkPut(candidatesSeed);
    let allTimeline = [];
    candidatesSeed.forEach(c =>
      (c.timeline || []).forEach(ev => {
        allTimeline.push({ candidateId: c.id, ...ev });
      })
    );
    if (allTimeline.length > 0) {
      await db.timelines.bulkPut(allTimeline);
    }
  }
}

export async function seedAssessments(assessmentsSeed) {
  await db.open();
  const count = await db.assessments.count();
  if (count === 0 && Array.isArray(assessmentsSeed)) {
    await db.assessments.bulkPut(assessmentsSeed);
  }
}

// Seed job details
export async function seedJobDetails(jobDetailsSeed) {
  await db.open();
  const count = await db.jobDetails.count();
  if (count === 0 && Array.isArray(jobDetailsSeed)) {
    await db.jobDetails.bulkPut(jobDetailsSeed);
  }
}

// ==================== JOBS FUNCTIONS ====================

export async function getAllJobsFromDexie() {
  await db.open();
  return await db.jobs.toArray();
}

export async function getJobById(jobId) {
  await db.open();
  return await db.jobs.get(jobId);
}

export async function createJob(jobData) {
  await db.open();
  return await db.jobs.add(jobData);
}

export async function updateJob(jobId, jobData) {
  await db.open();
  return await db.jobs.update(jobId, jobData);
}

export async function deleteJob(jobId) {
  await db.open();
  return await db.jobs.delete(jobId);
}

// ==================== JOB DETAILS FUNCTIONS ====================

// Get job details (description, CTC, questions, eligibility)
export async function getJobDetails(jobId) {
  await db.open();
  return await db.jobDetails.get(jobId);
}

// Save/update job details
export async function saveJobDetails(jobId, detailsData) {
  await db.open();
  return await db.jobDetails.put({
    jobId,
    title: detailsData.title || '',
    status: detailsData.status || 'active',
    tags: detailsData.tags || [],
    stages: detailsData.stages || [],
    description: detailsData.description || '',
    ctc: detailsData.ctc || { min: 0, max: 0, currency: 'INR', benefits: [] },
    commonQuestions: detailsData.commonQuestions || [],
    eligibilityCriteria: detailsData.eligibilityCriteria || [],
    updatedAt: new Date().toISOString()
  });
}

// Update job description only
export async function updateJobDescription(jobId, description) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details) {
    return await saveJobDetails(jobId, { description });
  }
  details.description = description;
  details.updatedAt = new Date().toISOString();
  return await db.jobDetails.put(details);
}

// Update CTC only
export async function updateJobCTC(jobId, ctc) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details) {
    return await saveJobDetails(jobId, { ctc });
  }
  details.ctc = ctc;
  details.updatedAt = new Date().toISOString();
  return await db.jobDetails.put(details);
}

// ==================== COMMON QUESTIONS FUNCTIONS ====================

// Add new common question
export async function addCommonQuestion(jobId, question) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details) {
    return await saveJobDetails(jobId, { 
      commonQuestions: [{
        id: question.id || `q${Date.now()}`,
        ...question
      }] 
    });
  }
  
  if (!details.commonQuestions) details.commonQuestions = [];
  
  // Add unique ID if not provided
  if (!question.id) {
    question.id = `q${Date.now()}`;
  }
  
  details.commonQuestions.push(question);
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Update specific common question by index
export async function updateCommonQuestion(jobId, questionIndex, updatedQuestion) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.commonQuestions) return null;
  
  if (questionIndex < 0 || questionIndex >= details.commonQuestions.length) {
    throw new Error('Invalid question index');
  }
  
  details.commonQuestions[questionIndex] = {
    ...details.commonQuestions[questionIndex],
    ...updatedQuestion
  };
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Update common question by ID
export async function updateCommonQuestionById(jobId, questionId, updatedQuestion) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.commonQuestions) return null;
  
  const questionIndex = details.commonQuestions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) {
    throw new Error('Question not found');
  }
  
  details.commonQuestions[questionIndex] = {
    ...details.commonQuestions[questionIndex],
    ...updatedQuestion
  };
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Delete common question by index
export async function deleteCommonQuestion(jobId, questionIndex) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.commonQuestions) return null;
  
  if (questionIndex < 0 || questionIndex >= details.commonQuestions.length) {
    throw new Error('Invalid question index');
  }
  
  details.commonQuestions.splice(questionIndex, 1);
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Delete common question by ID
export async function deleteCommonQuestionById(jobId, questionId) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.commonQuestions) return null;
  
  const questionIndex = details.commonQuestions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) {
    throw new Error('Question not found');
  }
  
  details.commonQuestions.splice(questionIndex, 1);
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// ==================== ELIGIBILITY CRITERIA FUNCTIONS ====================

// Update eligibility criteria (replaces all)
export async function updateEligibilityCriteria(jobId, criteria) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details) {
    return await saveJobDetails(jobId, { eligibilityCriteria: criteria });
  }
  
  details.eligibilityCriteria = criteria;
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Add single eligibility criterion
export async function addEligibilityCriterion(jobId, criterion) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details) {
    return await saveJobDetails(jobId, { 
      eligibilityCriteria: [{
        id: criterion.id || `ec${Date.now()}`,
        ...criterion
      }] 
    });
  }
  
  if (!details.eligibilityCriteria) details.eligibilityCriteria = [];
  
  // Add unique ID if not provided
  if (!criterion.id) {
    criterion.id = `ec${Date.now()}`;
  }
  
  details.eligibilityCriteria.push(criterion);
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Update eligibility criterion by ID
export async function updateEligibilityCriterionById(jobId, criterionId, updatedCriterion) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.eligibilityCriteria) return null;
  
  const criterionIndex = details.eligibilityCriteria.findIndex(c => c.id === criterionId);
  if (criterionIndex === -1) {
    throw new Error('Criterion not found');
  }
  
  details.eligibilityCriteria[criterionIndex] = {
    ...details.eligibilityCriteria[criterionIndex],
    ...updatedCriterion
  };
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// Delete eligibility criterion by ID
export async function deleteEligibilityCriterionById(jobId, criterionId) {
  await db.open();
  const details = await db.jobDetails.get(jobId);
  if (!details || !details.eligibilityCriteria) return null;
  
  const criterionIndex = details.eligibilityCriteria.findIndex(c => c.id === criterionId);
  if (criterionIndex === -1) {
    throw new Error('Criterion not found');
  }
  
  details.eligibilityCriteria.splice(criterionIndex, 1);
  details.updatedAt = new Date().toISOString();
  
  return await db.jobDetails.put(details);
}

// ==================== CANDIDATES FUNCTIONS ====================

export async function getAllCandidates() {
  await db.open();
  return await db.candidates.toArray();
}

export async function getCandidateById(candidateId) {
  await db.open();
  return await db.candidates.get(candidateId);
}

export async function getCandidatesByJobId(jobId) {
  await db.open();
  return await db.candidates.where('jobId').equals(jobId).toArray();
}

export async function createCandidate(candidateData) {
  await db.open();
  return await db.candidates.add(candidateData);
}

export async function updateCandidate(candidateId, candidateData) {
  await db.open();
  return await db.candidates.update(candidateId, candidateData);
}

export async function deleteCandidate(candidateId) {
  await db.open();
  return await db.candidates.delete(candidateId);
}

// ==================== TIMELINE FUNCTIONS ====================

export async function getTimeline(candidateId) {
  await db.open();
  return await db.timelines.where("candidateId").equals(candidateId).toArray();
}

export async function addTimelineEvent(candidateId, event) {
  await db.open();
  return await db.timelines.add({
    candidateId,
    ...event,
    date: event.date || new Date().toISOString()
  });
}

export async function updateTimelineEvent(eventId, eventData) {
  await db.open();
  return await db.timelines.update(eventId, eventData);
}

export async function deleteTimelineEvent(eventId) {
  await db.open();
  return await db.timelines.delete(eventId);
}

// ==================== NOTES FUNCTIONS ====================

export async function getNotes(candidateId) {
  await db.open();
  return await db.notes.where("candidateId").equals(candidateId).toArray();
}

export async function addNote(candidateId, noteData) {
  await db.open();
  return await db.notes.add({
    candidateId,
    ...noteData,
    date: noteData.date || new Date().toISOString()
  });
}

export async function updateNote(noteId, noteData) {
  await db.open();
  return await db.notes.update(noteId, noteData);
}

export async function deleteNote(noteId) {
  await db.open();
  return await db.notes.delete(noteId);
}

// ==================== ASSESSMENTS FUNCTIONS ====================

// Get assessment builder config for a job
export async function getAssessmentForJob(jobId) {
  await db.open();
  return await db.assessments.get(jobId);
}

// Save/update assessment builder config for a job
export async function saveAssessmentForJob(jobId, assessmentData) {
  await db.open();
  return await db.assessments.put({ jobId, ...assessmentData });
}

export async function deleteAssessmentForJob(jobId) {
  await db.open();
  return await db.assessments.delete(jobId);
}

// ==================== UTILITY FUNCTIONS ====================

export async function clearAllData() {
  await db.delete();
}

export async function clearTable(tableName) {
  await db.open();
  if (db[tableName]) {
    return await db[tableName].clear();
  }
  throw new Error(`Table ${tableName} does not exist`);
}

// Get complete job info (from both jobs and jobDetails tables)
export async function getCompleteJobInfo(jobId) {
  await db.open();
  const [job, details] = await Promise.all([
    db.jobs.get(jobId),
    db.jobDetails.get(jobId)
  ]);
  
  return {
    ...job,
    details
  };
}

// Get all jobs with their details
export async function getAllJobsWithDetails() {
  await db.open();
  const jobs = await db.jobs.toArray();
  
  const jobsWithDetails = await Promise.all(
    jobs.map(async (job) => {
      const details = await db.jobDetails.get(job.id);
      return {
        ...job,
        details
      };
    })
  );
  
  return jobsWithDetails;
}

// Search jobs by title, tags, or status
export async function searchJobs(searchTerm) {
  await db.open();
  const allJobs = await db.jobs.toArray();
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return allJobs.filter(job => 
    job.title.toLowerCase().includes(lowerSearchTerm) ||
    job.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
    job.status.toLowerCase().includes(lowerSearchTerm)
  );
}

// Get jobs by status
export async function getJobsByStatus(status) {
  await db.open();
  return await db.jobs.where('status').equals(status).toArray();
}

// Export all data (for backup)
export async function exportAllData() {
  await db.open();
  const [jobs, jobDetails, candidates, timelines, notes, assessments] = await Promise.all([
    db.jobs.toArray(),
    db.jobDetails.toArray(),
    db.candidates.toArray(),
    db.timelines.toArray(),
    db.notes.toArray(),
    db.assessments.toArray()
  ]);
  
  return {
    jobs,
    jobDetails,
    candidates,
    timelines,
    notes,
    assessments,
    exportedAt: new Date().toISOString()
  };
}

// Import all data (for restore)
export async function importAllData(data) {
  await db.open();
  
  await db.transaction('rw', [db.jobs, db.jobDetails, db.candidates, db.timelines, db.notes, db.assessments], async () => {
    if (data.jobs) await db.jobs.bulkPut(data.jobs);
    if (data.jobDetails) await db.jobDetails.bulkPut(data.jobDetails);
    if (data.candidates) await db.candidates.bulkPut(data.candidates);
    if (data.timelines) await db.timelines.bulkPut(data.timelines);
    if (data.notes) await db.notes.bulkPut(data.notes);
    if (data.assessments) await db.assessments.bulkPut(data.assessments);
  });
  
  return true;
}
