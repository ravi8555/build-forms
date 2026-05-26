CREATE TYPE "public"."form_visibility_enum" AS ENUM('DRAFT', 'PUBLIC', 'UNLISTED');--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "visibility" "form_visibility_enum" DEFAULT 'DRAFT' NOT NULL;