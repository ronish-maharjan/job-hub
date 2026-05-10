import { Job } from "../../domain/entities/job.entity.js";
import { JobRepository } from "../../domain/repositories/job.repository.js";
import { JobId } from "../../domain/value-objects/job-id.vo.js";

type Db={
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
    createdAt:Date
}

class InMemoryDatabase implements JobRepository{

    #database:Db[] = [];

    async save(job:Job){
        const dbData: Db = {
            jobId: job.getJobId(),
            company: job.getCompany(),
            location: job.getLocation(),
            position: job.getPosition(),
            applyUrl: job.getApplyUrl(),
            skills: job.getSkills(),
            salary: job.getSalary(),
            createdAt: new Date(), 
        };
        this.#database.push(dbData);
        const jobVo = Job.hydrate(dbData);
        if(!jobVo.success){
            throw jobVo.error;
        }
        return jobVo.data;

    }

    async getById(jobId:JobId){
        const searchedId= jobId.getValue()
        const jobObj = this.#database.find((obj)=>obj.jobId === searchedId);

        if(!jobObj){
            return null;
        }else{
            const job = Job.hydrate(jobObj);
            if(!job.success){
                throw job.error;
            }
            return job.data;
        }
    }
    async getAll():Promise<Job[]>{
        if(this.#database.length ===0){
            return [];
        }
        let jobs:Job[] = this.#database.map((obj)=>{ 
            const job = Job.hydrate({
                jobId:obj.jobId,
                company:obj.company,
                location:obj.location,
                position:obj.position,
                skills:obj.skills,
                applyUrl:obj.applyUrl,
                salary:obj.salary,
                createdAt:obj.createdAt});
            if(!job.success){
                 throw job.error;
            }
            return job.data;

        })
        return jobs;
    }
    async delete():Promise<boolean>{
        return true;
    }
};

export {InMemoryDatabase};
