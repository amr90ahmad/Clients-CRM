"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { setLogoutStatus } from "@/app/lib/actions";
import { signOut } from "next-auth/react";

export default function Logout() {
    const logout = async () => {
        await setLogoutStatus();
        await signOut();
    };
    return <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>;
}
