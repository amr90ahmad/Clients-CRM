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
import { clientSchema } from "@/app/lib/schemas";
import { createClient } from "@/app/lib/actions";
import { useRef } from "react";

export default function ClientForm() {
    const [state, formAction] = useFormState(createClient, { message: "" });
    const form = useForm<z.output<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-primary-1'>Add Client</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] dark text-neutral-400'>
                <DialogHeader>
                    <DialogTitle>Add Client</DialogTitle>
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
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Phone Number'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Address'
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
