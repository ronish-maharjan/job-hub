import { Job } from "../../../domain/entities/job.entity.js";
import { JobRepository } from "../../../domain/repositories/job.repository.js";
import { ValidationError } from "../../../../../shared/errors/validation.error.js";
import { ok, Result } from "../../../../../shared/result/result.js";
import { GetAllJobsResponse } from "./get-all-jobs.dto.js";

class GetAllJobsUsecase{
    readonly #repository:JobRepository;

    constructor(repository:JobRepository){
        this.#repository = repository;
    }
    public async execute():Promise<Result<GetAllJobsResponse,ValidationError>>{
        const jobResult:Job[] = await this.#repository.getAll();

        const jobs:GetAllJobsResponse = jobResult.map((obj)=>{
            return {jobId:obj.getJobId(),company:obj.getCompany(),location:obj.getLocation(),position:obj.getPosition(),skills:obj.getSkills(),applyUrl:obj.getApplyUrl(),salary:obj.getSalary(),createdAt:obj.getCreatedAt()};
        })

        return ok(jobs);
    };
}

export {GetAllJobsUsecase};
