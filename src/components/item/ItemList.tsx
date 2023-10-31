import { FC } from 'react';
import Item from './Item';
import { IItem } from '@/models/IItem';
import { ICategory } from '@/models/ICategory';
import { ISupplier } from '@/models/ISupplier';

interface ItemListProps {
    items: IItem[],
    categories: ICategory[],
    suppliers: ISupplier[],
}

const ItemList: FC<ItemListProps> = ({
    items,
    categories,
    suppliers
}) => {
    if (!items.length) {
        return (
            <div className='transition-all durantion-600 flex justify-center items-center p-8 font-semibold tracking-tight text-2xl bg-gray-100 rounded-lg text-gray-700'>
                No item found!
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            {items.map(item => <Item key={item.id} item={item} categories={categories} suppliers={suppliers} />)}
        </div>
    );
}

export default ItemList;