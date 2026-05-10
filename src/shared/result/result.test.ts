import { describe,expect,it} from "vitest";
import { fail, ok } from "./result";
import { ValidationError } from "../errors/validation.error";


describe("Result class test",()=>{

    it("Fail should return error",()=>{
        const result = fail(new ValidationError("name"));

        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
    });

    it("ok should return data",()=>{
        const data = {name:"test"};
        const result = ok(data);

        expect(result.success).toBe(true);
        expect(result).toHaveProperty("data");
    });

});
