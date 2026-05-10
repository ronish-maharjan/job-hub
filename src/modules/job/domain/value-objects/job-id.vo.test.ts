import { describe, expect, it, expectTypeOf} from "vitest";
import { JobId } from "./job-id.vo.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { Result } from "../../../../shared/result/result.js";

describe("job-id-vo test" , ()=>{

    it("Return type should be Result type",()=>{
        const data = " ";
        const result = JobId.create(data);

        expectTypeOf(result).toEqualTypeOf<Result<JobId,ValidationError>>();
    })

    it("should return validation error when pass empty string",()=>{
        const data = " ";

        const result = JobId.create(data);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);
    })


    it("should return validation error when pass wrong data type",()=>{
        const data =1; 

        const result = JobId.create(data);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("should return value when passed proper data",()=>{
        const data = "jobid";

        const result = JobId.create(data);

        expect(result.success).toBe(true);
        expect(result).toHaveProperty("data");

        const value = result.data.getValue()
        expect(value).toBe(data) 

    })


})
