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
import { ISupplier } from "@/models/ISupplier";

export interface SupplierProps {
    supplier: ISupplier
}

const Supplier: FC<SupplierProps> = ({
    supplier
}) => {
    return (
        <Dialog>
            <DialogTrigger className='text-left hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md mb-4 shadow-md'>
                <h2 className="font-semiblod text-xl tracking-tight">{supplier.name}</h2>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8'>
                <DialogHeader>
                    <DialogTitle>{supplier.name}</DialogTitle>
                    <DialogDescription>INN - {supplier.inn}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                    <DeleteSupplierDialog id={supplier.id} name={supplier.name} />
                    <SupplierForm updating id={supplier.id} name={supplier.name} inn={supplier.inn} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Supplier;