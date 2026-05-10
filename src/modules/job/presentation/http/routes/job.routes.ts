import { Router } from "express"
import { JobController } from "../controllers/job.controller.js"
import {
  createJobValidation,
  deleteJobValidation,
} from "../job.validator.js"
import { validate } from "../../../../../shared/middlewares/validate.middleware.js"
import { apiKey } from "../../../../../shared/middlewares/api-key.middleware.js"

function createJobRouter(jobController: JobController): Router {
  const router = Router()

  // GET /api/jobs
  router.get(
    "/",
    apiKey,
    jobController.getAllJobs
  )

  // POST /api/jobs
  router.post(
    "/",
    apiKey,                        // protected
    validate(createJobValidation,"body"),
    jobController.createJob
  )

  // DELETE /api/jobs/:id
  router.delete(
    "/:id",
    apiKey,                        // protected
    validate(deleteJobValidation,"params"),
    jobController.deleteJob
  )

  return router
}

export { createJobRouter }
