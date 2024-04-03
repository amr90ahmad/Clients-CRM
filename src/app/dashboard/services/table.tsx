import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { fetchServices } from "@/app/lib/data";
import Link from "next/link";
import DeleteDialog from "./delete";

export default async function ServicesTable() {
    const services = await fetchServices();

    return (
        <Table className='overflow-auto max-h-[50vh]'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className='text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {services?.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell className='font-medium'>
                            <Link href={`/dashboard/service/${service.id}`}>
                                {service.name}
                            </Link>
                        </TableCell>
                        <TableCell className='text-center flex gap-4 justify-center'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <DeleteDialog service_id={service.id} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Delete service
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
