CREATE TYPE "public"."report_status_enum" AS ENUM('PENDING', 'REVIEWED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "form_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"reported_by" uuid NOT NULL,
	"reason" text NOT NULL,
	"description" text,
	"status" "report_status_enum" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "form_reports" ADD CONSTRAINT "form_reports_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_reports" ADD CONSTRAINT "form_reports_reported_by_users_id_fk" FOREIGN KEY ("reported_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;