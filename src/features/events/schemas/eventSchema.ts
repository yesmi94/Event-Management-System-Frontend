import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description too short"),
    location: z.string().min(3, "Location is required"),
    organization: z.string().min(3, "Organization is required"),
    type: z.number().min(0).max(9, "Invalid event type"),
    capacity: z.number().min(1, "Capacity must be greater than 0"),
    remainingSpots: z.number().min(1).optional(),
    eventDate: z
      .date()
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: "Valid event date is required",
      })
      .refine((val) => val >= new Date(new Date().setHours(0, 0, 0, 0)), {
        message: "Event date cannot be in the past",
      }),
    cutoffDate: z
      .date()
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: "Valid cutoff date is required",
      }),
    eventTime: z.string().min(1, "Event time is required"),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.cutoffDate <= data.eventDate, {
    message: "Cutoff date cannot be after the event date",
    path: ["cutoffDate"],
  });
