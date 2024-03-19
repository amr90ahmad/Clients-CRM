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
import { userSchema } from "@/app/lib/schemas";
import { createUser } from "@/app/lib/actions";
import { useRef } from "react";

export default function UserForm() {
    const [state, formAction] = useFormState(createUser, { message: "" });
    const form = useForm<z.output<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "user",
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-primary-1'>Add User</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] dark text-neutral-400'>
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
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
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Password'
                                            {...field}
                                        />
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
                                        defaultValue={field.value}
                                        {...field}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select role' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='user'>
                                                User
                                            </SelectItem>
                                            <SelectItem value='admin'>
                                                Admin
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

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
