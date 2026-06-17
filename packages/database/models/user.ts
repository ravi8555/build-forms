import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  fullName: varchar("full_name", { length: 80 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),

  verificationToken: text("verification_token"),
  verificationTokenExpiry: timestamp("verification_token_expiry"),

  profileImageUrl: text("profile_image_url"),

  salt : text('salt'),
  password: text('password'),
  
  passwordResetToken: text("password_reset_token"),
  passwordResetExpiresAt: timestamp("password_reset_expires_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

  googleId: text("google_id").unique(),

  authProvider: varchar("auth_provider", { length: 20 })
  .default("LOCAL")
  .notNull(),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
