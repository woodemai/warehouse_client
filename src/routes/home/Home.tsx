import MainTabs from "@/components/MainTabs";
import { ICategory } from "@/models/ICategory";
import { IItem } from "@/models/IItem";
import { ISupplier } from "@/models/ISupplier";
import CategoryService from "@/services/CategoryService";
import ItemService from "@/services/ItemService";
import SupplierService from "@/services/SupplierService";
import { useEffect, useState } from "react";

const Home = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [categories, setCategoires] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    useEffect(() => {
        ItemService.getItems().then(res => setItems(res.data))
        CategoryService.getCategorires().then(res => setCategoires(res.data))
        SupplierService.getSuppliers().then(res => setSuppliers(res.data))
    }, []);
    return <MainTabs items={items} categories={categories} suppliers={suppliers} />
}

export default Home;