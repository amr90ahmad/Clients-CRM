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
import { changePasswordSchema } from "@/app/lib/schemas";
import { changePassword } from "@/app/lib/actions";
import { useRef } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export default function PassowrdForm({ user_id }: { user_id: number }) {
    const [state, formAction] = useFormState(changePassword, { message: "" });
    const form = useForm<z.output<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            id: String(user_id),
            password: "",
            confirmPassword: "",
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    const formData = new FormData(formRef.current!);
                    await form.handleSubmit(() => {
                        formAction(formData);
                    })(evt);
                    form.reset();
                }}
                className='space-y-8'
            >
                <input name='id' defaultValue={user_id} hidden readOnly />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {state.message && (
                    <Alert>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                <Button className='w-100 '>Change Password</Button>
            </form>
        </Form>
    );
}
