import { z } from "zod";

export const userSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z
        .string()
        .trim()
        .min(10, { message: "Password must be at least 10 characters" }),
    role: z.enum(["user", "admin"]),
});

export const editUserSchema = userSchema.extend({
    id: z.string().regex(/^\d+$/),
});

export const clientSchema = z.object({
    id: z.string(),
    name: z.string().min(5, { message: "This field is required" }),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export const editClientSchema = clientSchema.extend({
    id: z.string(),
});

export const TransactionSchema = z.object({
    client_id: z.string(),
    service: z.string(),
    cost: z.string().regex(/^\d+$/, { message: "Input must be a number" }),
    payment: z.string().regex(/^\d+$/, { message: "Input must be a number" }),
    date: z.string(),
    comment: z.string().optional(),
});
