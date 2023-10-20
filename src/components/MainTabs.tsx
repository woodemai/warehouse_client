import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemList from "./item/ItemList";
import CreateCategoryForm from "./category/CreateCategoryForm";
import CategoryList from "./category/CategoryList";
import { ItemProps } from "./item/Item";
import { CategoryProps } from "./category/Category";
import { FC } from "react";
import ItemForm from "./item/ItemForm";
import SupplierList from "./supplier/SupplierList";
import { SupplierProps } from "./supplier/Supplier";
import SupplierForm from "./supplier/SupplierForm";

interface MainTabsProps {
    items: ItemProps[],
    categories: CategoryProps[],
    suppliers: SupplierProps[]
}

const MainTabs: FC<MainTabsProps> = ({
    items,
    categories,
    suppliers
}) => {
    return (
        <Tabs defaultValue="items" className="mx-auto">
            <TabsList className="flex flex-row">
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <ItemForm categories={categories} suppliers={suppliers}/>
                    <ItemList items={items} categories={categories} suppliers={suppliers}/>
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