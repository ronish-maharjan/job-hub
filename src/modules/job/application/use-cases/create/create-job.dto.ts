type CreateJobInput = {
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
}

type CreateJobResponse = {
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
    createdAt:Date|undefined,
}

export {CreateJobResponse,CreateJobInput}
