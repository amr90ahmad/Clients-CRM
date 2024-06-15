import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserCards from "@/components/user-cards";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import TransactionsTable from "./client/[id]/transactions-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CardsSkeleton, TableRowsSkeleton } from "@/components/skeletons";
import { getUserByEmail } from "../lib/data";
import AdminCards from "@/components/admin-cards";

export default async function page() {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    if (!session) redirect("/login");
    return (
        <>
            <Suspense fallback={<CardsSkeleton />}>
                {user?.role === "admin" ? <AdminCards /> : <UserCards />}
            </Suspense>
            <div className='grid grid-cols-2 my-4 gap-4'>
                <div className='col-span-2 lg:col-span-1'>
                    <BarChart />
                </div>
                <div className='col-span-2 lg:col-span-1'>
                    <LineChart />
                </div>
                <div className='col-span-2'>
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                Recent Transactions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<TableRowsSkeleton />}>
                                <TransactionsTable
                                    currentPage={1}
                                    id={user?.id}
                                />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
