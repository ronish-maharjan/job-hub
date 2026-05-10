import { JobRepository } from "../../../domain/repositories/job.repository.js";
import { JobId } from "../../../domain/value-objects/job-id.vo.js";
import { DeleteJobInput, DeleteJobResult } from "./delete-job.dto.js";
import { ValidationError } from "../../../../../shared/errors/validation.error.js";
import { NotFoundError } from "../../../../../shared/errors/not-found.error.js";
import { ok,fail } from "../../../../../shared/result/result.js";
import { UnexpectedError } from "../../../../../shared/errors/unexpected.error.js";

class DeleteJobUsecase{
    readonly #repository:JobRepository;

    constructor (repository:JobRepository){
        this.#repository = repository;
    }

    async execute(input:DeleteJobInput):Promise<DeleteJobResult>{
        const jobIdVo = JobId.create(input);
        if(!jobIdVo.success)return fail(new ValidationError("JobId"));
        const job = await this.#repository.getById(jobIdVo.data);
        if(!job)return fail(new NotFoundError("Job"));
        const isDeleted = await this.#repository.delete(jobIdVo.data);
        if(!isDeleted)return fail(new UnexpectedError());
        return ok(isDeleted)
    }
}

export {DeleteJobUsecase};
