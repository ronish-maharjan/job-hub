import z from "zod"

const createJobValidation = z.object({
    company: z.string().min(1, "Company required"),
    position: z.string().min(1, "Position required"),
    skills: z.array(z.string()).min(1, "At least one skill"),
    salary: z.number().positive(),
    location: z.string().min(1, "Location required"),
    applyUrl: z.string().url("Must be valid URL"),
});

const deleteJobValidation = z.object({
    jobId:z.string().min(1,"job id required"),
})

export {createJobValidation,deleteJobValidation};
