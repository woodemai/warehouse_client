import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export interface CategoryProps {
    id: string,
    name: string,
    description: string
}

const Category: FC<CategoryProps> = ({
    id,
    name,
    description
}) => {
    return (
        <Dialog>
            <DialogTrigger className='flex flex-col hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl justify-between p-4 border-gray-300 text-gray-700 border rounded-md mb-4 shadow-md'>
                <h2 className="font-semiblod text-xl tracking-tight">{name}</h2>
                <p className='font-light'>{description}</p>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8'>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Category;