import { beforeEach, describe, expect, expectTypeOf, it } from "vitest";
import { InMemoryDatabase } from "../../../infrastructure/repositories/in-memory-database.js";
import { CreateJobUsecase } from "../create/create-job.usecase.js";
import { UuidGenerator } from "../../../infrastructure/uuidGenerator/uuid-generator.js";
import { CreateJobInput } from "../create/create-job.dto.js";
import { GetJobByIdUsecase } from "./get-job-by-id.usecase.js";
import { NotFoundError } from "../../../../../shared/errors/not-found.error.js";

describe("Get job by id test",()=>{
    let repository: InMemoryDatabase;
    let idGenerator: UuidGenerator;
    let createUsecase: CreateJobUsecase;
    let getJobByIdUsecase:GetJobByIdUsecase; 
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
        getJobByIdUsecase = new GetJobByIdUsecase(repository);

    });

    describe("success test",()=>{
        it("Successfully return job object", async () => {
            await createUsecase.execute(validInput);
            const job1Result = await createUsecase.execute(validInput);

            if(job1Result.success){
                const id = job1Result.data.jobId; 
                const jobResult = await getJobByIdUsecase.execute({jobId:id});
                expect(jobResult.success).toBe(true);
            }

        });
    })

    describe("Failed test",()=>{
        it("should throw not found errro",async ()=>{
            const id ="fake-id";
            const result = await getJobByIdUsecase.execute({jobId:id});
            expect(result.success).toBe(false);
            expect(result.error).toBeInstanceOf(NotFoundError);
        })
    })

})


