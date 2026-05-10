import { describe ,it ,expect, beforeEach} from "vitest";
import { InMemoryDatabase } from "../../../infrastructure/repositories/in-memory-database.js";
import { CreateJobUsecase } from "./create-job.usecase.js";
import { UuidGenerator } from "../../../infrastructure/uuidGenerator/uuid-generator.js";
import { CreateJobInput } from "./create-job.dto.js";
import { Job } from "../../../domain/entities/job.entity.js";

describe("CreateJobUsecase test", () => {
    let repository: InMemoryDatabase;
    let idGenerator: UuidGenerator;
    let createUsecase: CreateJobUsecase;

    const validInput: CreateJobInput = {
        company: "OpenAI",
        location: "Kathmandu",
        position: "Senior Dev",
        skills: ["NodeJs", "Python"],
        applyUrl: "https://apply.com",
        salary: 3333,
    };

    beforeEach(() => {
        repository = new InMemoryDatabase();
        idGenerator = new UuidGenerator();

        createUsecase = new CreateJobUsecase({
            repository,
            idGenerator,
        });
    });

    describe("success cases", () => {
        it("should create job successfully", async () => {
            const result = await createUsecase.execute(validInput);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.company).toBe(validInput.company);
                expect(result.data.location).toBe(validInput.location);
                expect(result.data.position).toBe(validInput.position);
                expect(result.data.skills).toEqual(validInput.skills);
                expect(result.data.applyUrl).toBe(validInput.applyUrl);
                expect(result.data.salary).toBe(validInput.salary);
                expect(result.data.createdAt).toBeDefined();
                expect(result.data.jobId).toBeDefined();
            }
        });

        it("should saved job in repository", async () => {
            await createUsecase.execute(validInput);

            const jobs = await repository.getAll();
            expect(jobs.length).toBe(1);
            const jobObj = jobs[0];
            expect(jobObj).toBeInstanceOf(Job);

        });
    });

    describe("validation cases", () => {
        it.each([
            ["company", ""],
            ["location", ""],
            ["position", ""],
            ["skills", []],
            ["applyUrl", "invalid-url"],
            ["salary", -1],
        ])("should fail when %s is invalid", async (field, value) => {
            const input = {
                ...validInput,
                [field]: value,
            };

            const result = await createUsecase.execute(input as CreateJobInput);

            expect(result.success).toBe(false);

            if (!result.success) {
                expect(result.error).toBeDefined();
            }
        });
    });

});
