import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"
import { Button } from "../../../shared/components/ui/button";
import { FC, useState } from "react";
import SupplierService from "@/entities/supplier/api/SupplierService";
import { ISupplier } from "@/entities/supplier/models/ISupplier";
interface DeleteItemDialogProps {
    supplier: ISupplier
}
const DeleteSupplierDialog: FC<DeleteItemDialogProps> = ({
    supplier
}) => {
    const { id, name } = supplier;
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <Button onClick={() => setOpen(true)} variant="destructive">Удалить</Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно хотите удалить {name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. После удаления вся информация будет навсегда 
                        удалена с нашего сервера.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отменить</AlertDialogCancel>
                    <AlertDialogAction onClick={() => SupplierService.deleteSupplier(id)}>Да, удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteSupplierDialog;