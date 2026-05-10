interface JobRecord{
    job_id:string;
    company:string;
    location:string;
    position:string;
    skills:string;
    apply_url:string;
    salary:number;
    is_deleted:boolean;
    created_at:Date;
}

export{JobRecord};
