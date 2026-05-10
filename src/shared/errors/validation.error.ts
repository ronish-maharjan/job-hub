import { BaseError } from "./base.error.js";

class ValidationError extends BaseError{
    readonly code:string = "VALIDATION_FAILED";
    constructor(field:string){
        super(`Validation failed for ${field}`);
    }
};

export {ValidationError};

