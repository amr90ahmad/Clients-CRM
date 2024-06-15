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

import { fetchTransactions, fetchTransactionsPages } from "@/app/lib/data";
import DeleteDialog from "./delete-transaction";
import Paginate from "@/components/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function TransactionsTable({
    id,
    currentPage,
}: {
    id: number;
    currentPage: number;
}) {
    const transactions = await fetchTransactions(id, currentPage);
    return (
        <Table className='mt-4'>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead className='text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions?.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className='font-medium'>
                            {transaction.date.toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell>{transaction.service}</TableCell>
                        <TableCell>{transaction.cost}</TableCell>
                        <TableCell>{transaction.payment}</TableCell>
                        <TableCell>{transaction.balance}</TableCell>
                        <TableCell className='text-center flex gap-4 justify-center'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <DeleteDialog id={transaction.id} />
                                    </TooltipTrigger>
                                    <TooltipContent>Delete user</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell className='text-gray'>Total Balance</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        {transactions?.reduce((accumulator, currentValue) => {
                            return accumulator + Number(currentValue.balance);
                        }, 0)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
