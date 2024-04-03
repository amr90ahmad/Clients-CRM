import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Users2Icon,
    FilesIcon,
    DollarSignIcon,
    FoldersIcon,
    ArrowUpRightIcon,
} from "lucide-react";

export default function CardComponent({
    title,
    info,
}: {
    title: string;
    info: number;
}) {
    return (
        <Card>
            <CardHeader>
                <CardDescription className='flex gap-1 items-end'>
                    {title === "Users" ? (
                        <Users2Icon />
                    ) : title === "Clients" ? (
                        <FoldersIcon />
                    ) : title === "Transactions" ? (
                        <FilesIcon />
                    ) : (
                        <DollarSignIcon />
                    )}{" "}
                    {title}
                </CardDescription>
                <CardTitle className='flex gap-4 items-center justify-between'>
                    {info}{" "}
                    <div className='py-1 px-2 text-sm text-green-600 border border-green-700 rounded flex gap-2  items-center bg-green-500 bg-opacity-20'>
                        25.4% <ArrowUpRightIcon />
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
