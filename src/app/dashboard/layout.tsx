import { ReactNode } from "react";
import Sidebar from "../../components/sidebar";
import Provider from "@/components/Provider";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <main className='grid grid-cols-12'>
            <Provider>
                <aside className='items-center lg:items-start col-span-2 flex flex-col gap-10 border-r-2 border-primary-2 pt-8 p-2 lg:p-6 shadow-lg min-h-[100vh] bg-neutral-800'>
                    <Sidebar />
                </aside>
            </Provider>
            <div className='p-4 col-span-10'>{children}</div>
        </main>
    );
}
