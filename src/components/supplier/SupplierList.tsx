import { FC } from "react";
import Supplier, { SupplierProps } from "./Supplier";
interface SupplierListProps {
    suppliers: SupplierProps[]
}

const SupplierList:FC<SupplierListProps> = ({
    suppliers
}) => {
    return ( 
        <div className='flex flex-col'>
        {suppliers.map((supplier: SupplierProps) => <Supplier key={supplier.id} {...supplier} />)}
    </div>
     );
}
 
export default SupplierList;