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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { createTransaction } from "@/app/lib/actions";
import { useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TransactionSchema } from "@/app/lib/schemas";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export default function TransactionForm({
    id,
    trigger,
}: {
    id: number;
    trigger: string;
}) {
    const [state, formAction] = useFormState(createTransaction, {
        message: "",
    });
    const form = useForm<z.output<typeof TransactionSchema>>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            client_id: String(id),
            service: "service 1",
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
                    <Button className='bg-primary-1'>Add Transaction</Button>
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
            <DialogContent className='sm:max-w-[425px] dark text-neutral-400'>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>
                <DialogDescription>{state.message}</DialogDescription>
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={(evt) => {
                            evt.preventDefault();
                            form.handleSubmit(() => {
                                formAction(new FormData(formRef.current!));
                            })(evt);
                        }}
                        action={formAction}
                        className='space-y-8'
                    >
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
                                                <SelectValue placeholder='Select Service' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='Service1'>
                                                Service1
                                            </SelectItem>
                                            <SelectItem value='Service2'>
                                                Service2
                                            </SelectItem>
                                            <SelectItem value='Service3'>
                                                Service3
                                            </SelectItem>
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
                        {/* <FormField
                            control={form.control}
                            name='date'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                {...field}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <input type='date' name='date' defaultValue={id} />
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
