import { JobId } from "../../../domain/value-objects/job-id.vo.js";
import { NotFoundError } from "../../../../../shared/errors/not-found.error.js";
import { GetByIdInput, GetByIdResponse } from "./get-by-id.dto.js";
import { JobRepository } from "../../../domain/repositories/job.repository.js";
import { Result,ok,fail} from "../../../../../shared/result/result.js";
import { logger } from "../../../../../shared/logger/logger.js";

class GetJobByIdUsecase{
    readonly #repository:JobRepository;

    constructor(repository:JobRepository){
        this.#repository = repository;
    }
    public async execute(input:GetByIdInput):Promise<Result<GetByIdResponse,NotFoundError>>{
        const jobIdResult = JobId.create(input.jobId);
        const getJobByIdLogger = logger.child({context:"GetJobById"})
        if(!jobIdResult.success){
            return fail(jobIdResult.error)
        }
       
        const job = await this.#repository.getById(jobIdResult.data)

        getJobByIdLogger.debug({job},"return job object or other type"); 

        if(!job){
            return fail(new NotFoundError("JobId"));
        }

        const response:GetByIdResponse = {jobId:job.getJobId(),company:job.getCompany(),location:job.getLocation(),position:job.getPosition(),skills:job.getSkills(),applyUrl:job.getApplyUrl(),salary:job.getSalary(),createdAt:job.getCreatedAt()}
        return ok(response);
    }
}

export {GetJobByIdUsecase};
