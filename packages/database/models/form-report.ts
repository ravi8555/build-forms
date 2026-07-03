import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";
import { usersTable } from "./user";

export const reportStatusEnum = pgEnum(
  "report_status_enum",
  [
    "PENDING",
    "REVIEWED",
    "REJECTED",
  ]
);

export const formReportsTable = pgTable(
  "form_reports",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    formId: uuid("form_id")
      .references(() => formsTable.id)
      .notNull(),

    reportedBy: uuid("reported_by")
      .references(() => usersTable.id)
      .notNull(),

    reason: text("reason").notNull(),

    description: text("description"),

    status: reportStatusEnum("status")
      .default("PENDING")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date()),
  }
);
