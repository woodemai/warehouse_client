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
const DeleteSupplierDialog: FC<DeleteItemDialogProps> = ({ id, name }) => {
    const [open, setOpen] = useState(false);
    const deleteSupplier = () => {
        axios.delete(`http://localhost:8080/suppliers/${id}`)
    }
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <Button onClick={() => setOpen(true)} variant="destructive">Delete</Button>
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
                    <AlertDialogAction onClick={deleteSupplier}>Yes, delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteSupplierDialog;