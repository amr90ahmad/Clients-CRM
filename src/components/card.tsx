import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
                <CardDescription>{title}</CardDescription>
                <CardTitle>{info}</CardTitle>
            </CardHeader>
        </Card>
    );
}
