import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core"

export const intakeSubmissions = pgTable("intake_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  referenceNo: text("reference_no").notNull(),
  projectName: text("project_name"),
  clientName: text("client_name"),
  clientEmail: text("client_email"),
  budget: text("budget"),
  features: text("features"),
  teamSize: text("team_size"),
  startDate: text("start_date"),
  notes: text("notes"),
  status: text("status"),
  emailSent: boolean("email_sent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})
