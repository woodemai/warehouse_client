import { FC} from 'react';
import Item, { ItemProps } from './Item';
import { CategoryProps } from '../category/Category';
import { SupplierProps } from '../supplier/Supplier';

interface ItemListProps {
    items: ItemProps[],
    categories: CategoryProps[],
    suppliers: SupplierProps[],
}

const ItemList:FC<ItemListProps> = ({
    items,
    categories,
    suppliers
}) => {
    return ( 
    <div className='flex flex-col'>
        {items.map((item:ItemProps) => <Item 
        key={item.id}
        categories={categories}
        id={item.id}
        name={item.name}
        description={item.description}
        supplier={item.supplier}
        storageCondition={item.storageCondition}
        weight={item.weight}
        price={item.price}
        expirationDate={item.expirationDate}
        productionDate={item.productionDate}
        category={item.category} 
        suppliers={suppliers}/>)}
    </div>
     );
}
 
export default ItemList;