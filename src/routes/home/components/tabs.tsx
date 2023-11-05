import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoryForm from "../../../components/category/CategoryForm";
import { FC, useState } from "react";
import ItemForm from "../../../components/item/ItemForm";
import SupplierForm from "../../../components/supplier/SupplierForm";
import ItemsFilter from "../../../components/item/ItemsFilter";
import { IItem } from "@/models/IItem";
import { ICategory } from "@/models/ICategory";
import { ISupplier } from "@/models/ISupplier";
import { FormState } from "../../../models/formState";
import List from "../../../components/ui/list";
import Item from "../../../components/item/Item";
import Category from "../../../components/category/Category";
import Supplier from "../../../components/supplier/Supplier";

interface TabsProps {
    items: IItem[],
    categories: ICategory[],
    suppliers: ISupplier[]
}

const HomeTabs: FC<TabsProps> = ({
    items,
    categories,
    suppliers
}) => {
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
}

export default HomeTabs;