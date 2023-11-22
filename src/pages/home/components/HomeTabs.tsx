import { FormState } from "../../../shared/consts/formState";
import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ISupplier, Supplier, SupplierForm, SupplierService } from "@/entities/supplier";
import { Category, CategoryForm, CategoryService, ICategory } from "@/entities/category";
import { IItem, Item, ItemForm, ItemService, ItemsFilter } from "@/entities/item";
import { List } from "@/shared/components/ui/list";

const HomeTabs: FC = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [categories, setCategoires] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    useEffect(() => {
        ItemService.getItems().then(res => setItems(res.data));
        CategoryService.getCategorires().then(res => setCategoires(res.data));
        SupplierService.getSuppliers().then(res => setSuppliers(res.data));
    }, []);
    const [filteredItems, setFilteredItems] = useState(items);
    return (
        <Tabs defaultValue="items">
            <TabsList className=" text-gray-800 mx-auto w-full bg-transperent">
                <TabsTrigger value="items">Предметы</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
                <TabsTrigger value="suppliers">Поставщики</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <ItemForm categories={categories} suppliers={suppliers} formState={FormState.CREATE} />
                    <ItemsFilter items={items} setItems={setFilteredItems} />
                    <List items={filteredItems} renderItem={(item) => <Item key={item.id} item={item} />} />
                </div>
            </TabsContent>
            <TabsContent value="categories">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <CategoryForm formState={FormState.CREATE} />
                    <List items={categories} renderItem={(category) => <Category key={category.id} category={category} />} />
                </div>
            </TabsContent>
            <TabsContent value="suppliers">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <SupplierForm formState={FormState.CREATE} />
                    <List items={suppliers} renderItem={(supplier) => <Supplier key={supplier.id} supplier={supplier} />} />
                </div>
            </TabsContent>
        </Tabs>

    );
};
export default HomeTabs;