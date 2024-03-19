import { ReactNode } from "react";
import Sidebar from "../../components/sidebar";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <main className='grid grid-cols-12'>
            <Sidebar />
            <div className='p-4 w-[100%] col-span-10'>{children}</div>
        </main>
    );
}
