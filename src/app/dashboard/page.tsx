import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Cards from "./cards";
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

export default async function page() {
    const session = await getServerSession();
    if (!session) redirect("/login");
    return (
        <>
            <Cards />
            <div className='grid grid-cols-2 my-4 gap-4'>
                <div className='col-span-1'>
                    <BarChart />
                </div>
                <div className='col-span-1'>
                    <LineChart />
                </div>
                <div className='col-span-2'>
                    <Card>
                        <CardHeader>
                            {/* <CardTitle>2102</CardTitle> */}
                            <CardDescription>Recent Transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TransactionsTable currentPage={1} id={1} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
