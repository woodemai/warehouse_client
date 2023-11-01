import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { FC, useState } from "react";
import { IItem } from "@/models/IItem";
import ItemService from "@/services/ItemService";
import {useNavigate} from 'react-router-dom'
interface DeleteItemDialogProps {
    item: IItem
}
const DeleteItemDialog: FC<DeleteItemDialogProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const deleteItem = () => {
        ItemService.deleteItem(item.id)
            .finally(() => navigate('/'))
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!open)}>
            <Button onClick={() => setIsOpen(true)} variant="destructive">Удалить</Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно хотите удалить {item.name}?</AlertDialogTitle>
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