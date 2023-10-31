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
import { FormState } from './formState';

export interface ItemProps {
    item: IItem
    categories: ICategory[]
    suppliers: ISupplier[]
}

const Item: FC<ItemProps> = ({
    item,
    categories,
    suppliers
}) => {
    const [supplier, setSupplier] = useState<ISupplier>({} as ISupplier)
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    useEffect(() => {
        if (item.supplierId) {
            SupplierService.getSupplier(item.supplierId)
                .then(res => setSupplier(res.data))
        }
        if (item.categoryId) {
            CategoryService.getCategory(item.categoryId)
                .then(res => setCategory(res.data))
        }
    }, [item.categoryId, item.supplierId]);
    return (
        <Dialog>
            <DialogTrigger>
                <div className='hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md mb-4 shadow-md'>
                    <div className='leading-6'>
                        <div className='mb-4'>
                            <div className='flex flex-row gap-4 items-end'>
                                <div className='font-semibold text-xl tracking-tight'>
                                    <h2>{item.name}</h2>
                                </div>
                                <div className='font-bold text-xl tracking-tight text-green-600'>
                                    {item.price}₽
                                </div>
                            </div>
                            <div className='font-light text-left'>
                                <p>{supplier.name}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-left'>Description</h3>
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
                    <div>Description</div>
                    <div className='font-light'>{item.description}</div>
                </div>
                <Separator />
                <div>
                    <div>Supplier</div>
                    <div className='font-light'>{supplier.name}</div>
                </div>
                <Separator />
                <div>
                    <div>Storage condition</div>
                    <div className='font-light'>{item.storageCondition}</div>
                </div>
                <Separator />
                <div className='flex flex-row gap-x-8'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Price</div>
                        <div className='font-light'>{item.price}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Weight</div>
                        <div className='font-light'>{item.weight}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Production date</div>
                        <div className='font-light'>{item.productionDate}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Expiration Date</div>
                        <div className='font-light'>{item.expirationDate}</div>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <DeleteItemDialog name={item.name} id={item.id} />
                    <ItemForm
                        categories={categories}
                        suppliers={suppliers}
                        supplier={supplier}
                        category={category}
                        item={item}
                        formState={FormState.UPDATE} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Item;