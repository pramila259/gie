import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const certificates = pgTable('certificates', {
  id: text('id').primaryKey(),
  certificateNumber: varchar('certificate_number', { length: 100 }).unique().notNull(),
  gemstoneType: varchar('gemstone_type', { length: 100 }).notNull(),
  caratWeight: varchar('carat_weight', { length: 50 }).notNull(),
  cut: varchar('cut', { length: 100 }).notNull(),
  measurements: varchar('measurements', { length: 100 }).notNull(),
  clarity: varchar('clarity', { length: 50 }).notNull(),
  color: varchar('color', { length: 50 }).notNull(),
  polish: varchar('polish', { length: 50 }).notNull(),
  origin: varchar('origin', { length: 100 }).notNull(),
  imageUrl: text('image_url'),
  issueDate: timestamp('issue_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  issueDate: true,
  createdAt: true,
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;