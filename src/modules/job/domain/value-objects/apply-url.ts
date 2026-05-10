import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail,ok,Result } from "../../../../shared/result/result.js";

class ApplyUrl{
    readonly #value:string;

    private constructor(value:string){
        this.#value = value;
    }

    static create(value:unknown):Result<ApplyUrl,ValidationError>{
        
        if(typeof value !== "string" || value.trim().length === 0){
            return fail(new ValidationError("ApplyUrl"));
        }
        // We can improve this but the zod on the middlewares can also validate proper url so 
        const urlRegex:RegExp = /^(http|https):\/\/.*/

        if(!urlRegex.test(value)){
            return fail(new ValidationError("ApplyUrl"));
        }
        return ok(new ApplyUrl(value));
    }

    public getValue():string{
        return this.#value;
    }

}

export {ApplyUrl};
