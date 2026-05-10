import {z} from "zod"
import dotenv from "dotenv"

dotenv.config();

const envSchema = z.object({
    ENVIRONMENT:z.string(),
    DATABASE_URL:z.string(),
    PORT: z.coerce.number().default(3000), 
    API_KEY:z.string().min(10,{message:"should be atleast of 10 character"}),
})

const parsedData = envSchema.safeParse(process.env)

if(!parsedData.success){
    process.exit(1);
}
const env = parsedData.data;

export {env};
