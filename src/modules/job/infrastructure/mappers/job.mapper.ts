import { Job } from "../../domain/entities/job.entity.js";
import { JobRecord } from "./job.record.js";

class JobMapper {

    static toDB(job:Job){
        const skillsArray = job.getSkills()
        const skillsString = skillsArray.join(" ")
        const formattedData = {job_id:job.getJobId(),company:job.getCompany(),location:job.getLocation(),position:job.getPosition(),skills:skillsString,salary:job.getSalary(),apply_url:job.getApplyUrl()}
        return formattedData;
    }

    // convert from db to domain entity
    static toDomain(raw:JobRecord){
        const skillsInString = raw.skills;
        const skillsInArray = skillsInString.split(" ")
        const formattedData = {jobId:raw.job_id,company:raw.company,location:raw.location,position:raw.position,skills:skillsInArray,salary:raw.salary,applyUrl:raw.apply_url,createdAt:raw.created_At};
        const jobResult = Job.hydrate(formattedData);
        if(!jobResult.success)throw jobResult.error;
        return jobResult.data;
    }
}

export {JobMapper};
