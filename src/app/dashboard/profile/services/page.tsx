import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ServiceForm from "./add-service";
import ServicesMenu from './services'

export default async function Services() {

    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
                <ServiceForm />
                <ServicesMenu />
            </CardContent>
        </Card>
    );
}
