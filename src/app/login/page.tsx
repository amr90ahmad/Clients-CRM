import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./form";

export default async function page() {
    const session = await getServerSession();
    if (session) redirect("/dashboard");
    return (
        <div className='flex flex-col h-[100vh] justify-center'>
            <Form />
        </div>
    );
}
