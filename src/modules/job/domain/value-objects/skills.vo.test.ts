import {describe,expect,expectTypeOf,it} from "vitest";
import { Skills } from "./skills.vo.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { Result } from "../../../../shared/result/result.js";

describe("Skill vo test",()=>{

    it("Return should be of Result type",()=>{
        const skill = ["nodeJs"];

        const result = Skills.create(skill);

        expectTypeOf(result).toEqualTypeOf<Result<Skills,ValidationError>>;

    })

    it("should throw validation error on empty array",()=>{
        const input = "invalidtype"

        const result = Skills.create(input);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("should throw validation error on empty array",()=>{
        const input:string[] = []; 

        const result = Skills.create(input);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("should throw validation error when wrong type array",()=>{

        const input:number[] = [1,2,3]; 

        const result = Skills.create(input);

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);

    })

    it("empty string inside the array should not be accepted",()=>{
        const input:string[] = [" "];

        const result = Skills.create(input);
            
        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("value should be exact as  valid input",()=>{

        const input:string[] = ["nodejs","python"]; 

        const result = Skills.create(input);

        expect(result.success).toBe(true);
        expect(result).toHaveProperty("data");

        const value = result.data.getValue();
        expect(value).toEqual(input);

    })

})
