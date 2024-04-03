import { getClientById, fetchTransactionsPages } from "@/app/lib/data";
import TransactionsTable from "./transactions-table";
import Paginate from "@/components/pagination";
import EditClientForm from "./client-form";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { TableRowsSkeleton, FormSkeleton } from "@/components/skeletons";

export default async function page({
    params,
    searchParams,
}: {
    params: { id: number };
    searchParams: { page: number };
}) {
    const session = await getServerSession();
    if (!session) redirect("/login");
    const { id } = params;
    const client = await getClientById(id);
    if (!client) notFound();
    // check if user own this client or not
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTransactionsPages(id);

    const { name, phone, address } = client;

    return (
        <>
            <Suspense fallback={<FormSkeleton />}>
                <EditClientForm client={{ id, name, phone, address }} />
            </Suspense>
            <Suspense fallback={<TableRowsSkeleton />}>
                <TransactionsTable id={id} currentPage={currentPage} />
                {totalPages !== 0 && <Paginate totalPages={totalPages} />}
            </Suspense>
        </>
    );
}
