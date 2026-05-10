import { Router } from "express"
import { DrizzleJobRepository } from "./infrastructure/repositories/drizzle-job.repository.js"
import { UuidGenerator } from "./infrastructure/uuidGenerator/uuid-generator.js"
import { CreateJobUsecase } from "./application/use-cases/create/create-job.usecase.js"
import { GetAllJobsUsecase } from "./application/use-cases/get/get-all-jobs.usecase.js"
import { DeleteJobUsecase } from "./application/use-cases/delete/delete-job.usecase.js"
import { JobController } from "./presentation/http/controllers/job.controller.js"
import { createJobRouter } from "./presentation/http/routes/job.routes.js"

interface JobModuleResult {
  router: Router
}

function createJobModule(): JobModuleResult {
  // Infrastructure
  const jobRepository = new DrizzleJobRepository();
  const idGenerator = new UuidGenerator();

  // Use Cases
  const createJobUsecase = new CreateJobUsecase({repository:jobRepository,idGenerator});
  const getAllJobsUsecase = new GetAllJobsUsecase(jobRepository)
  const deleteJobUsecase = new DeleteJobUsecase(jobRepository)

  // Controller
  const jobController = new JobController({
    createJobUsecase,
    getAllJobsUsecase,
    deleteJobUsecase,
  })

  // Router
  const router = createJobRouter(jobController)

  return { router }
}

export { createJobModule }
