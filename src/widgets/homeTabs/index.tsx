import { Tabs } from "@/shared/components/ui/tabs";
import HomeTabsList from "./components/HomeTabsList";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
const ItemsTab = lazy(() => import("./components/tabs/ItemsTab"));
const SupplierTab = lazy(() => import("./components/tabs/SupplierTab"));
const CategoriesTab = lazy(() => import("./components/tabs/CategoriesTab"));

const HomeTabs = () => {
    return (
        <Tabs defaultValue="items">
            <HomeTabsList />
            <Suspense fallback={<Skeleton className="rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />}>
                <ItemsTab />
            </Suspense>
            <Suspense fallback={<Skeleton className="rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />}>
                <SupplierTab />
            </Suspense>
            <Suspense fallback={<Skeleton className="rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />}>
                <CategoriesTab />
            </Suspense>
        </Tabs>
    );
};
export default HomeTabs;