import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../../shared/result/result.js";

class Salary {
    static readonly NEGOTIABLE = "Negotiable";

    readonly #value: number;

    private constructor(value: number) {
        this.#value = value;
    }

    static create(value?: unknown): Result<Salary, ValidationError> {

        if (value === undefined || value === null) {
            return fail(new ValidationError("Salary"));
        }

        if(typeof value !== "number"|| value < 1){
            return fail(new ValidationError("Salary"));
        }

        return ok(new Salary(value));
    }

    getValue(): number {
        return this.#value;
    }

}

export { Salary };
