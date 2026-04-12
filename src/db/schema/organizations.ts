import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const organizationStatusEnum = pgEnum('organization_status', [
  'prospect',
  'applicant',
  'active',
  'alumni',
]);

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  mission: text('mission'),
  contactEmail: text('contact_email'),
  contactName: text('contact_name'),
  causeArea: text('cause_area'),
  status: organizationStatusEnum('status').default('prospect'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
