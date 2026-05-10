import { Job } from "../entities/job.entity.js";
import { JobId } from "../value-objects/job-id.vo.js";

interface JobRepository{
    save(job:Job):Promise<Job>;
    getById(id:JobId):Promise<Job|null>;
    getAll():Promise<Job[]>;
    delete(id:JobId):Promise<boolean>;
}

export {JobRepository};
