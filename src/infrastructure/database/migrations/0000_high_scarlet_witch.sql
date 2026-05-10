CREATE TABLE "job" (
	"job_id" varchar(256) PRIMARY KEY NOT NULL,
	"company" varchar(256) NOT NULL,
	"location" varchar(256) NOT NULL,
	"position" varchar(256) NOT NULL,
	"skills" varchar(256) NOT NULL,
	"salary" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL
);
