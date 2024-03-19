"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const active = usePathname();
    const session = useSession();
    const { data } = session;
    return (
        <nav className='col-span-2 flex flex-col gap-14 border-r-2 border-primary-2 pt-8 p-6 shadow-lg min-h-[100vh] bg-neutral-800'>
            <div className='flex gap-2 font-semibold'>
                <Image width={25} height={20} src='/logo.png' alt='logo' />{" "}
                <h3 className='text-neutral-100 font-bold hidden md:block'>
                    Clients Management
                </h3>
            </div>
            <div className='flex flex-col gap-9'>
                <Link
                    href='/dashboard'
                    className={`text-neutral-400 hover:text-primary-1 cursor-pointer flex gap-2 text-sm font-medium items-center ${
                        active === "/dashboard" ? "text-primary-1" : ""
                    }`}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5'
                    >
                        <path
                            fillRule='evenodd'
                            d='M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <span className='hidden md:block'>Dashboard</span>
                </Link>
                <Link
                    href='/dashboard/users'
                    className={`text-neutral-400 hover:text-primary-1 cursor-pointer flex gap-2 text-sm font-medium items-center ${
                        active === "/dashboard/users" ? "text-primary-1" : ""
                    }`}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5'
                    >
                        <path d='M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z' />
                    </svg>
                    <span className='hidden md:block'>Users</span>
                </Link>
                <Link
                    href='/dashboard/clients'
                    className={`text-neutral-400 hover:text-primary-1 cursor-pointer flex gap-2 text-sm font-medium items-center ${
                        active === "/dashboard/clients" ? "text-primary-1" : ""
                    }`}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5'
                    >
                        <path
                            fillRule='evenodd'
                            d='M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z'
                            clipRule='evenodd'
                        />
                        <path
                            fillRule='evenodd'
                            d='M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <span className='hidden md:block'>Clients</span>
                </Link>
            </div>
        </nav>
    );
}
