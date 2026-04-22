import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { intakeJobs } from './intake-jobs';
import { users } from './users';

export const deployments = pgTable('deployments', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => intakeJobs.id).notNull().unique(),
  liveUrl: text('live_url').notNull(),
  deployedAt: timestamp('deployed_at').defaultNow(),
  deployedBy: uuid('deployed_by').references(() => users.id),
  totalCost: numeric('total_cost'),
});
