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
import { FormState } from "@/models/formState";

export interface SupplierProps {
    supplier: ISupplier
}

const Supplier: FC<SupplierProps> = ({
    supplier
}) => {
    return (
        <Dialog>
            <DialogTrigger className='bg-background text-left hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md shadow-md'>
                <h2 className="font-semiblod text-xl tracking-tight">{supplier.name}</h2>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8'>
                <DialogHeader>
                    <DialogTitle>{supplier.name}</DialogTitle>
                    <DialogDescription>ИНН - {supplier.inn}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                    <DeleteSupplierDialog supplier={supplier} />
                    <SupplierForm formState={FormState.UPDATE} supplier={supplier}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Supplier;