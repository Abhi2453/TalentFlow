import { Response } from "miragejs";
import { db } from "../../data/db";

export function candidatesRoutes() {
  // GET /candidates?search=&stage=&jobId=&page=
  this.get("/candidates", (schema, request) => {
    const { search = "", stage = "", jobId = "", page = "1", pageSize = "50" } =
      request.queryParams;

    let candidates = schema.candidates.all().models;

    // Apply search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      candidates = candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.email.toLowerCase().includes(lower)
      );
    }

    // Apply stage filter
    if (stage.trim()) {
      candidates = candidates.filter((c) => c.stage === stage);
    }

    // Apply jobId filter
    if (jobId.trim()) {
      candidates = candidates.filter((c) => c.jobId === jobId);
    }

    const total = candidates.length;
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);
    const start = (pageNum - 1) * pageSizeNum;
    const pageData = candidates.slice(start, start + pageSizeNum);

    return {
      candidates: pageData.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        stage: c.stage,
        jobId: c.jobId,
        jobTitle: c.jobTitle,
        timeline: c.timeline,
      })),
      total,
    };
  });

  // GET /candidates/:id
  this.get("/candidates/:id", (schema, request) => {
    const id = request.params.id;
    const candidate = schema.candidates.find(id);
    if (!candidate) return new Response(404, {}, { error: "Not found" });
    return candidate.attrs;
  });

  // POST /candidates
  this.post("/candidates", async (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    attrs.id = `cand-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    attrs.stage = attrs.stage || "applied";

    let candidate = schema.candidates.create(attrs);
    await db.candidates.put(candidate.attrs);

    await db.timelines.add({
      candidateId: candidate.id,
      stage: attrs.stage,
      date: Date.now(),
      note: `Created at ${attrs.stage}`,
    });

    return candidate.attrs;
  });

  // PATCH /candidates/:id
  this.patch("/candidates/:id", async (schema, request) => {
    let id = request.params.id;
    let attrs = JSON.parse(request.requestBody);
    let c = schema.candidates.find(id);

    if (!c) return new Response(404, {}, { error: "Not found" });

    const oldStage = c.stage;
    c.update(attrs);
    await db.candidates.put(c.attrs);

    if (attrs.stage && attrs.stage !== oldStage) {
      await db.timelines.add({
        candidateId: c.id,
        stage: attrs.stage,
        date: Date.now(),
        note: `Moved from ${oldStage} to ${attrs.stage}`,
      });
    }

    return c.attrs;
  });

  // GET /candidates/:id/timeline
  this.get("/candidates/:id/timeline", async (schema, request) => {
    const cid = request.params.id;
    const timeline = await db.timelines
      .where("candidateId")
      .equals(cid)
      .sortBy("date");
    return { timeline };
  });

  // GET /candidates/:id/notes
  this.get("/candidates/:id/notes", async (schema, request) => {
    const cid = request.params.id;
    const notes = await db.notes
      .where("candidateId")
      .equals(cid)
      .sortBy("date");
    return { notes };
  });

  // POST /candidates/:id/notes
  this.post("/candidates/:id/notes", async (schema, request) => {
    const cid = request.params.id;
    let attrs = JSON.parse(request.requestBody);
    attrs.candidateId = cid;
    attrs.date = attrs.date || Date.now();
    await db.notes.add(attrs);
    return { ok: true };
  });

  // ✅ POST /candidates/:id/rejection-note
  this.post("/candidates/:id/rejection-note", (schema, request) => {
    const cid = request.params.id;
    const { note } = JSON.parse(request.requestBody);
    console.log(`Rejection note received for ${cid}:`, note);
    return { ok: true, message: "Rejection note received successfully" };
  });
}
