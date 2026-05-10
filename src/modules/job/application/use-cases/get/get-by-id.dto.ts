type GetByIdInput = {jobId:string};

type GetByIdResponse = {
    jobId:string,
    company:string,
    location:string,
    position:string,
    skills:string[],
    applyLink:string,
    salary:number,
    createdAt:Date
}

export {GetByIdInput,GetByIdResponse}
