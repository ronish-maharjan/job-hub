import { pgTable, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";

const jobs = pgTable("jobs", {
    job_id: varchar("job_id", { length: 256 }).primaryKey(),
    company: varchar("company", { length: 256 }).notNull(),
    location: varchar("location", { length: 256 }).notNull(),
    position: varchar("position", { length: 256 }).notNull(),
    skills: varchar("skills", { length: 256 }).notNull(),
    salary: integer("salary").notNull(),
    apply_url:varchar("apply_url",{length:256}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    is_deleted: boolean("is_deleted").notNull().default(false),
});

export {jobs}
