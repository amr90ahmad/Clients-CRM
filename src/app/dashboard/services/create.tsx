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
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Service</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] '>
                <DialogHeader>
                    <DialogTitle>Add Service</DialogTitle>
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
                        }}
                        action={formAction}
                        className='space-y-8'
                    >
                        <Input
                            type='text'
                            placeholder='Add new service'
                            name='label'
                        />
                        <Button type='submit'>Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
