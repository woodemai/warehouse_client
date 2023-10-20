import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import axios from "axios";
import { FC } from "react";
interface DeleteItemDialogProps {
    id: string
    name: string
}
const DeleteSupplierDialog:FC<DeleteItemDialogProps> = ({id,name}) => {
    const deleteSupplier = () => {
        axios.delete(`http://localhost:8080/supplier/${id}`)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><Button variant="destructive">Delete</Button></AlertDialogTrigger>
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