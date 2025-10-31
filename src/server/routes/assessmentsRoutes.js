import { Response } from "miragejs";
import { db } from "../../data/db";
import { assessments } from "../../data/assessmentsService"; // ✅ Import your assessments data

export function assessmentRoutes() {
  // GET /assessments
  this.get("/assessments", (schema) => {
    return {
      assessments: schema.assessments.all().models.map(m => m.attrs)
    };
  });

  // GET /assessments/:jobId
  this.get("/assessments/:jobId", async (schema, request) => {
    const { jobId } = request.params;
    
    console.log("🔍 [API] Looking for assessment with jobId:", jobId);
    
    let assessment = null;
    
    // First, try to get from Dexie DB (if it exists)
    try {
      const results = await db.assessments.where("jobId").equals(jobId).toArray();
      assessment = results[0];
      if (assessment) {
        console.log("📦 [API] Found in Dexie DB:", assessment);
      }
    } catch (err) {
      console.log("⚠️ [API] Dexie query failed or table doesn't exist:", err.message);
    }
    
    // If not found in DB, use static data
    if (!assessment) {
      assessment = assessments.find(a => a.jobId === jobId);
      if (assessment) {
        console.log("📦 [API] Found in static assessments data:", assessment);
        console.log("✅ [API] Question 3 conditional:", assessment.sections[0]?.questions[2]?.conditional);
      }
    }
    
    // Fallback to empty structure
    if (!assessment) {
      console.log("❌ [API] No assessment found for jobId:", jobId);
      return { jobId, sections: [] };
    }
    
    return assessment;
  });

  // PUT /assessments/:jobId
  this.put("/assessments/:jobId", async (schema, request) => {
    const { jobId } = request.params;
    const body = JSON.parse(request.requestBody);
    
    console.log("💾 [API] Saving assessment for jobId:", jobId);
    
    // Update MirageJS schema
    let found = schema.assessments.where({ jobId }).models[0];
    if (found) {
      found.update(body);
    } else {
      schema.assessments.create({ ...body, jobId });
    }
    
    // Save to Dexie DB
    try {
      await db.assessments.put({ 
        ...body, 
        jobId,
        id: body.id || jobId // Ensure primary key
      });
      console.log("✅ [API] Saved to Dexie DB");
    } catch (err) {
      console.error("❌ [API] Failed to save to Dexie:", err);
    }
    
    return schema.assessments.where({ jobId }).models[0]?.attrs || { ...body, jobId };
  });

  // POST /assessments/:jobId/submit
  this.post("/assessments/:jobId/submit", async (schema, request) => {
    const { jobId } = request.params;
    const response = JSON.parse(request.requestBody);
    
    console.log("📤 [API] Submitting assessment response for jobId:", jobId);
    
    try {
      const key = `${jobId}:${response.candidateId || response.email || Date.now()}`;
      await db.assessmentResponses.put({ ...response, jobId, key });
      console.log("✅ [API] Assessment response saved");
      return { saved: true };
    } catch (err) {
      console.error("❌ [API] Failed to save assessment response:", err);
      return new Response(500, {}, { error: "Failed to save response" });
    }
  });

  // GET /assessments/:jobId/responses
  this.get("/assessments/:jobId/responses", async (schema, request) => {
    const { jobId } = request.params;
    
    console.log("📥 [API] Fetching assessment responses for jobId:", jobId);
    
    try {
      const responses = await db.assessmentResponses
        .where("jobId")
        .equals(jobId)
        .toArray();
      
      console.log(`✅ [API] Found ${responses.length} responses`);
      return { responses };
    } catch (err) {
      console.error("❌ [API] Failed to fetch responses:", err);
      return { responses: [] };
    }
  });
}
