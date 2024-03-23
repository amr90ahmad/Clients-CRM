import Search from "@/components/search";

import UsersTable from "./table";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUsersPages, getUserByEmail } from "@/app/lib/data";
import Paginate from "@/components/pagination";
import UserForm from "./create";
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
    const session = await getServerSession();
    if (!session) redirect("/login");
    const user = await getUserByEmail(session.user?.email);
    if (user.role != "admin") redirect("/dashboard");
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchUsersPages(query);
    return (
        <>
            <header className='flex justify-between mb-8 mt-4 flex-wrap gap-8'>
                <div className='flex flex-wrap gap-8'>
                    <h2 className='text-xl text-neutral-100 font-medium'>
                        Users
                    </h2>
                    <Search />
                </div>
                <UserForm />
            </header>
            <Suspense fallback='Loading...'>
                <UsersTable query={query} currentPage={currentPage} />
            </Suspense>
            {totalPages !== 0 && <Paginate totalPages={totalPages} />}
        </>
    );
}
