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
import { addService } from "@/app/lib/actions";
import { useRef } from "react";
import { serviceSchema } from "@/app/lib/schemas";

export default function ServiceForm() {
    const [state, formAction] = useFormState(addService, {
        message: "",
    });
    const form = useForm<z.output<typeof serviceSchema>>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            label: "",
        },
    });
    const formRef = useRef<HTMLFormElement>(null);

    return (
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
                <div className='flex w-full max-w-sm items-center space-x-2'>
                    <Input
                        type='text'
                        placeholder='Add new service'
                        name='label'
                    />
                    <Button type='submit'>Save</Button>
                </div>
                    <p className='text-neutral-400'>{state.message}</p>
            </form>
        </Form>
    );
}
