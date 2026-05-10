import pino from "pino";
import { env } from "../configs/env.js";

const format = env.ENVIRONMENT =="PRODUCTION"?{level:"info"}:{
    level:"debug",
    transport:{
        target:"pino-pretty"
    }
};
const logger = pino({
    ...format,
    timestamp: pino.stdTimeFunctions.isoTime,
})

export {logger}
