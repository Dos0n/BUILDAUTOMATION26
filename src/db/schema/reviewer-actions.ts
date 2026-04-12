import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { intakeJobs } from './intake-jobs';
import { users } from './users';

export const reviewerActionEnum = pgEnum('reviewer_action', ['approved', 'rejected']);

export const reviewerActions = pgTable('reviewer_actions', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => intakeJobs.id).notNull(),
  reviewerId: uuid('reviewer_id').references(() => users.id).notNull(),
  action: reviewerActionEnum('action').notNull(),
  feedback: text('feedback'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
