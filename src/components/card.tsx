import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CardComponent({ title = "Pageviews", info = "50.9K" }) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle>{info}</CardTitle>
            </CardHeader>
        </Card>
    );
}
