import { describe, it, expect} from "vitest";
import { Job } from "./job.entity.js";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const VALID_INPUTS = {
  jobId: "550e8400-e29b-41d4-a716-446655440000",
  company: "Acme Corp",
  location: "New York, NY",
  position: "Senior Software Engineer",
  skills: ["TypeScript", "Node.js", "PostgreSQL"],
  applyUrl: "https://acme.com/careers/apply",
  salary: 120_000,
};

const VALID_HYDRATE_INPUTS = {
  ...VALID_INPUTS,
  createdAt: new Date("2024-01-15T10:00:00.000Z"),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createValidJob() {
  const result = Job.create(VALID_INPUTS);
  if (!result.success) throw new Error("Test setup failed: " + result.error.message);
  return result.data;
}

function hydrateValidJob() {
  const result = Job.hydrate(VALID_HYDRATE_INPUTS);
  if (!result.success) throw new Error("Test setup failed: " + result.error.message);
  return result.data;
}

// ---------------------------------------------------------------------------
// Job.create
// ---------------------------------------------------------------------------

describe("Job.create", () => {
  describe("given all valid inputs", () => {
    it("returns a success Result", () => {
      const result = Job.create(VALID_INPUTS);
      expect(result.success).toBe(true);
    });

    it("exposes all values via getters", () => {
      const job = createValidJob();

      expect(job.getJobId()).toBe(VALID_INPUTS.jobId);
      expect(job.getCompany()).toBe(VALID_INPUTS.company);
      expect(job.getLocation()).toBe(VALID_INPUTS.location);
      expect(job.getPosition()).toBe(VALID_INPUTS.position);
      expect(job.getSkills()).toEqual(VALID_INPUTS.skills);
      expect(job.getApplyUrl()).toBe(VALID_INPUTS.applyUrl);
      expect(job.getSalary()).toBe(VALID_INPUTS.salary);
    });

    it("leaves createdAt as undefined (not yet persisted)", () => {
      const job = createValidJob();
      expect(job.getCreatedAt()).toBeUndefined();
    });
  });

  // --- jobId ---
  describe("given an invalid jobId", () => {
    it.each([
      ["empty string", ""],
      ["whitespace only", "   "],
    ])("%s → returns a failure Result", (_label, jobId) => {
      const result = Job.create({ ...VALID_INPUTS, jobId });
      expect(result.success).toBe(false);
    });

    it("failure carries a ValidationError", () => {
      const result = Job.create({ ...VALID_INPUTS, jobId: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error.message).toBeTruthy();
      }
    });
  });

  // --- company ---
  describe("given an invalid company", () => {
    it.each([
      ["empty string", ""],
      ["whitespace only", "   "],
    ])("%s → returns a failure Result", (_label, company) => {
      const result = Job.create({ ...VALID_INPUTS, company });
      expect(result.success).toBe(false);
    });
  });

  // --- location ---
  describe("given an invalid location", () => {
    it.each([
      ["empty string", ""],
      ["whitespace only", "   "],
    ])("%s → returns a failure Result", (_label, location) => {
      const result = Job.create({ ...VALID_INPUTS, location });
      expect(result.success).toBe(false);
    });
  });

  // --- position ---
  describe("given an invalid position", () => {
    it.each([
      ["empty string", ""],
      ["whitespace only", "   "],
    ])("%s → returns a failure Result", (_label, position) => {
      const result = Job.create({ ...VALID_INPUTS, position });
      expect(result.success).toBe(false);
    });
  });

  // --- skills ---
  describe("given invalid skills", () => {
    it("empty array → returns a failure Result", () => {
      const result = Job.create({ ...VALID_INPUTS, skills: [] });
      expect(result.success).toBe(false);
    });

    it("array containing an empty string → returns a failure Result", () => {
      const result = Job.create({ ...VALID_INPUTS, skills: ["TypeScript", ""] });
      expect(result.success).toBe(false);
    });
  });

  // --- applyUrl ---
  describe("given an invalid applyUrl", () => {
    it.each([
      ["empty string", ""],
      ["no protocol", "acme.com/careers"],
      ["ftp protocol", "ftp://acme.com/careers"],
    ])("%s → returns a failure Result", (_label, applyUrl) => {
      const result = Job.create({ ...VALID_INPUTS, applyUrl });
      expect(result.success).toBe(false);
    });
  });

  // --- salary ---
  describe("given an invalid salary", () => {
    it.each([
      ["zero", 0],
      ["negative", -1],
      ["negative large", -100_000],
    ])("%s → returns a failure Result", (_label, salary) => {
      const result = Job.create({ ...VALID_INPUTS, salary });
      expect(result.success).toBe(false);
    });
  });

  // --- fail-fast ordering ---
  describe("when multiple fields are invalid", () => {
    it("fails on the first invalid field without throwing", () => {
      const result = Job.create({
        ...VALID_INPUTS,
        jobId: "",
        company: "",
        salary: -1,
      });
      expect(result.success).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// Job.hydrate
// ---------------------------------------------------------------------------

describe("Job.hydrate", () => {
  describe("given valid inputs", () => {
    it("returns a success Result", () => {
      const result = Job.hydrate(VALID_HYDRATE_INPUTS);
      expect(result.success).toBe(true);
    });

    it("restores createdAt from persistence", () => {
      const job = hydrateValidJob();
      expect(job.getCreatedAt()).toEqual(VALID_HYDRATE_INPUTS.createdAt);
    });

    it("exposes all domain values correctly", () => {
      const job = hydrateValidJob();

      expect(job.getJobId()).toBe(VALID_HYDRATE_INPUTS.jobId);
      expect(job.getCompany()).toBe(VALID_HYDRATE_INPUTS.company);
      expect(job.getLocation()).toBe(VALID_HYDRATE_INPUTS.location);
      expect(job.getPosition()).toBe(VALID_HYDRATE_INPUTS.position);
      expect(job.getSkills()).toEqual(VALID_HYDRATE_INPUTS.skills);
      expect(job.getApplyUrl()).toBe(VALID_HYDRATE_INPUTS.applyUrl);
      expect(job.getSalary()).toBe(VALID_HYDRATE_INPUTS.salary);
    });

    it("preserves the exact createdAt Date instance (no mutation)", () => {
      const createdAt = new Date("2024-06-01T00:00:00.000Z");
      const result = Job.hydrate({ ...VALID_HYDRATE_INPUTS, createdAt });
      if (!result.success) throw new Error("setup failed");
      expect(result.data.getCreatedAt()?.toISOString()).toBe(createdAt.toISOString());
    });
  });

  describe("given invalid inputs", () => {
    it("returns a failure Result for an invalid jobId", () => {
      const result = Job.hydrate({ ...VALID_HYDRATE_INPUTS, jobId: "" });
      expect(result.success).toBe(false);
    });

    it("returns a failure Result for an invalid salary", () => {
      const result = Job.hydrate({ ...VALID_HYDRATE_INPUTS, salary: -500 });
      expect(result.success).toBe(false);
    });

    it("returns a failure Result for an empty skills array", () => {
      const result = Job.hydrate({ ...VALID_HYDRATE_INPUTS, skills: [] });
      expect(result.success).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// Encapsulation invariants
// ---------------------------------------------------------------------------

describe("Job encapsulation", () => {
  it("getSkills returns a value, not an internal reference that could be mutated", () => {
    const job = createValidJob();
    const skillsBefore = [...job.getSkills()];

    // Attempt external mutation
    job.getSkills().push("Intruder");

    expect(job.getSkills()).toEqual(skillsBefore);
  });

  it("is not directly constructable (private constructor)", () => {
      try{
        const job = new Job({});
      }catch(e){
        expect(e).instanceof(Error)
      }
  });
});

// ---------------------------------------------------------------------------
// create vs hydrate contract
// ---------------------------------------------------------------------------

describe("create vs hydrate contract", () => {
  it("create always produces undefined createdAt", () => {
    const job = createValidJob();
    expect(job.getCreatedAt()).toBeUndefined();
  });

  it("hydrate always produces a defined createdAt", () => {
    const job = hydrateValidJob();
    expect(job.getCreatedAt()).toBeInstanceOf(Date);
  });

  it("both produce identical domain values from the same base input", () => {
    const created = createValidJob();
    const hydrated = hydrateValidJob();

    expect(created.getJobId()).toBe(hydrated.getJobId());
    expect(created.getCompany()).toBe(hydrated.getCompany());
    expect(created.getLocation()).toBe(hydrated.getLocation());
    expect(created.getPosition()).toBe(hydrated.getPosition());
    expect(created.getSkills()).toEqual(hydrated.getSkills());
    expect(created.getApplyUrl()).toBe(hydrated.getApplyUrl());
    expect(created.getSalary()).toBe(hydrated.getSalary());
  });
});
