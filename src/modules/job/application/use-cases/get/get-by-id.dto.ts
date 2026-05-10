type GetByIdInput = {jobId:string};

type GetByIdResponse = {
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyUrl:string,
    salary:number,
    createdAt?:Date
}

export {GetByIdInput,GetByIdResponse}
