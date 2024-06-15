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

import { fetchClients, fetchServices, getUserByEmail } from "@/app/lib/data";
import DeleteDialog from "./delete";
import EditDialog from "./edit";
import Link from "next/link";
import TransactionForm from "./../client/[id]/create-transaction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";

export default async function ClientsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    const clients = await fetchClients(query, currentPage);
    const services = await fetchServices();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className='text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clients?.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell className='font-medium'>
                            <Link href={`/dashboard/client/${client.id}`}>
                                {client.name}
                            </Link>
                        </TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.address}</TableCell>
                        <TableCell className='text-center flex gap-4 justify-center'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <TransactionForm
                                            id={client.id}
                                            user_id={user.id}
                                            services={services}
                                            trigger='icon'
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add Transaction
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <EditDialog client={client} />
                                    </TooltipTrigger>
                                    <TooltipContent>Edit client</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <DeleteDialog
                                            client_id={client.id}
                                            user_id={client.user_id}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Delete client
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
