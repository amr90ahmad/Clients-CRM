import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";

const items_per_page = 8;

export async function fetchUsers(query: string, currentPage: number) {
    noStore();
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    if (user.role != "admin") return;

    try {
        const result = await sql`SELECT * FROM users 
        WHERE 
        email ILIKE ${`%${query}%`} OR
        role ILIKE ${`%${query}%`}
        ORDER BY id DESC
        LIMIT ${items_per_page}
        OFFSET ${(currentPage - 1) * items_per_page}`;

        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users.");
    }
}

export async function fetchUsersPages(query: string) {
    noStore();
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    if (user.role != "admin") return 0;

    try {
        const count = await sql`SELECT COUNT(*) FROM users
        WHERE
        email ILIKE ${`%${query}%`} OR
        role ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / items_per_page
        );

        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        return 0;
    }
}

export async function fetchClients(query: string, currentPage: number) {
    noStore();
    const session = await getServerSession();
    if (!session) return [];
    const user = await getUserByEmail(session?.user?.email);

    try {
        const result = await sql`SELECT * FROM clients 
        WHERE 
        (name ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`})
        AND user_id = ${user.id}
        ORDER BY id DESC
        LIMIT ${items_per_page}
        OFFSET ${(currentPage - 1) * items_per_page}`;

        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function fetchClientsPages(query: string) {
    noStore();
    const session = await getServerSession();
    if (!session) return 0;
    const user = await getUserByEmail(session?.user?.email);
    try {
        const count = await sql`SELECT COUNT(*) FROM clients
        WHERE
        name ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`}
        AND user_id = ${user.id}`;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / items_per_page
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        return 0;
    }
}

export async function getClientById(id: number) {
    noStore();
    const session = await getServerSession();
    if (!session) return { message: "Unauthenticated" };
    const user = await getUserByEmail(session?.user?.email);

    try {
        const result =
            await sql`SELECT * FROM clients WHERE id = ${id} AND user_id = ${user.id} LIMIT 1`;

        return result.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch client.");
    }
}

export async function fetchTransactions(
    client_id: number,
    currentPage: number
) {
    noStore();
    const session = await getServerSession();
    if (!session) return [];

    try {
        const result = await sql`SELECT * FROM transactions
                            WHERE client_id = ${client_id}
                            LIMIT ${items_per_page}
                            OFFSET ${(currentPage - 1) * items_per_page}`;

        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function fetchTransactionsPages(id: number) {
    noStore();
    const session = await getServerSession();
    if (!session) return 0;
    try {
        const count = await sql`SELECT COUNT(*) FROM transactions
        WHERE client_id = ${id}`;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / items_per_page
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        return 0;
    }
}

export async function getUserByEmail(email: string | null | undefined) {
    try {
        const result = await sql`SELECT * FROM users
        WHERE email = ${email}`;

        return result.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch clients pages.");
    }
}

export async function fetchServices() {
    const session = await getServerSession();
    if (!session) return [];

    const user = await getUserByEmail(session?.user?.email);

    try {
        const result =
            await sql`SELECT * FROM services where user_id = ${user.id}`;
        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function getCardsInfo() {
    noStore();

    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);

    if (!session) return;

    try {
        const numOfClientsPromise = sql`SELECT COUNT(*) FROM clients WHERE user_id = ${user.id}`;
        const numOfTransactionsPromise = sql`SELECT COUNT(*) FROM transactions WHERE user_id = ${user.id}`;
        const revenuesPromise = sql`SELECT SUM(cost) FROM transactions WHERE user_id = ${user.id}`;
        const incomePromise = sql`SELECT SUM(payment) FROM transactions WHERE user_id = ${user.id}`;

        const data = await Promise.all([
            numOfClientsPromise,
            numOfTransactionsPromise,
            revenuesPromise,
            incomePromise,
        ]);

        const numOfClients = Number(data[0].rows[0].count ?? "0");
        const numOfTransactions = Number(data[1].rows[0].count ?? "0");
        const revenues = Number(data[2].rows[0].sum ?? "0");
        const income = Number(data[3].rows[0].count ?? "0");

        return {
            numOfClients,
            numOfTransactions,
            revenues,
            income,
        };
    } catch (error) {
        console.error("Database Error:", error);
    }
}

export async function getAdminCardsInfo() {
    noStore();

    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);

    if (user.role != "admin") return;

    try {
        const numOfUsersPromise = sql`SELECT COUNT(*) FROM users`;
        const numOfClientsPromise = sql`SELECT COUNT(*) FROM clients`;
        const numOfTransactionsPromise = sql`SELECT COUNT(*) FROM transactions`;
        const revenuesPromise = sql`SELECT SUM(cost) FROM transactions`;

        const data = await Promise.all([
            numOfUsersPromise,
            numOfClientsPromise,
            numOfTransactionsPromise,
            revenuesPromise,
        ]);

        const numOfUsers = Number(data[0].rows[0].count ?? "0");
        const numOfClients = Number(data[1].rows[0].count ?? "0");
        const numOfTransactions = Number(data[2].rows[0].count ?? "0");
        const revenues = Number(data[3].rows[0].sum ?? "0");

        return {
            numOfUsers,
            numOfClients,
            numOfTransactions,
            revenues,
        };
    } catch (error) {
        console.error("Database Error:", error);
    }
}
