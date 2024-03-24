import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchServices } from "@/app/lib/data";
import DeleteService from "./delete";

export default async function ServicesMenu() {
    const services = await fetchServices();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Services</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=''>
                <DropdownMenuLabel>Services</DropdownMenuLabel>
                <ScrollArea className='h-72'>
                    {services?.map((s) => (
                        <DropdownMenuItem
                            key={s.id}
                            className='flex justify-between w-48'
                        >
                            <span>{s.name}</span>
                            <DeleteService id={s.id} />
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
