import CategoryService from "@/entities/category/api/CategoryService";
import ItemService from "@/entities/item/api/ItemService";
import SupplierService from "@/entities/supplier/api/SupplierService";
import { ICategory } from "@/entities/category/models/ICategory";
import { IItem } from "@/entities/item/models/IItem";
import { ISupplier } from "@/entities/supplier/models/ISupplier";
import { useEffect, useState } from "react";
import Tabs from "./tabs";

export const HomePage = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [categories, setCategoires] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    useEffect(() => {
        ItemService.getItems().then(res => setItems(res.data))
        CategoryService.getCategorires().then(res => setCategoires(res.data))
        SupplierService.getSuppliers().then(res => setSuppliers(res.data))
    }, []);
    return <Tabs items={items} categories={categories} suppliers={suppliers} />
}
