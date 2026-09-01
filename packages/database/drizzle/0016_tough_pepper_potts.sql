ALTER TYPE "public"."field_type_enum" ADD VALUE 'OPTION';--> statement-breakpoint
ALTER TABLE "forms_fields" ADD COLUMN "options" json;