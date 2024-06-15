"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { createTransaction } from "@/app/lib/actions";
import { useRef } from "react";
import { TransactionSchema } from "@/app/lib/schemas";
import { QueryResultRow } from "@vercel/postgres";
import { FilePlus } from "lucide-react";

export default function TransactionForm({
    id,
    user_id,
    services,
    trigger,
}: {
    id: number;
    user_id: number;
    services: QueryResultRow[];
    trigger: string;
}) {
    const [state, formAction] = useFormState(createTransaction, {
        message: "",
    });
    const form = useForm<z.output<typeof TransactionSchema>>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            user_id: String(user_id),
            client_id: String(id),
            service: "",
            cost: "",
            payment: "",
            date: "",
            comment: "",
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger === "button" ? (
                    <Button className='flex gap-2 items-center'>
                        <span>Add Transaction</span>
                        <FilePlus />
                    </Button>
                ) : (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z'
                            clipRule='evenodd'
                        />
                    </svg>
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] '>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>
                <DialogDescription>{state.message}</DialogDescription>
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={async (evt) => {
                            evt.preventDefault();
                            const formData = new FormData(formRef.current!);
                            await form.handleSubmit(() => {
                                formAction(formData);
                            })(evt);
                            form.reset();
                        }}
                        action={formAction}
                        className='space-y-8'
                    >
                        <input
                            name='user_id'
                            defaultValue={user_id}
                            hidden
                            readOnly
                        />
                        <input
                            name='client_id'
                            defaultValue={id}
                            hidden
                            readOnly
                        />
                        <FormField
                            control={form.control}
                            name='service'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select service' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {services?.map((service) => (
                                                <SelectItem
                                                    value={service.name}
                                                    key={service.id}
                                                >
                                                    {service.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='cost'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Cost' {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='payment'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Payment'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Input type='date' name='date' />
                        <FormField
                            control={form.control}
                            name='comment'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Comment'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button className='w-100'>Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
