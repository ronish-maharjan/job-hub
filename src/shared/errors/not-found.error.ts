import { BaseError } from "./base.error.js";

class NotFoundError extends BaseError{
    readonly code:string = "NOT_FOUND_ERROR";
    constructor(field:string){
        super(`${field} not found`);
    }
}

export {NotFoundError};
