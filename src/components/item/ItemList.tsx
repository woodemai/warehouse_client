import { useEffect , useState} from 'react';
import axios from 'axios';
import Item, { ItemProps } from './Item';


const ItemList = () => {
    const [items, setItems] = useState<ItemProps[]>([]);
    useEffect(() => {
        axios.get("http://localhost:8080/item").then(res =>{
            const items = res.data;
            setItems(items);
        })
    },[]);
    return ( 
    <div className='flex flex-col'>
        {items.map((item:ItemProps) => <Item key={item.id} {...item}/>)}
    </div>
     );
}
 
export default ItemList;