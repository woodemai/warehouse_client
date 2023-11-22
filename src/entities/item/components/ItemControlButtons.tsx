import { UserRole } from "@/entities/user/consts/UserRole";
import { IItem, ItemForm } from "..";
import DeleteItemDialog from "./DeleteItemDialog";
import { useStore } from "@/shared/hooks/useStore";
import { FormState } from "@/shared/consts/formState";
import { CategoryService, ICategory } from "@/entities/category";
import { ISupplier, SupplierService } from "@/entities/supplier";
import { FC, useEffect, useState } from "react";

interface ItemControlButtonsProps {
    item: IItem,
}
const ItemControlButtons: FC<ItemControlButtonsProps> = ({
    item
}) => {
    const { store } = useStore()
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    useEffect(() => {
        CategoryService.getCategorires().then(res => setCategories(res.data))
        SupplierService.getSuppliers().then(res => setSuppliers(res.data))
    }, []);
    if (store.user.role === UserRole.EMPLOYEE) {
        return (
            <div className='flex flex-row justify-between'>
                <DeleteItemDialog id={item.id} name={item.name} />
                <ItemForm
                    categories={categories}
                    suppliers={suppliers}
                    item={item}
                    formState={FormState.UPDATE} />
            </div>
        )
    }
    else return null;
}
export default ItemControlButtons;