import Search from "../../../components/search";
import ClientsTable from "./table";
import Paginate from "@/components/pagination";
import ClientForm from "./create";
import { fetchClientsPages } from "@/app/lib/data";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const session = await getServerSession();
    if (!session) redirect("/login");
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchClientsPages(query);

    return (
        <>
            <header className='mb-8 mt-4'>
                <div className='flex justify-between mb-2'>
                    <h2 className='text-xl font-medium'>Clients</h2>
                    <ClientForm />
                </div>
                <Search />
            </header>
            <Suspense fallback='Loading...'>
                <ClientsTable query={query} currentPage={currentPage} />
            </Suspense>
            {totalPages !== 0 && <Paginate totalPages={totalPages} />}
        </>
    );
}
