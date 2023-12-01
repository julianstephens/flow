DROP INDEX IF EXISTS "userId_idx";--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "provider" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "providerAccountId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "token_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "scope" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."account" ALTER COLUMN "session_state" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."session" ALTER COLUMN "sessionToken" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."user" ALTER COLUMN "emailVerified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "flow_schema"."user" ALTER COLUMN "image" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."verificationToken" ALTER COLUMN "identifier" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flow_schema"."verificationToken" ALTER COLUMN "token" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_schema"."account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "flow_schema"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_schema"."session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "flow_schema"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
