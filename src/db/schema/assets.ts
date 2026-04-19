import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { intakeJobs } from './intake-jobs';

export const assets = pgTable('assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => intakeJobs.id).notNull(),
  fileName: text('file_name').notNull(),
  fileType: text('file_type'),
  fileUrl: text('file_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
