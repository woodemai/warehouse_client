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
import axios from "axios";
import { FC, useState } from "react";
interface DeleteItemDialogProps {
    id: string
    name: string
}
const DeleteItemDialog:FC<DeleteItemDialogProps> = ({id,name}) => {
    const [isOpen, setIsOpen] = useState(false);
    const deleteItem = () => {
        axios.delete(`http://localhost:8080/item/${id}`)
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!open)}>
            <Button onClick={() => setIsOpen(true)} variant="destructive">Delete</Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your item
                        and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteItem}>Yes, delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteItemDialog;