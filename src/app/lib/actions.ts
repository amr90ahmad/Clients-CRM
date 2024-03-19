"use server";

import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import {
    TransactionSchema,
    clientSchema,
    editClientSchema,
    editUserSchema,
    userSchema,
} from "./schemas";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export type FormState = {
    message: string;
};
export async function createUser(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = userSchema.safeParse(formData);

    if (!parsed.success) {
        const fields: Record<string, string> = {};
        for (const key of Object.keys(formData)) {
            fields[key] = formData[key].toString();
        }
        return {
            message: "Invalid form data",
        };
    }
    const { email, password, role } = parsed.data;

    try {
        const users = await sql`SELECT * from users`;
        const repeatedEmail = users.rows.find((user) => user.email == email);
        if (repeatedEmail) {
            return { message: "Email is already exists" };
        }

        const hashedPassword = await hash(password, 10);
        await sql`INSERT INTO users (email, password, role)
            VALUES (${email}, ${hashedPassword}, ${role})`;
        return { message: "User created successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function editUser(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = editUserSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(parsed.error.message);
        return { message: "Invalid form data" };
    }
    const { email, password, role, id } = parsed.data;
    const hashedPassword = await hash(password, 10);

    try {
        await sql`UPDATE users SET email = ${email}, password = ${hashedPassword}, role = ${role} WHERE id = ${id}`;
        revalidatePath("/dashboard/users");
        return { message: "User Information updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

// export async function updateUser() {
//     const session = await getServerSession();
//     if (!session.user.role === "admin") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     //TODO
// }

export async function deleteUser(user_id: number) {
    await sql`DELETE FROM users where id = ${user_id}`;
    revalidatePath("/dashboard/users");
}

export async function createClient(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = clientSchema.safeParse(formData);

    if (!parsed.success) {
        return { message: "Invalid form data" };
    }
    const { name, phone, address } = parsed.data;
    try {
        await sql`INSERT INTO clients (name, phone, address)
            VALUES (${name}, ${phone}, ${address})`;
        return { message: "Client created successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function editClient(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = editClientSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(parsed.error.message);
        return { message: "Invalid form data" };
    }
    const { name, phone, address, id } = parsed.data;
    try {
        await sql`UPDATE clients SET name = ${name}, phone = ${phone}, address = ${address} WHERE id = ${id}`;
        revalidatePath("/dashboard/users");
        return { message: "Client Information updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

// export async function updateClient() {
//     const session = await getServerSession();
//     if (!session.user.role === "user") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     //TODO
// }

export async function deleteClient(client_id: number) {
    await sql`DELETE FROM clients where id = ${client_id}`;
    revalidatePath("/dashboard/clients");
}

export async function createTransaction(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = TransactionSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(data);
        return { message: parsed.error.message };
    }
    const { service, cost, payment, date, comment, client_id } = parsed?.data;
    const balance = Number(cost) - Number(payment);
    try {
        await sql`INSERT INTO transactions (service, cost, payment, balance, date, comment, client_id)
            VALUES (${service}, ${cost}, ${payment}, ${balance}, ${date.toLocaleString()},${comment}, ${client_id})`;
            revalidatePath(`/dashbboard/client/${client_id}`);
            // redirect(`/dashbboard/client/${client_id}`);
        return { message: "Transaction created successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

// export async function updateTransaction() {
//     const session = await getServerSession();
//     if (!session.user.role === "user") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     //TODO
// }

export async function deleteTransaction(transaction_id: number) {
    await sql`DELETE FROM transactions where id = ${transaction_id}`;
    revalidatePath("/dashboard/transactions");
}

// export async function addService(service) {
//     const session = await getServerSession();
//     if (!session.user.role === "user") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     const user_id = session.user.id;
//     // check repeated name
//     try {
//         await sql`INSERT INTO services (name, user_id)
//             VALUES (${service}, ${user_id})`;
//     } catch {
//         return { status: 500, message: "Failed to insert data." };
//     }
// }

// export async function deleteService(service_id) {
//     const session = await getServerSession();
//     if (!session.user.role === "user") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     try {
//         await sql`DELETE FROM services where id = ${service_id}`;
//     } catch {
//         return { status: 500, message: "Failed to delete data." };
//     }
// }
