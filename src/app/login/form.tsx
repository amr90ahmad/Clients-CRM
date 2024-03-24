"use client";

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Form() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { push, refresh } = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);
        const { email, password } = data;
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (response?.error) setError("Email or Password is incorrect");
        else {
            push("/dashboard");
            refresh();
        }

        setLoading(false);
    };

    return (
        <>
            <Card className='max-w-md mx-auto '>
                <CardHeader>
                    <CardTitle className='text-3xl font-bold text-center'>
                        Welcome!
                    </CardTitle>
                    <CardDescription className='text-center text-sm'>
                        Please enter your credentials to log in.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <Label
                                className='text-sm font-medium text-neutral-400'
                                htmlFor='username'
                            >
                                Email
                            </Label>
                            <Input
                                className='w-full p-2 border border-border-clr rounded'
                                id='username'
                                placeholder='Enter your email'
                                required
                                type='email'
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                        </div>
                        {/* {errors.email && (
                            <p className='text-red-500'>
                                {errors?.email?.message}
                            </p>
                        )} */}

                        <div className='space-y-2'>
                            <Label
                                className='text-sm font-medium text-neutral-400'
                                htmlFor='password'
                            >
                                Password
                            </Label>
                            <Input
                                className='w-full p-2 border border-border-clr rounded'
                                id='password'
                                placeholder='Enter your password'
                                required
                                type='password'
                                {...register("password")}
                            />
                        </div>
                        {/* {errors.password && (
                            <p className='text-red-500'>
                                {errors?.password?.message}
                            </p>
                        )} */}

                        {error && (
                            <p className='text-red-500 text-xs'>{error}</p>
                        )}
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        {loading ? (
                            <Button disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                className='w-32 text-white bg-primary-1 hover:bg-primary-2'
                            >
                                Login
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
