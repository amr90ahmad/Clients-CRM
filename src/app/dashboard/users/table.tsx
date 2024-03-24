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

import { fetchUsers } from "@/app/lib/data";
import DeleteDialog from "./delete";
import EditDialog from "./edit";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheckBig, CircleX } from "lucide-react";

export default async function UsersTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const users = await fetchUsers(query, currentPage);
    return (
        <Table className='min-h-[70%]'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.email}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className='font-medium'>
                            {user.email}
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            {user.is_loggedin === true ? (
                                <CircleCheckBig />
                            ) : (
                                <CircleX />
                            )}
                        </TableCell>
                        <TableCell className='text-center flex gap-4 justify-center'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <EditDialog user={{ ...user }} />
                                    </TooltipTrigger>
                                    <TooltipContent>Edit user</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <DeleteDialog id={user.id} />
                                    </TooltipTrigger>
                                    <TooltipContent>Delete user</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
