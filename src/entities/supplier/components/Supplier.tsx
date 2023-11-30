import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import DeleteSupplierDialog from "./DeleteSupplierDialog";
import { ISupplier } from "@/entities/supplier/models/ISupplier";
import { FormState } from "@/shared/consts/formState";
import { SupplierForm } from "..";
import Card from "@/entities/card/Card";

export interface SupplierProps {
    supplier: ISupplier
}

export const Supplier: FC<SupplierProps> = ({
    supplier
}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Card>
                    <h3>{supplier.name}</h3>
                </Card>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8 bg-card'>
                <DialogHeader>
                    <DialogTitle>{supplier.name}</DialogTitle>
                    <DialogDescription>ИНН - {supplier.inn}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-row justify-between'>
                    <DeleteSupplierDialog supplier={supplier} />
                    <SupplierForm formState={FormState.UPDATE} supplier={supplier} />
                </div>
            </DialogContent>
        </Dialog>
    );
}