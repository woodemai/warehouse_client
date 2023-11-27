import { IItem, Item, ItemForm, ItemService, ItemsFilter } from "@/entities/item"
import { UserRole } from "@/entities/user"
import { List } from "@/shared/components/ui/list"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { TabsContent } from "@/shared/components/ui/tabs"
import { FormState } from "@/shared/consts/formState"
import { useStore } from "@/shared/hooks/useStore"
import { useEffect, useState } from "react"


const ItemsTab = () => {
    const { role } = useStore().store.user;
    const [items, setItems] = useState<IItem[]>([]);
    const [filteredItems, setFilteredItems] = useState(items);
    const [updated, setUpdated] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (updated) {
            setLoading(true)
            ItemService.getItems()
                .then(res => setItems(res.data))
                .finally(() => {
                    setUpdated(false);
                    setLoading(false);
                });
        }
    }, [updated]);
    if (!loading) {
        return (
            <TabsContent value="items">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    {Boolean(role === UserRole.EMPLOYEE) && <ItemForm setUpdated={setUpdated} formState={FormState.CREATE} />}
                    <ItemsFilter items={items} setItems={setFilteredItems} />
                    <List items={filteredItems} renderItem={(item) => <Item key={item.id} item={item} />} />
                </div>
            </TabsContent>
        )
    } else {
        return <Skeleton className="bg-black rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />
    }
}
export default ItemsTab;