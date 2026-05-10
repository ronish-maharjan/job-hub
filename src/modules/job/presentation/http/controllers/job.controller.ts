import { Request,Response,NextFunction } from "express";    
import { CreateJobUsecase } from "../../../application/use-cases/create/create-job.usecase.js";
import { GetAllJobsUsecase } from "../../../application/use-cases/get/get-all-jobs.usecase.js";
import { CreateJobInput } from "../../../application/use-cases/create/create-job.dto.js";
import { DeleteJobUsecase } from "../../../application/use-cases/delete/delete-job.usecase.js";

class JobController {
    readonly #createJobUsecase:CreateJobUsecase;
    readonly #getAllJobsUsecase:GetAllJobsUsecase;
    readonly #deleteJobUsecase:DeleteJobUsecase;

    constructor({createJobUsecase,getAllJobsUsecase,deleteJobUsecase}:{createJobUsecase:CreateJobUsecase,getAllJobsUsecase:GetAllJobsUsecase,deleteJobUsecase:DeleteJobUsecase}){
        this.#createJobUsecase = createJobUsecase;
        this.#getAllJobsUsecase = getAllJobsUsecase;
        this.#deleteJobUsecase = deleteJobUsecase;
    }

    // Handle job posting
    public createJob = async (req:Request,res:Response,next:NextFunction)=>{
        const {company,location,position,skills,applyUrl,salary} = req.body;
        try{
            const createJobInput:CreateJobInput = {company,location,position,skills,applyUrl,salary};
            const createResult = await this.#createJobUsecase.execute(createJobInput);
            if(!createResult.success){
                throw createResult.error;
            }
            return res.status(201).json(createResult);
        }catch(e){
            next(e);
        }
    }

    //Get all jobs
    public getAllJobs = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const allJobsResult = await this.#getAllJobsUsecase.execute();
            if(!allJobsResult.success){
                throw allJobsResult.error;
            }
            return res.status(200).json(allJobsResult)
        }catch(e){
            next(e);
        }
    }

    public deleteJob = async (req:Request,res:Response,next:NextFunction)=>{
       try{
            const {jobId}  = req.body;
            const deleteJobResult = await this.#deleteJobUsecase.execute(jobId);
            if(!deleteJobResult.success)throw deleteJobResult.error;
            return res.status(200).json(deleteJobResult);
       } catch(e){
            next(e)
       }
    }
}

export {JobController};
