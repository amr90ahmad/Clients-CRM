import { getServerSession } from "next-auth";
import UserForm from "./edit";
import { getUserByEmail } from "@/app/lib/data";
import { Suspense } from "react";
import { FormSkeleton } from "@/components/skeletons";

export default async function page() {
    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email);
    return (
        <>
            <Suspense fallback={<FormSkeleton />}>
                <UserForm user={{ ...user }} />
            </Suspense>
        </>
    );
}
