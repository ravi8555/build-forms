import { z } from "zod";

export const createReportInput = z.object({
  formId: z.string().uuid(),
  reportedBy: z.string().uuid(),
  reason: z.string().min(1).max(100),
  description: z.string().optional(),
});

export type CreateReportInputType =
  z.infer<typeof createReportInput>;

export const updateReportStatusInput = z.object({
  reportId: z.string().uuid(),

  status: z.enum([
    "PENDING",
    "REVIEWED",
    "REJECTED",
  ]),
});

export type UpdateReportStatusInputType =
  z.infer<typeof updateReportStatusInput>;
  export const reportStatusModel = z.enum([
  "PENDING",
  "REVIEWED",
  "REJECTED",
]);