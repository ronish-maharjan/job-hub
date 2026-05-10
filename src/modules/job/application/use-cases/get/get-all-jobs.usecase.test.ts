import { beforeEach, describe, expect, expectTypeOf, it } from "vitest";
import { InMemoryDatabase } from "../../../infrastructure/repositories/in-memory-database.js";
import { CreateJobUsecase } from "../create/create-job.usecase.js";
import { UuidGenerator } from "../../../infrastructure/uuidGenerator/uuid-generator.js";
import { CreateJobInput } from "../create/create-job.dto.js";
import { GetAllJobsUsecase } from "./get-all-jobs.usecase.js";
import { GetAllJobsResponse } from "./get-all-jobs.dto.js";

describe("Get all jobs test",()=>{
    let repository: InMemoryDatabase;
    let idGenerator: UuidGenerator;
    let createUsecase: CreateJobUsecase;
    let getAllUsecase:GetAllJobsUsecase; 
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
        getAllUsecase = new GetAllJobsUsecase(repository);

    });

    describe("success test",()=>{
        it("Successfully return array of job", async () => {
            await createUsecase.execute(validInput);
            await createUsecase.execute(validInput);

            const allJobsResult = await getAllUsecase.execute();

            expect(allJobsResult.success).toBe(true);

            if (allJobsResult.success) {
                expect(allJobsResult.data.length).toBe(2);
                expectTypeOf(allJobsResult.data).toEqualTypeOf<GetAllJobsResponse>();
            }
        });
    })

})


