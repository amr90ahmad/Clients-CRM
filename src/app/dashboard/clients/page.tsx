import Search from "../../../components/search";
import ClientsTable from "./table";
import Paginate from "@/components/pagination";
import ClientForm from "./create";
import { fetchClientsPages } from "@/app/lib/data";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchClientsPages(query);

    return (
        <>
            <header className='flex justify-between mb-8 mt-4 flex-wrap gap-2'>
                <div className='flex gap-8'>
                    <h2 className='text-2xl text-neutral-100 font-medium'>
                        Clients
                    </h2>
                    <Search />
                </div>
                <ClientForm />
            </header>
            <Suspense fallback='Loading...'>
                <ClientsTable query={query} currentPage={currentPage} />
            </Suspense>
            {totalPages !== 0 && <Paginate totalPages={totalPages} />}
        </>
    );
}
