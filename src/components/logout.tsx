"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
    const out = async () => {
        await signOut();
    };
    return (
        <>
            <Button className='' onClick={out} variant='secondary'>
                Logout
            </Button>
        </>
    );
}
