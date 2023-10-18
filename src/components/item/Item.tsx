import {FC} from 'react';
import styles from './item.module.css';

export interface ItemProps {
    id: string
    name: string
    description: string
    manufacturer: string
    productionDate: Date
    expirationDate: Date
    storageCondition: string
    weight: number
    price: number
}

const Item:FC<ItemProps> = ({
    id,
    name,
    description,
    manufacturer,
    productionDate,
    expirationDate,
    storageCondition,
    weight,
    price
}) => {
    return ( 
    <div className={styles.item}>
        <div>{name}</div>
        <div>{description}</div>
        <div>{manufacturer}</div>
        <div>{weight}</div>
    </div> );
}
 
export default Item;