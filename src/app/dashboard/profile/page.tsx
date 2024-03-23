import { getServerSession } from "next-auth";
import UserForm from "./user-form";
import { getUserByEmail } from "@/app/lib/data";

export default async function page() {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    return <UserForm user={{ ...user }} />;
}
