import React, { useEffect , useState} from 'react';
import axios from 'axios';
import Item, { ItemProps } from './item/Item';


const ItemList = () => {
    const [items, setItems] = useState<ItemProps[]>([]);
    useEffect(() => {
        axios.get("http://localhost:8080/item").then(res =>{
            const items = res.data;
            setItems(items);
        })
    },[]);
    return ( 
    <>
    <ul>
        {items.map((item:ItemProps) => <Item key={item.id} {...item}/>)}
    </ul>
    </>
     );
}
 
export default ItemList;