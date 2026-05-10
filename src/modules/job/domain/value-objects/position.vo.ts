import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../../shared/result/result.js";


class Position{
    readonly #value:string;

    private constructor(value:string){
       this.#value = value 
    }

    // Factory function 
    static create(value:unknown):Result<Position,ValidationError>{
        if(typeof value !== "string" || value.trim().length === 0){
            return fail(new ValidationError("JobId"));
        }
        return ok(new Position(value));
    }

    getValue():string{
        return this.#value;
    }
}

export {Position};
