import { FC} from 'react';
import Item, { ItemProps } from './Item';
import { CategoryProps } from '../category/Category';

interface ItemListProps {
    items: ItemProps[],
    categories: CategoryProps[]
}

const ItemList:FC<ItemListProps> = ({
    items,
    categories
}) => {
    return ( 
    <div className='flex flex-col'>
        {items.map((item:ItemProps) => <Item 
        key={item.id}
        categories={categories}
        id={item.id}
        name={item.name}
        description={item.description}
        manufacturer={item.manufacturer}
        storageCondition={item.storageCondition}
        weight={item.weight}
        price={item.price}
        expirationDate={item.expirationDate}
        productionDate={item.productionDate}
        category={item.category} />)}
    </div>
     );
}
 
export default ItemList;