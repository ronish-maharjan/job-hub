import {describe, expect, it } from "vitest"
import { ValidationError } from "./validation.error.js"


describe("Custom Error Tests",()=>{

    it("should throw validation error",()=>{
        const field = "name"

        try{
            throw new ValidationError(field)
        }catch(e){
            expect(e).instanceof(ValidationError);
            if(e instanceof ValidationError){
                expect(e.code).toBe("VALIDATION_FAILED");
                expect(e.message).toBe(`Validation failed for ${field}`);
            }
        }

    })

})
