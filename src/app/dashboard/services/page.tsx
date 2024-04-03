import { Suspense } from "react";
import ServiceForm from "./create";
import ServicesTable from "./table";
import { TableRowsSkeleton } from "@/components/skeletons";

export default function page() {
    return (
        <>
            <header className='mb-8 mt-4'>
                <div className='flex justify-between mb-2'>
                    <h2 className='text-xl font-medium'>Services</h2>
                    <ServiceForm />
                </div>
            </header>
            <Suspense fallback={<TableRowsSkeleton />}>
                <ServicesTable />
            </Suspense>
        </>
    );
}
