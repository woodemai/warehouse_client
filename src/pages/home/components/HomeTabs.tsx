import { Tabs } from "@/shared/components/ui/tabs";
import HomeTabsList from "./tabs/HomeTabsList";
import { Suspense, lazy } from "react";
import { Loader } from "@/shared/components/ui/loader";
const ItemsTab = lazy(() => import("./tabs/ItemsTab"));
const SupplierTab = lazy(() => import("./tabs/SupplierTab"));
const CategoriesTab = lazy(() => import("./tabs/CategoriesTab"));

const HomeTabs = () => {
    return (
        <Tabs defaultValue="items">
            <HomeTabsList />
            <Suspense fallback={<Loader />}>
                <ItemsTab />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <SupplierTab />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <CategoriesTab />
            </Suspense>
        </Tabs>
    );
};
export default HomeTabs;