import { ValidationError } from "../../../../shared/errors/validation.error.js";
import {ok,fail, Result} from "../../../../shared/result/result.js";

class JobId{
    readonly #value:string;

    private constructor(value:string){
       this.#value = value 
    }

    // Factory function 

    static create(value:unknown):Result<JobId,ValidationError>{
        if(typeof value !== "string" || value.trim().length === 0){
            return fail(new ValidationError("JobId"));
        }
        return ok(new JobId(value));
    }

    getValue():string{
        return this.#value;
    }
}

export {JobId};
