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

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export default function Form({ user }: { user: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <UserForm user={user} />
            </CardContent>
        </Card>
    );
}
