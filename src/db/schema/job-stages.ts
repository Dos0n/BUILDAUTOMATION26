import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { intakeJobs } from './intake-jobs';

export const jobStageStatusEnum = pgEnum('job_stage_status', [
  'pending',
  'running',
  'completed',
  'failed',
]);

export const jobStages = pgTable('job_stages', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => intakeJobs.id).notNull(),
  stage: text('stage').notNull(),
  status: jobStageStatusEnum('status'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  errorMessage: text('error_message'),
});
