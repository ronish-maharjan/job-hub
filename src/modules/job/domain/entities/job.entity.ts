import { Company } from "../value-objects/company.vo.js";
import { Skills } from "../value-objects/skills.vo.js";
import { JobId } from "../value-objects/job-id.vo.js";
import { Salary } from "../value-objects/salary.vo.js";
import { ApplyUrl } from "../value-objects/apply-url.js";
import { Location } from "../value-objects/location.vo.js";
import { Position } from "../value-objects/position.vo.js";
import { ok,fail,type Result } from "../../../../shared/result/result.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";

type JobCreationInputs = {
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
}

type jobHydrateInputs = JobCreationInputs & {createdAt:Date}

class Job {
    readonly #jobId:JobId;
    #company:Company;
    #location:Location;
    #position:Position;
    #skills:Skills;
    #applyUrl:ApplyUrl;
    #salary:Salary;
    readonly #createdAt:Date|undefined;

    private constructor({jobId,company,location,position,skills,applyUrl,salary,createdAt}:{jobId:JobId,company:Company,location:Location,position:Position,skills:Skills,applyUrl:ApplyUrl,salary:Salary,createdAt:Date|undefined}){
        this.#jobId = jobId;
        this.#company = company;
        this.#location = location;
        this.#position = position;
        this.#skills = skills;
        this.#applyUrl = applyUrl;
        this.#salary = salary;
        if(!createdAt){
            this.#createdAt = undefined;
        }else{
            this.#createdAt = createdAt;
        }
    }

    static create(input:JobCreationInputs):Result<Job,ValidationError>{

        // Validate each VO
        const jobIdResult = JobId.create(input.jobId);
        if (!jobIdResult.success) return fail(jobIdResult.error);
        const jobId = jobIdResult.data;

        const companyResult = Company.create(input.company);
        if (!companyResult.success) return fail(companyResult.error);
        const company = companyResult.data;

        const locationResult = Location.create(input.location);
        if(!locationResult.success)return fail(locationResult.error);
        const location = locationResult.data;

        const positionResult = Position.create(input.position);
        if (!positionResult.success) return fail(positionResult.error);
        const position = positionResult.data;

        const skillsResult = Skills.create(input.skills);
        if (!skillsResult.success) return fail(skillsResult.error);
        const skills = skillsResult.data;

        const applyUrlResult = ApplyUrl.create(input.applyUrl);
        if (!applyUrlResult.success) return fail(applyUrlResult.error);
        const applyUrl = applyUrlResult.data;

        const salaryResult = Salary.create(input.salary);
        if (!salaryResult.success) return fail(salaryResult.error);
        const salary = salaryResult.data;

        const createdAt = undefined

        return ok(new Job({jobId,company,location,position,skills,applyUrl,salary,createdAt}))
    }


    // Hydrate function 

    static hydrate(input:jobHydrateInputs):Result<Job,ValidationError>{
        // Validate each VO
        const jobIdResult = JobId.create(input.jobId);
        console.log(jobIdResult.success);
        if (!jobIdResult.success) return fail(jobIdResult.error);
        const jobId = jobIdResult.data;

        const companyResult = Company.create(input.company);
        if (!companyResult.success) return fail(companyResult.error);
        const company = companyResult.data;

        const locationResult = Location.create(input.location);
        if(!locationResult.success)return fail(locationResult.error);
        const location = locationResult.data;

        const positionResult = Position.create(input.position);
        if (!positionResult.success) return fail(positionResult.error);
        const position = positionResult.data;

        const skillsResult = Skills.create(input.skills);
        if (!skillsResult.success) return fail(skillsResult.error);
        const skills = skillsResult.data;

        const applyUrlResult = ApplyUrl.create(input.applyUrl);
        if (!applyUrlResult.success) return fail(applyUrlResult.error);
        const applyUrl = applyUrlResult.data;

        const salaryResult = Salary.create(input.salary);
        if (!salaryResult.success) return fail(salaryResult.error);
        const salary = salaryResult.data;

        const createdAt:Date = input.createdAt;

        return ok(new Job({jobId,company,location,position,skills,applyUrl,salary,createdAt}))

    }
    // Getters
    getJobId(): string {
        return this.#jobId.getValue();
    }

    getCompany(): string {
        return this.#company.getValue();
    }

    getLocation(): string {
        return this.#location.getValue();
    }

    getPosition(): string {
        return this.#position.getValue();
    }

    getSkills(): string[] {
        return this.#skills.getValue();
    }

    getApplyUrl(): string {
        return this.#applyUrl.getValue();
    }

    getSalary(): number {
        return this.#salary.getValue();
    }

    getCreatedAt():Date|undefined {
        return this.#createdAt;
    }
}

export {Job};
