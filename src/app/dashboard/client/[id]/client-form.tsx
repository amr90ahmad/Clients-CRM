"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
import { editClientSchema } from "@/app/lib/schemas";
import { editClient } from "@/app/lib/actions";
import { useRef } from "react";
import TransactionForm from "./create-transaction";

interface Client {
    id: number;
    name: string;
    phone: string;
    address: string;
}

export default function EditClientForm({ client }: { client: Client }) {
    const { id, name, phone, address } = client;
    const [state, formAction] = useFormState(editClient, { message: "" });
    const form = useForm<z.output<typeof editClientSchema>>({
        resolver: zodResolver(editClientSchema),
        defaultValues: {
            id: String(id),
            name: name,
            phone: phone,
            address: address,
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>{state.message}</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <input name='id' defaultValue={id} hidden readOnly />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={name} {...field} />
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
                                        <Input placeholder={phone} {...field} />
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
                                            placeholder={address}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className='flex justify-between items-center flex-wrap gap-4'>
                            <Button className='w-100 '>Save changes</Button>
                            <TransactionForm id={id} trigger='button' />
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
