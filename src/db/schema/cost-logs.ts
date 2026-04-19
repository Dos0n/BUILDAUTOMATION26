import { integer, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { intakeJobs } from './intake-jobs';

export const costLogs = pgTable('cost_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => intakeJobs.id).notNull(),
  stage: text('stage').notNull(),
  model: text('model'),
  inputTokens: integer('input_tokens').default(0),
  outputTokens: integer('output_tokens').default(0),
  estimatedCost: numeric('estimated_cost'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
