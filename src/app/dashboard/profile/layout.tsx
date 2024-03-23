import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: ReactNode }) {
    const session = await getServerSession();
    if (!session) redirect("/login");
    return (
        <div className='flex gap-24 mt-24'>
            <div className='flex flex-col gap-4  pr-14 border-r-2 border-border-clr'>
                <Link
                    href='/dashboard/profile'
                    className='text-neutral-400 hover:bg-primary-2 rounded-md p-2 hover:text-neutral-100'
                >
                    Details
                </Link>
                <Link
                    href='/dashboard/profile/services'
                    className='text-neutral-400 hover:bg-primary-2 rounded-md p-2 hover:text-neutral-100'
                >
                    Services
                </Link>
            </div>
            <div className='w-[80%] mx-auto'>{children}</div>
        </div>
    );
}
