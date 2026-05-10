import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../../shared/result/result.js";

class Skills{
    readonly #value:string[] =[]

    private constructor(value:string[]){
        this.#value = value
    }

    static create(value:unknown):Result<Skills,ValidationError>{
        if(!(Array.isArray(value)) || value.length === 0){
            return fail(new ValidationError("Skills"));
        }

        const isStringArray = value.every((item)=>typeof item === "string" && item.trim().length != 0);

        if(!isStringArray){
            return fail(new ValidationError("Skills"));
        }

        return ok(new Skills(value));

    }

    public getValue():string[]{
        return [...this.#value];
    }
}

export {Skills};
