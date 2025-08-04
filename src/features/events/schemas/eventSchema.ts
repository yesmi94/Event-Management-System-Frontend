import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description too short"),
  location: z.string().min(3, "Location is required"),
  organization: z.string().min(3, "Organization is required"),
  type: z.number().min(0).max(9, "Invalid event type"),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  eventDate: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Valid event date is required",
    }),
  cutoffDate: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Valid cutoff date is required",
    }),
  eventTime: z.string().min(1, "Event time is required"),
  imageUrl: z.string().optional(),
});
