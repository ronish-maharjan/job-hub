import { and, eq } from "drizzle-orm";
import { db } from "../../../../infrastructure/database/index.js";
import { jobs } from "../../../../infrastructure/database/schemas/job.schema.js";
import { Job } from "../../domain/entities/job.entity.js";
import { JobRepository } from "../../domain/repositories/job.repository.js";
import { JobMapper } from "../mappers/job.mapper.js";
import { JobId } from "../../domain/value-objects/job-id.vo.js";

class DrizzleJobRepository implements JobRepository {

    async save(job: Job): Promise<Job> {
        const dbJob = JobMapper.toDB(job);

        const inserted = await db
        .insert(jobs)
        .values(dbJob)
        .returning();

        const row = inserted[0];

        if (!row) {
            throw new Error("Failed to insert job");
        }

        return JobMapper.toDomain(row);
    }

    async getAll(): Promise<Job[]> {
        const rows = await db.select().from(jobs).where(eq(jobs.is_deleted,false));

        return rows.map(JobMapper.toDomain);
    }

    async getById(id: JobId): Promise<Job | null> {
        const jobId = id.getValue()
        const row = await db.select().from(jobs).where(and(eq(jobs.job_id,jobId,),eq(jobs.is_deleted,false)));
        if(row.length === 0){
            return null;
        }
        const job  = JobMapper.toDomain(row[0]);
        return job;
    }


    async delete(jobId: JobId): Promise<boolean> {
        const jobIdToDelete= jobId.getValue();
        const [deletedJob] = await db.update(jobs).set({is_deleted:true}).where(eq(jobs.job_id,jobIdToDelete)).returning();
        return deletedJob !== undefined;
    }
}

export {DrizzleJobRepository};
