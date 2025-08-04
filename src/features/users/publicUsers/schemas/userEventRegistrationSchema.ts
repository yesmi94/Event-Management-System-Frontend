import { z } from "zod";

export const userRegistrationSchema = z.object({
  id: z.string("ID is required"),
  eventId: z.string("ID is required"),
  publicUserId: z.string("ID is required"),
  registeredUserName: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phoneNumber: z.string().max(10, "Phone number is required"),
  registeredAt: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Valid event date is required",
    }),
});
