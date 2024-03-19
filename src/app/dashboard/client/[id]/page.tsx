import { getClientById, fetchTransactionsPages } from "@/app/lib/data";
import TransactionsTable from "./transactions-table";
import TransactionForm from "./create-transaction";
import Paginate from "@/components/pagination";

export default async function page({
    params,
    searchParams,
}: {
    params: { id: number };
    searchParams: { page: number };
}) {
    const { id } = params;
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTransactionsPages(id);
    const { name, phone, address } = await getClientById(id);

    return (
        <>
            <div>{name}</div>
            <div>{phone}</div>
            <div>{address}</div>
            <TransactionForm id={id} trigger='button' />
            <TransactionsTable id={id} currentPage={currentPage} />
            {totalPages !== 0 && <Paginate totalPages={totalPages} />}
        </>
    );
}
