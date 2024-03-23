import { Button } from "@/components/ui/button";
import { deleteService } from "@/app/lib/actions";

export default function DeleteService({ id }: { id: number }) {
    return (
        <Button variant='destructive' onClick={() => deleteService(id)}>
            DELETE
        </Button>
    );
}
