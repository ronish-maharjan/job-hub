import { Job } from "../../../domain/entities/job.entity.js";
import { JobRepository } from "../../../domain/repositories/job.repository.js";
import { IdGenerator } from "../../../domain/ports/id-generator.js";
import { JobId } from "../../../domain/value-objects/job-id.vo.js";
import {
    Result,
    ok,
    fail
} from "../../../../../shared/result/result.js";
import {
    CreateJobInput,
    CreateJobResponse
} from "./create-job.dto.js";
import { ValidationError } from "../../../../../shared/errors/validation.error.js";

class CreateJobUsecase {

    readonly #jobRepository: JobRepository;
    readonly #idGenerator: IdGenerator;

    constructor({
        repository,
        idGenerator
    }: {
        repository: JobRepository;
        idGenerator: IdGenerator;
    }) {
        this.#jobRepository = repository;
        this.#idGenerator = idGenerator;
    }

    async execute(
        input: CreateJobInput
    ): Promise<Result<CreateJobResponse, ValidationError>> {

        const jobIdResult = JobId.create(
            this.#idGenerator.generate()
        );

        if (!jobIdResult.success) {
            return fail(jobIdResult.error);
        }

        const jobId = jobIdResult.data;

        /**
         * Create domain entity
         */
        const jobResult = Job.create({
            ...input,
            jobId: jobId.getValue()
        });

        if (!jobResult.success) {
            return fail(jobResult.error);
        }

        const job = jobResult.data;

        /**
         * Repository/database layer should enforce uniqueness.
         */

         const savedJob = await this.#jobRepository.save(job);

        return ok<CreateJobResponse>({
            jobId: savedJob.getJobId(),
            company: savedJob.getCompany(),
            location: savedJob.getLocation(),
            position: savedJob.getPosition(),
            skills: savedJob.getSkills(),
            applyUrl: savedJob.getApplyUrl(),
            salary: savedJob.getSalary(),
            createdAt: savedJob.getCreatedAt()
        });
    }
}

export { CreateJobUsecase };
