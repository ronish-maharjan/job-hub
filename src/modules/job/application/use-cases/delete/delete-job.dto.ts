import { NotFoundError } from "../../../../../shared/errors/not-found.error.js";
import { UnexpectedError } from "../../../../../shared/errors/unexpected.error.js";
import { ValidationError } from "../../../../../shared/errors/validation.error.js";
import { Result } from "../../../../../shared/result/result.js";

type DeleteJobInput = string;

type DeleteJobResult = Result<boolean,NotFoundError|ValidationError|UnexpectedError>;

export {DeleteJobInput, DeleteJobResult};
