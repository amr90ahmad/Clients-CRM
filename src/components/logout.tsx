"use client";
import { setLogoutStatus } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
    const out = async () => {
        await setLogoutStatus();
        await signOut();
    };
    return (
        <>
            <Button onClick={out} variant='secondary'>
                Logout
            </Button>
        </>
    );
}
