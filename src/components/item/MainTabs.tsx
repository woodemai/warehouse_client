import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemList from "./ItemList";
import CreateCategoryForm from "../category/CreateCategoryForm";
import CategoryList from "../category/CategoryList";
import { ItemProps } from "./Item";
import { CategoryProps } from "../category/Category";
import { FC } from "react";
import ItemForm from "./ItemForm";

interface MainTabsProps {
    items: ItemProps[],
    categories: CategoryProps[]
}

const MainTabs: FC<MainTabsProps> = ({
    items,
    categories
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
                    <ItemForm categories={categories} />
                    <ItemList items={items} categories={categories} />
                </div>
            </TabsContent>
            <TabsContent value="categories">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    <CreateCategoryForm />
                    <CategoryList categories={categories} />
                </div>
            </TabsContent>
            <TabsContent value="suppliers">Suppliers</TabsContent>
        </Tabs>

    );
}

export default MainTabs;