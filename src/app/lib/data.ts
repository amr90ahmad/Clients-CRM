import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";

const items_per_page = 8;

export async function fetchUsers(query: string, currentPage: number) {
    noStore();
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
        throw new Error("Failed to fetch users pages.");
    }
}

// TODO
// Sort (created_at, latest_transaction_date, alpha, balance)
export async function fetchClients(query: string, currentPage: number) {
    noStore();
    try {
        const result = await sql`SELECT * FROM clients 
        WHERE
        name ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`}
        ORDER BY id DESC
        LIMIT ${items_per_page}
        OFFSET ${(currentPage - 1) * items_per_page}`;
        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch clients.");
    }
}

export async function fetchClientsPages(query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*) FROM clients
        WHERE
        name ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / items_per_page
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch clients pages.");
    }
}

export async function getClientById(id: number) {
    noStore();
    try {
        const result =
            await sql`SELECT * FROM clients where id = ${id} LIMIT 1`;
        return result.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch client.");
    }
}

// TODO
// Sort (date)
export async function fetchTransactions(
    client_id: number,
    currentPage: number
) {
    noStore();

    // const session = await getServerSession();
    // if (!session.user.role === "user") {
    //     return { status: 401, message: "Not Authorized" };
    // }
    try {
        const result = await sql`SELECT * FROM transactions
                            WHERE client_id = ${client_id}
        LIMIT ${items_per_page}
        OFFSET ${(currentPage - 1) * items_per_page}`;

        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch transactions.");
    }
}
export async function fetchTransactionsPages(id: number) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*) FROM transactions
        WHERE client_id = ${id}`;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / items_per_page
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch clients pages.");
    }
}

// TODO
// Sort (alpha)
// export async function fetchServices(client_id, page = 1) {
//     noStore();

//     const session = await getServerSession();
//     if (!session.user.role === "user") {
//         return { status: 401, message: "Not Authorized" };
//     }
//     try {
//         const result = await sql`SELECT * FROM services
//                             WHERE client_id = ${client_id}
//                             LIMIT ${items}
//                             OFFSET ${(page - 1) * items}`;
//         return { status: 200, data: result.rows };
//     } catch {
//         return { status: 500, message: "Failed to fetch data." };
//     }
// }
