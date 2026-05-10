import { describe, expectTypeOf ,it,expect} from "vitest";
import { Salary } from "./salary.vo.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { Result } from "../../../../shared/result/result.js";

describe("Salary vo test",()=>{

    it("Return type should be Result",()=>{
        const input = "";

        const result = Salary.create(input);

        expectTypeOf(result).toEqualTypeOf<Result<Salary,ValidationError>>();
    })

    it("null should not be allowed",()=>{
        const result = Salary.create();

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("string as salary should not be accepted",()=>{
        const input = " ";

        const result = Salary.create(input);

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("should return input as value",()=>{

        const input = 3333;

        const result = Salary.create(input);

        expect(result.success).toBe(true);
        const value = result.data.getValue();
        expect(value).toBe(input);
    })
});
