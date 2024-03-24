import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: ReactNode }) {
    const session = await getServerSession();
    if (!session) redirect("/login");
    return <>{children}</>;
}
