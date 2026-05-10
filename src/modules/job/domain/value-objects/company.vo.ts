import { ValidationError } from "../../../../shared/errors/validation.error.js";
import {ok,fail, Result} from "../../../../shared/result/result.js";

class Company{
    readonly #value:string;

    private constructor(value:string){
       this.#value = value 
    }

    // Factory function 
    static create(value:unknown):Result<Company,ValidationError>{
        if(typeof value !== "string" || value.trim().length === 0){
            return fail(new ValidationError("JobId"));
        }
        return ok(new Company(value));
    }

    getValue():string{
        return this.#value;
    }
}

export {Company};
