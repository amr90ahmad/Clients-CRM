import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoleByEmail } from "./lib/data";

export default async function Home() {
    const session = await getServerSession();
    if (!session) redirect("/login");
    redirect("/dashboard");
}
