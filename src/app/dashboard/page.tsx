import React from "react";
import Card from "../../components/card";
import Logout from "@/components/logout";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
import { fetchClients, getUserByEmail } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    if (!session) redirect("/login");
    return (
        <>
            <header className='flex justify-between items-center mb-8'>
                <h4 className='text-neutral-100 my-4 font-semibold'>
                    Welcome back, {user?.name || user?.email}
                </h4>
                <Logout />
            </header>
            <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className='grid grid-cols-2 bg-primary-2 rounded-lg border-border-clr border-2 my-8'>
                <div className='col-span-2  p-8'>
                    <BarChart />
                </div>
                <div className='col-span-2 md:col-span-1 rounded-lg  p-8'>
                    <LineChart />
                </div>
                <div className='col-span-2 md:col-span-1 rounded-lg p-8 '>
                    <LineChart />
                </div>
            </div>
        </>
    );
}
