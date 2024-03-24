"use server";

import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import {
    TransactionSchema,
    clientSchema,
    editClientSchema,
    editUserSchema,
    serviceSchema,
    userSchema,
} from "./schemas";
import { hash } from "bcrypt";
import { getUserByEmail } from "@/app/lib/data";

export type FormState = {
    message: string;
};

export async function createUser(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const user = await getUserByEmail(session?.user?.email);
    if (user.role != "admin") return { message: "Unauthenticated" };

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

    const { name, email, password, role } = parsed.data;

    try {
        const users = await sql`SELECT * from users`;

        const repeatedEmail = users.rows.find((user) => user.email == email);
        const repeatedName = users.rows.find((user) => user.name == name);

        if (repeatedEmail) {
            return { message: "Email is already exists" };
        }
        if (repeatedName) {
            return { message: "Name is already exists" };
        }

        const hashedPassword = await hash(password, 10);

        await sql`INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})`;

        revalidatePath("/dashboard/users");
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
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const formData = Object.fromEntries(data);
    const parsed = editUserSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(parsed.error.message);
        return { message: "Invalid form data" };
    }

    const user = await getUserByEmail(session?.user?.email);
    const { name, email, password, role, id } = parsed.data;

    if (user.id != id && user.role !== "admin")
        return { message: "Unauthenticated" };

    try {
        const users = await sql`SELECT * from users`;

        const repeatedEmail = users.rows.find((user) => user.email == email);
        const repeatedName = users.rows.find((user) => user.name == name);

        if (repeatedEmail) {
            return { message: "Email is already exists" };
        }
        if (repeatedName) {
            return { message: "Name is already exists" };
        }

        await sql`UPDATE users SET email = ${email}, name = ${name}, role = ${role} WHERE id = ${id}`;

        revalidatePath("/dashboard/users");
        return { message: "User Information updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function deleteUser(user_id: number) {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const user = await getUserByEmail(session?.user?.email);
    if (user.role != "admin") return { message: "Unauthenticated" };

    await sql`DELETE FROM users where id = ${user_id}`;

    revalidatePath("/dashboard/users");
}

export async function createClient(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const formData = Object.fromEntries(data);
    const parsed = clientSchema.safeParse(formData);

    if (!parsed.success) {
        return { message: "Invalid form data" };
    }

    const user = await getUserByEmail(session?.user?.email);
    const { name, phone, address } = parsed.data;
    try {
        const clients = await sql`SELECT * from clients`;

        const repeatedName = clients.rows.find((client) => client.name == name);

        if (repeatedName) {
            return { message: "Name is already exists" };
        }

        await sql`INSERT INTO clients (name, phone, address, user_id)
            VALUES (${name}, ${phone}, ${address}, ${user?.id})`;

        revalidatePath("/dashboards/clients");
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
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const formData = Object.fromEntries(data);
    const parsed = editClientSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(parsed.error.message);
        return { message: "Invalid form data" };
    }

    const { name, phone, address, id } = parsed.data;

    try {
        const clients = await sql`SELECT * from clients`;

        const repeatedName = clients.rows.find((client) => client.name == name);

        if (repeatedName) {
            return { message: "Name is already exists" };
        }

        await sql`UPDATE clients SET
        name = ${name}, phone = ${phone}, address = ${address}
        WHERE id = ${id}`;

        revalidatePath("/dashboard/users");
        return { message: "Client Information updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function deleteClient(client_id: number, user_id: number) {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const user = await getUserByEmail(session?.user?.email);

    if (user.id !== user_id && user.role !== "admin")
        return { message: "Unauthenticated" };

    await sql`DELETE FROM clients WHERE id = ${client_id}`;
    revalidatePath("/dashboard/clients");
}

export async function createTransaction(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

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
        return { message: "Transaction created successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function deleteTransaction(transaction_id: number) {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    await sql`DELETE FROM transactions where id = ${transaction_id}`;
    revalidatePath("/dashboard/transactions");
}

export async function addService(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    console.log("here");
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    const formData = Object.fromEntries(data);
    const parsed = serviceSchema.safeParse(formData);

    if (!parsed.success) {
        console.log(data);
        return { message: parsed.error.message };
    }

    const services = await sql`SELECT * FROM services`;

    const { label } = parsed?.data;

    const repeatedService = services.rows.find((s) => s.name === label);

    if (repeatedService)
        return { message: "This service has been added before" };

    const user = await getUserByEmail(session?.user?.email);

    try {
        await sql`INSERT INTO services (name, user_id)
            VALUES (${label}, ${user.id})`;

        revalidatePath("/dashboard/profile/services");
        return { message: "Service added successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Database Error" };
    }
}

export async function deleteService(id: number) {
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };

    await sql`DELETE FROM services where id = ${id}`;

    revalidatePath("/dashboard/profile/services");
}

export async function setLogoutStatus() {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);

    await sql`UPDATE users SET status = false WHERE id = ${user.id}`;
}
