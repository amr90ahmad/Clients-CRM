import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(5, { message: "Name must be have 5 characters at least" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z
        .string()
        .trim()
        .min(10, { message: "Password must be at least 10 characters" }),
    role: z.enum(["user", "admin"]),
});

export const editUserSchema = userSchema.omit({ password: true }).extend({
    id: z.string().regex(/^\d+$/),
});

export const changePasswordSchema = z
    .object({
        id: z.string().regex(/^\d+$/),
        password: z
            .string()
            .min(10, { message: "Password must be at least 10 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const clientSchema = z.object({
    name: z
        .string()
        .min(5, { message: "Name must be have 5 characters at least" }),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export const editClientSchema = clientSchema.extend({
    id: z.string(),
});

export const TransactionSchema = z.object({
    user_id: z.string(),
    client_id: z.string(),
    service: z.string(),
    cost: z.string().regex(/^\d+$/, { message: "Input must be a number" }),
    payment: z.string().regex(/^\d+$/, { message: "Input must be a number" }),
    date: z.string(),
    comment: z.string().optional(),
});

export const serviceSchema = z.object({
    label: z.string(),
});
