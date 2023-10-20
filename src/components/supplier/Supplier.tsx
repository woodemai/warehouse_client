import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DeleteSupplierDialog from "./DeleteSupplierDialog";
import SupplierForm from "./SupplierForm";

export interface SupplierProps {
    id: string,
    name: string,
    inn: number
}

const Supplier: FC<SupplierProps> = ({
    id,
    name,
    inn
}) => {
    return (
        <Dialog>
            <DialogTrigger className='text-left hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md mb-4 shadow-md'>
                <h2 className="font-semiblod text-xl tracking-tight">{name}</h2>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8'>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>INN - {inn}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                    <DeleteSupplierDialog id={id} name={name} />
                    <SupplierForm updating id={id} name={name} inn={inn} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Supplier;