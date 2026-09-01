import {
  pgTable,
  uuid,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";
import { usersTable } from "./user";

export const usageTypeEnum = pgEnum("usage_type_enum", [
  "FORM_CREATED",
  "RESPONSE_RECEIVED",
]);

export const usageTrackingTable = pgTable(
  "usage_tracking",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    formId: uuid("form_id")
      .references(() => formsTable.id, { onDelete: "cascade" }),

    usageType: usageTypeEnum("usage_type").notNull(),

    createdAt: timestamp("created_at")
      .defaultNow(),
  }
);
