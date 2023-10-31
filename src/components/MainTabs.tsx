import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemList from "./item/ItemList";
import CreateCategoryForm from "./category/CreateCategoryForm";
import CategoryList from "./category/CategoryList";
import { FC, useState } from "react";
import ItemForm from "./item/ItemForm";
import SupplierList from "./supplier/SupplierList";
import SupplierForm from "./supplier/SupplierForm";
import ItemsFilter from "./item/ItemsFilter";
import { IItem } from "@/models/IItem";
import { ICategory } from "@/models/ICategory";
import { ISupplier } from "@/models/ISupplier";
import { FormState } from "./item/formState";

interface MainTabsProps {
    items: IItem[],
    categories: ICategory[],
    suppliers: ISupplier[]
}

const MainTabs: FC<MainTabsProps> = ({
    items,
    categories,
    suppliers
}) => {
    const [filteredItems, setFilteredItems] = useState(items);
    return (
        <Tabs defaultValue="items" className="mx-auto">
            <TabsList className="flex flex-row">
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <ItemForm categories={categories} suppliers={suppliers} formState={FormState.CREATE}/>
                    <ItemsFilter items={items} setItems={setFilteredItems} />
                    <ItemList items={filteredItems} categories={categories} suppliers={suppliers}/>
                </div>
            </TabsContent>
            <TabsContent value="categories">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <CreateCategoryForm />
                    <CategoryList categories={categories} />
                </div>
            </TabsContent>
            <TabsContent value="suppliers">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <SupplierForm/>
                    <SupplierList suppliers={suppliers} />
                </div>
            </TabsContent>
        </Tabs>

    );
}

export default MainTabs;