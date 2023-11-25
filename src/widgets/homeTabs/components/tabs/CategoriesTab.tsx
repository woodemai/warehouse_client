import { Category, CategoryForm, CategoryService, ICategory } from "@/entities/category"
import { UserRole } from "@/entities/user"
import { List } from "@/shared/components/ui/list"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { TabsContent } from "@/shared/components/ui/tabs"
import { FormState } from "@/shared/consts/formState"
import { useStore } from "@/shared/hooks/useStore"
import { useEffect, useState } from "react"


const CategoriesTab = () => {
    const { role } = useStore().store.user;
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        CategoryService.getCategorires()
            .then(res => setCategories(res.data))
            .finally(() => setLoading(false));
    }, []);
    if (!loading) {
        return (
            <TabsContent value="categories">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    {Boolean(role === UserRole.EMPLOYEE) && <CategoryForm formState={FormState.CREATE} />}
                    <List items={categories} renderItem={(category) => <Category key={category.id} category={category} />} />
                </div>
            </TabsContent>
        )
    }
    return <Skeleton className="rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />
}
export default CategoriesTab;