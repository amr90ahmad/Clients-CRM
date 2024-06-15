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
                    {title}
                </CardDescription>
                <CardTitle className='flex gap-4 items-center justify-between'>
                    {info}
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
