"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <>
            <Button
                className='text-neutral-400 hover:text-neutral-100'
                onClick={signOut}
            >
                Logout
            </Button>
        </>
    );
}
