import React from "react";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Cards from "./cards";

export default async function page() {
    const session = await getServerSession();
    if (!session) redirect("/login");
    return (
        <>
            <Cards />
            <div className='grid grid-cols-2 my-8 gap-4'>
                <div className='col-span-2'>
                    <BarChart />
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <LineChart />
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <LineChart />
                </div>
            </div>
        </>
    );
}
