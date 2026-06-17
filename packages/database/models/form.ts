import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const formVisibilityEnum = pgEnum("form_visibility_enum", [
  "DRAFT",
  "PUBLIC",
  "UNLISTED",
]);


export const formsTable = pgTable("forms", {
     id: uuid("id").primaryKey().defaultRandom(),     
     title: varchar("title", { length: 80 }),

     description: text("description"),

    //  isPublished: boolean("is_published").default(false).notNull(),

    visibility: formVisibilityEnum("visibility")
    .default("DRAFT")
    .notNull(),

    theme: varchar("theme", {
  length: 50,
}).default("DEFAULT"),

     createdBy: uuid('created_by').references(()=> usersTable.id),
     createdAt: timestamp("created_at").defaultNow(),
     updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

});
