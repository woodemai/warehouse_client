import { FC } from "react";
import Supplier from "./Supplier";
import { ISupplier } from "@/models/ISupplier";
interface SupplierListProps {
    suppliers: ISupplier[]
}

const SupplierList:FC<SupplierListProps> = ({
    suppliers
}) => {
    return ( 
        <div className='flex flex-col'>
        {suppliers.map(supplier => <Supplier key={supplier.id} supplier={supplier} />)}
    </div>
     );
}
 
export default SupplierList;