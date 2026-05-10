import { describe, expectTypeOf ,it,expect} from "vitest";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { Result } from "../../../../shared/result/result.js";
import { ApplyUrl } from "./apply-url.js";

describe("ApplyUrl vo test",()=>{

    it("Return type should be Result",()=>{
        const input = "";

        const result = ApplyUrl.create(input);

        expectTypeOf(result).toEqualTypeOf<Result<ApplyUrl,ValidationError>>();
    })

    it("empty string as url should not be accepted",()=>{
        const input = " ";

        const result = ApplyUrl.create(input);

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ValidationError);
    })

    it("should return input as value",()=>{

        const input = "http://test.com";

        const result = ApplyUrl.create(input);

        expect(result.success).toBe(true);
        const value = result.data.getValue();
        expect(value).toBe(input);
    })
});
