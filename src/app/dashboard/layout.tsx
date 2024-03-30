import { ReactNode } from "react";
import Sidebar from "../../components/sidebar";
import Provider from "@/components/Provider";
import ModeToggle from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/app/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from '@/components/logout'

export default async function layout({ children }: { children: ReactNode }) {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);

    
    return (
        <main className='grid grid-cols-12 md:grid-cols-main'>
            <Provider>
                <aside className='items-center col-span-2 md:col-span-1 md:items-start flex flex-col border-r-2 shadow-md min-h-[100vh]'>
                    <Sidebar />
                </aside>
            </Provider>
            <div className='p-4 col-span-10 md:col-span-1'>
                <header className='flex justify-between items-center flex-wrap-reverse gap-4 mb-8'>
                    <h4 className='my-4 font-semibold'>
                        Welcome back, {user?.name || user?.email}
                    </h4>
                    <div className='flex gap-2 ml-auto'>
                        <ModeToggle />
                        {/* <Logout /> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src='https://github.com/shadcn.png'
                                        alt='@shadcn'
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href='/dashboard/profile'>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            Invite users
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Message
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    More...
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        New Team
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <Logout/>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                {children}
            </div>
        </main>
    );
}
