import { ISupplier, Supplier, SupplierForm, SupplierService } from "@/entities/supplier";
import { UserRole } from "@/entities/user";
import { List } from "@/shared/components/ui/list";
import { TabsContent } from "@/shared/components/ui/tabs";
import { FormState } from "@/shared/consts/formState";
import { useStore } from "@/shared/hooks/useStore";
import { useEffect, useState } from "react";


const SupplierTab = () => {
    const { role } = useStore().store.user;
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    useEffect(() => {
        SupplierService.getSuppliers().then(res => setSuppliers(res.data));
    }, []);
    return (
        <TabsContent value="suppliers">
            <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
                {Boolean(role === UserRole.EMPLOYEE) && <SupplierForm formState={FormState.CREATE} />}
                <List items={suppliers} renderItem={(supplier) => <Supplier key={supplier.id} supplier={supplier} />} />
            </div>
        </TabsContent>
    )
}
export default SupplierTab;