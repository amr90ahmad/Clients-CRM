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
    Command,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";

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
import ServiceForm from "../../profile/services/add-service";
const services = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
] as const;

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
                    <Button className='bg-primary-1 text-neutral-100'>
                        Add Transaction
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
                                                <SelectValue placeholder='Select a verified email to display' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='m@example.com'>
                                                m@example.com
                                            </SelectItem>
                                            <SelectItem value='m@google.com'>
                                                m@google.com
                                            </SelectItem>
                                            <SelectItem value='m@support.com'>
                                                m@support.com
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
