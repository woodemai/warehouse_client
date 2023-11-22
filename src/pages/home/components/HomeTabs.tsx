import { Tabs } from "@/shared/components/ui/tabs";
import ItemsTab from "./tabs/ItemsTab";
import CategoriesTab from "./tabs/CategoriesTab";
import SupplierTab from "./tabs/SupplierTab";
import HomeTabsList from "./tabs/HomeTabsList";
// const SupplierTab = lazy(() => import("./tabs/SupplierTab"));
// const CategoriesTab = lazy(() => import("./tabs/CategoriesTab"));

const HomeTabs = () => {
    return (
        <Tabs defaultValue="items">
            <HomeTabsList />
            <ItemsTab />
            <CategoriesTab />
            <SupplierTab />
        </Tabs>
    );
};
export default HomeTabs;