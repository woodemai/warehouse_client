import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import { ICategory } from "../models/ICategory";
import Card from "@/entities/card/Card";



export const Category = (
    { category }:
        { category: ICategory }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Card>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                </Card>
            </DialogTrigger>
            <DialogContent className='outlineflex flex-col bg-card'>
                <DialogHeader>
                    <DialogTitle>{category.name}</DialogTitle>
                    <DialogDescription>{category.description}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                </div>
            </DialogContent>
        </Dialog>
    );
}