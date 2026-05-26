import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  numeric,
  pgEnum,
  unique
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { formsTable } from "./form";

export const fieldTypeEnum = pgEnum('field_type_enum', ['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'YES_NO'])

export const formFieldsTable = pgTable("forms_fields", {
     id: uuid("id").primaryKey().defaultRandom(),     
     
     formId: uuid('form_id').references(()=> formsTable.id),

     label: varchar("label", { length: 100 }).notNull(),
     labelKey: varchar("label_key", { length: 100 }).notNull(),
     placeholder: text("placeholder"),
     isRequired: boolean("is_required").default(false).notNull(),
     description: text("description"),

     index: numeric('index', {scale:2}).notNull(),

     type: fieldTypeEnum('type').notNull(),

     createdAt: timestamp("created_at").defaultNow(),
     updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

},(table)=>{
    return{
        uniqueFormIdAndIndex: unique().on(table.formId, table.index)
    }
});
