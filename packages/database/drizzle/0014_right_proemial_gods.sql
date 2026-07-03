CREATE TYPE "public"."role_visibility_enum" AS ENUM('USER', 'SUPER_ADMIN');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role_visibility_enum" DEFAULT 'USER' NOT NULL;