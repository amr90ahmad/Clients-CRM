"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import UserForm from "@/app/dashboard/users/user-form";
import PassowrdForm from "./change-password";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export default function Form({ user }: { user: any }) {
    return (
        <>
            <Card className='mb-4'>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserForm user={user} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <PassowrdForm user_id={user.id} />
                </CardContent>
            </Card>
        </>
    );
}
