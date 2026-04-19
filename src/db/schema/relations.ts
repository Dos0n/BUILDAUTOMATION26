import { relations } from 'drizzle-orm';
import { assets } from './assets';
import { costLogs } from './cost-logs';
import { deployments } from './deployments';
import { intakeJobs } from './intake-jobs';
import { jobStages } from './job-stages';
import { organizations } from './organizations';
import { reviewerActions } from './reviewer-actions';
import { users } from './users';

export const organizationsRelations = relations(organizations, ({ many }) => ({
  intakeJobs: many(intakeJobs),
}));

export const intakeJobsRelations = relations(intakeJobs, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [intakeJobs.orgId],
    references: [organizations.id],
  }),
  jobStages: many(jobStages),
  assets: many(assets),
  costLogs: many(costLogs),
  reviewerActions: many(reviewerActions),
  deployment: one(deployments, {
    fields: [intakeJobs.id],
    references: [deployments.jobId],
  }),
}));

export const jobStagesRelations = relations(jobStages, ({ one }) => ({
  job: one(intakeJobs, {
    fields: [jobStages.jobId],
    references: [intakeJobs.id],
  }),
}));

export const assetsRelations = relations(assets, ({ one }) => ({
  job: one(intakeJobs, {
    fields: [assets.jobId],
    references: [intakeJobs.id],
  }),
}));

export const costLogsRelations = relations(costLogs, ({ one }) => ({
  job: one(intakeJobs, {
    fields: [costLogs.jobId],
    references: [intakeJobs.id],
  }),
}));

export const reviewerActionsRelations = relations(reviewerActions, ({ one }) => ({
  job: one(intakeJobs, {
    fields: [reviewerActions.jobId],
    references: [intakeJobs.id],
  }),
  reviewer: one(users, {
    fields: [reviewerActions.reviewerId],
    references: [users.id],
  }),
}));

export const deploymentsRelations = relations(deployments, ({ one }) => ({
  job: one(intakeJobs, {
    fields: [deployments.jobId],
    references: [intakeJobs.id],
  }),
  deployedByUser: one(users, {
    fields: [deployments.deployedBy],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  reviewerActions: many(reviewerActions),
  deployments: many(deployments),
}));
