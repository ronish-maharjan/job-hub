import { BaseError } from "./base.error.js";

class UnexpectedError extends BaseError{
    readonly code:string = "UNEXPECTED_ERROR";
    constructor(){
        super("Unexpected error occured");
    }
}

export {UnexpectedError};
