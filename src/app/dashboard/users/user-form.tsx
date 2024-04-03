"use client";

import { Button } from "@/components/ui/button";
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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { editUserSchema } from "@/app/lib/schemas";
import { editUser } from "@/app/lib/actions";
import { useRef } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export default function UserForm({ user }: { user: any }) {
    const { id, name, email, password, role } = user;
    const [state, formAction] = useFormState(editUser, { message: "" });
    const form = useForm<z.output<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            id: String(id),
            name: name,
            email: email,
            role: role,
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    form.handleSubmit(() => {
                        formAction(new FormData(formRef.current!));
                    })(evt);
                }}
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
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={email} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={role}
                                {...field}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select role' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='user'>User</SelectItem>
                                    <SelectItem value='admin'>Admin</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {state.message && (
                    <Alert>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                <Button className='w-100 '>Save changes</Button>
            </form>
        </Form>
    );
}
