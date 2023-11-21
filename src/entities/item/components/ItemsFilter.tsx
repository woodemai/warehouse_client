import { FC, useState, useEffect } from "react";
import { Input } from "../../../shared/components/ui/input";
import { IItem } from "@/entities/item/models/IItem";
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
        )])
    }, [items, setItems, value]);
    return <Input name="search" placeholder="Поиск..." onChange={(e) => setValue(e.target.value)} />
}

export default ItemsFilter;