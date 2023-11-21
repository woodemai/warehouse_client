import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import { ICategory } from "@/entities/category/models/ICategory";

export interface CategoryProps {
    category: ICategory
}

const Category: FC<CategoryProps> = ({
    category
}) => {
    return (
        <Dialog>
            <DialogTrigger className='bg-background flex flex-col hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl justify-between p-4 border-gray-300 text-gray-700 border rounded-md shadow-md'>
                <h2 className="font-semiblod text-xl tracking-tight">{category.name}</h2>
                <p className='font-light'>{category.description}</p>
            </DialogTrigger>
            <DialogContent className='outlineflex flex-col gap-y-8'>
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

export default Category;