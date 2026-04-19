import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const intakeJobStatusEnum = pgEnum('intake_job_status', [
  'queued',
  'in_progress',
  'awaiting_review',
  'approved',
  'deployed',
  'failed',
]);

export const intakeJobs = pgTable('intake_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id').references(() => organizations.id).notNull(),
  status: intakeJobStatusEnum('status').default('queued'),
  currentStage: text('current_stage'),
  previewUrl: text('preview_url'),
  liveUrl: text('live_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
