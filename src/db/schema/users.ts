import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'reviewer', 'member']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  role: userRoleEnum('role').default('member'),
  // BUI-21: Required by Auth.js Drizzle adapter
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  // BUI-21: Auth.js adapter also requires accounts, sessions, verificationTokens tables
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
