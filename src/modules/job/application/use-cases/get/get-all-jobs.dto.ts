type GetJob = {
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
    createdAt:Date|undefined,
};

type GetAllJobsResponse = GetJob[];

export{GetAllJobsResponse}; 
