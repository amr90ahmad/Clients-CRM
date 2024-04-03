"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HomeIcon, UsersRound, Folders, FilesIcon } from "lucide-react";

const linkStyle = `cursor-pointer text-muted-foreground font-semibold flex gap-2 text-sm font-medium hover:text-primary items-center px-8 py-4`;

export default function Sidebar() {
    const active = usePathname();
    const data = useSession();
    return (
        <>
            <div className='flex gap-2 font-semibold my-8 mx-auto'>
                <Image width={25} height={20} src='/logo.png' alt='logo' />{" "}
                <h3 className='font-bold hidden md:block'>DashboardX</h3>
            </div>
            <Link
                href='/dashboard'
                className={` ${linkStyle} ${
                    active === "/dashboard" ? "text-primary" : ""
                }`}
            >
                <HomeIcon />
                <span className='hidden md:block'>Dashboard</span>
            </Link>
            {/* {data?.data?.user?.role === "admin" && ( */}
            <Link
                href='/dashboard/users'
                className={`${linkStyle} ${
                    active === "/dashboard/users" ? "text-primary" : ""
                }`}
            >
                <UsersRound />
                <span className='hidden md:block'>Users</span>
            </Link>
            {/* )} */}
            <Link
                href='/dashboard/clients'
                className={`${linkStyle} ${
                    active === "/dashboard/clients" ? "text-primary" : ""
                }`}
            >
                <Folders />
                <span className='hidden md:block'>Clients</span>
            </Link>
            <Link
                href='/dashboard/services'
                className={`${linkStyle} ${
                    active === "/dashboard/services" ? "text-primary" : ""
                }`}
            >
                <FilesIcon />
                <span className='hidden md:block'>Services</span>
            </Link>
        </>
    );
}
