import { ISupplier, Supplier, SupplierForm, SupplierService } from "@/entities/supplier";
import { UserRole } from "@/entities/user";
import { List } from "@/shared/components/ui/list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TabsContent } from "@/shared/components/ui/tabs";
import { FormState } from "@/shared/consts/formState";
import { useStore } from "@/shared/hooks/useStore";
import { useEffect, useState } from "react";


const SupplierTab = () => {
    const { role } = useStore().store.user;
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [updated, setUpdated] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (updated) {
            setLoading(true)
            SupplierService.getSuppliers()
                .then(res => setSuppliers(res.data))
                .finally(() => {
                    setUpdated(false);
                    setLoading(false);
                });
        }
    }, [updated]);
    if (!loading) {
        return (
            <TabsContent value="suppliers">
                <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                    {Boolean(role === UserRole.EMPLOYEE) && <SupplierForm setUpdated={setUpdated} formState={FormState.CREATE} />}
                    <List items={suppliers} renderItem={(supplier) => <Supplier key={supplier.id} supplier={supplier} />} />
                </div>
            </TabsContent>
        )
    }
    return <Skeleton className="rounded-lg md:max-w-lg lg:max-w-xl w-[250px]" />

}
export default SupplierTab;