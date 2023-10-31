import { FC, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { ItemProps } from "./Item";
import { IItem } from "@/models/IItem";
interface ItemsFilterProps {
    items: IItem[]
    setItems: (items: IItem[]) => void
}

const ItemsFilter: FC<ItemsFilterProps> = ({
    items,
    setItems
}) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setItems([...items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())
            || item.description.toLowerCase().includes(value.toLowerCase())
            || item.category.name.toLowerCase().includes(value.toLowerCase())
            || item.category.description.toLowerCase().includes(value.toLowerCase())
            || item.supplier.name.toLowerCase().includes(value.toLowerCase())
        )])
    }, [value, setItems, items]);
    return <Input name="search" placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
}

export default ItemsFilter;