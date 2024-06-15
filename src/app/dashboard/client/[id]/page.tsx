import {
    getClientById,
    fetchTransactionsPages,
    getUserByEmail,
    fetchServices,
} from "@/app/lib/data";
import TransactionsTable from "./transactions-table";
import Paginate from "@/components/pagination";
import EditClientForm from "./client-form";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { TableRowsSkeleton, FormSkeleton } from "@/components/skeletons";
import TransactionForm from "./create-transaction";

export default async function page({
    params,
    searchParams,
}: {
    params: { id: number };
    searchParams: { page: number };
}) {
    const session = await getServerSession();
    if (!session) redirect("/login");
    const user = await getUserByEmail(session?.user?.email);
    const { id } = params;
    const client = await getClientById(id);
    if (!client) notFound();
    const services = await fetchServices();
    // check if user own this client or not
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTransactionsPages(id);

    const { name, phone, address } = client;

    return (
        <>
            <Suspense fallback={<FormSkeleton />}>
                <EditClientForm client={{ id, name, phone, address }} />
            </Suspense>
            <TransactionForm
                id={id}
                user_id={user.id}
                services={services}
                trigger='button'
            />
            <Suspense fallback={<TableRowsSkeleton />}>
                <div className='h-[100vh] flex flex-col justify-between'>
                    <TransactionsTable id={id} currentPage={currentPage} />
                    {totalPages !== 0 && <Paginate totalPages={totalPages} />}
                </div>
            </Suspense>
        </>
    );
}
