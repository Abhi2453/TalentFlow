// candidates.js
function generateNames(count) {
  const first = ["Alice","Bob","Cathy","David","Ellen","Frank","Grace","Hank","Ivy","Jake","Kate","Liam","Mona","Noah","Olive","Paul","Quinn","Rose","Steve","Tina","Uma","Vera","Wade","Xena","Yara","Zane"];
  const last = ["Smith","Johnson","Lee","Clark","Lewis","Walker","Harris","Hall","Allen","Young","King","Hill","Moore","Green","White","Scott","Evans","Price","Baker","Kelly","Frost","Shaw","Grant","Wells","Ford","Lane","Reed","Fox","Page","Parks","Stone","Day","Cole"];
  const names = [];
  for (let i = 0; i < count; ++i) {
    if (i < first.length * last.length) {
      const f = first[i % first.length];
      const l = last[Math.floor(i / first.length) % last.length];
      names.push(`${f} ${l}`);
    } else {
      names.push(`Person${i + 1}`);
    }
  }
  return names;
}

function makeEmail(name, i) {
  return name.toLowerCase().replace(/\s+/g, ".") + i + "@mail.com";
}

function pickStageDist(job) {
  const choices = job.stages.filter(s => s !== "Rejected");
  if (choices.length === 0) return job.stages[job.stages.length - 1];
  return choices[Math.floor(Math.random() * choices.length)];
}

export function initializeCandidates(jobs) {
  if (!Array.isArray(jobs) || jobs.length === 0)
    throw new Error("No jobs provided for generating candidates!");

  const names = generateNames(1000);

  return Array.from({ length: 1000 }).map((_, i) => {
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const name = names[i];
    const stage = pickStageDist(job);
    const stageIdx = job.stages.indexOf(stage);

    const timeline = job.stages.slice(0, stageIdx + 1).map((s, j, arr) => ({
      stage: s,
      date: Date.now() - ((arr.length - j - 1) * Math.floor(Math.random() * 2e7)),
      note: `Seeded to ${s}`
    }));

    return {
      id: `cand-${i + 1}`,
      name,
      email: makeEmail(name, i),
      stage,
      jobId: job.id,
      jobTitle: job.title,
      timeline
    };
  });
}
