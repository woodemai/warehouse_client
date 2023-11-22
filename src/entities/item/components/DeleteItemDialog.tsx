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
import { useNavigate } from 'react-router-dom'
import { ItemService } from "../api/ItemService";
interface DeleteItemDialogProps {
    id: string,
    name: string,
}
const DeleteItemDialog: FC<DeleteItemDialogProps> = ({ id, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const deleteItem = () => {
        ItemService.deleteItem(id)
            .finally(() => navigate('/'))
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!open)}>
            <Button onClick={() => setIsOpen(true)} variant="destructive">Удалить</Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно хотите удалить {name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. После удаления вся информация будет навсегда
                        удалена с нашего сервера.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteItem}>Да, удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteItemDialog;