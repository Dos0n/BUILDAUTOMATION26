import { pgTable, pgEnum, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum("user_role", ["admin", "reviewer", "member"])

export const users = pgTable("users", {
  id:            uuid("id").primaryKey().defaultRandom(),
  name:          text("name"),
  email:         text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date", withTimezone: true }),
  image:         text("image"),
  role:          userRoleEnum("role").notNull().default("member"),
  passwordHash:  text("password_hash"),
  createdAt:     timestamp("created_at").defaultNow().notNull(),
  updatedAt:     timestamp("updated_at").defaultNow().notNull(),
})
