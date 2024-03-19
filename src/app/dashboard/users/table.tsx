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

export default async function UsersTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const users = await fetchUsers(query, currentPage);
    return (
        <>
            <Table className='dark min-h-[70%]'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-neutral-400'>
                    {users?.map((user) => (
                        <TableRow key={user.email}>
                            <TableCell className='font-medium'>
                                {user.email}
                            </TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className='text-center flex gap-4 justify-center'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <EditDialog user={user} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Edit user
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {" "}
                                            <DeleteDialog id={user.id} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Delete user
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
