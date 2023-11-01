import { FC, useEffect, useState } from 'react';
import DeleteItemDialog from './DeleteItemDialog';
import { Separator } from "@/components/ui/separator"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ItemForm from './ItemForm';
import { ICategory } from '@/models/ICategory';
import { ISupplier } from '@/models/ISupplier';
import { IItem } from '@/models/IItem';
import SupplierService from '@/services/SupplierService';
import CategoryService from '@/services/CategoryService';
import { FormState } from '../../models/formState';

export interface ItemProps {
    item: IItem
}

const Item: FC<ItemProps> = ({
    item
}) => {
    const [supplier, setSupplier] = useState<ISupplier>({} as ISupplier)
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        const category = categories.find(category => category.id === item.categoryId);
        if (category !== undefined) {
            setCategory(category)
        }
        const supplier = suppliers.find(supplier => supplier.id === item.supplierId);
        if (supplier !== undefined) {
            setSupplier(supplier)
        }
    }, [item.categoryId, item.supplierId, categories, suppliers]);
    useEffect(() => {
        SupplierService.getSuppliers().then(res => setSuppliers(res.data))
        CategoryService.getCategorires().then(res => setCategories(res.data))
    }, []);
    return (
        <Dialog>
            <DialogTrigger>
                <div className='bg-background hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md shadow-md'>
                    <div className='leading-6'>
                        <div className='mb-4'>
                            <div className='flex flex-row gap-4 items-end'>
                                <div className='font-semibold text-xl tracking-tight'>
                                    <h2>{item.name}</h2>
                                </div>
                                <div className='font-bold text-xl tracking-tight text-green-600'>
                                    {item.price} ₽
                                </div>
                            </div>
                            <div className='font-light text-left'>
                                <p>{supplier.name}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-left'>Описание</h3>
                            <p className='text-left tracking-wide font-light text-sm'>{item.description}</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-4'>
                <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>{category.name}</DialogDescription>
                </DialogHeader>
                <div>
                    <div>Описание</div>
                    <div className='font-light'>{item.description}</div>
                </div>
                <Separator />
                <div>
                    <div>Поставщик</div>
                    <div className='font-light'>{supplier.name}</div>
                </div>
                <Separator />
                <div>
                    <div>Условия хранения</div>
                    <div className='font-light'>{item.storageCondition}</div>
                </div>
                <Separator />
                <div className='flex flex-row gap-x-8'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Цена</div>
                        <div className='font-light'>{item.price}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Вес</div>
                        <div className='font-light'>{item.weight}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Дата производства</div>
                        <div className='font-light'>{String(item.productionDate)}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Годен до</div>
                        <div className='font-light'>{String(item.expirationDate)}</div>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <DeleteItemDialog item={item} />
                    <ItemForm
                        categories={categories}
                        suppliers={suppliers}
                        item={item}
                        formState={FormState.UPDATE} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Item;