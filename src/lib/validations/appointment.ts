import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be under 15 digits")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  age: z.coerce
    .number()
    .min(0, "Age must be positive")
    .max(150, "Please enter a valid age")
    .optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  message: z.string().max(500, "Message must be under 500 characters").optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
