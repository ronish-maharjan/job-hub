import { IdGenerator } from "../../domain/ports/id-generator.js";
import {v4 as uuidV4} from "uuid"

class UuidGenerator implements IdGenerator{

    generate():string{
       const uuid = uuidV4(); 
       return uuid;
    }
}

export {UuidGenerator};
