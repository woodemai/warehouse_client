import { ICategory } from "@/entities/category"
import { ISupplier } from "@/entities/supplier"

export interface IItem {
    id: string,
    name:string,
    description:string,
    productionDate: Date,
    expirationDate: Date,
    storageCondition: string,
    supplier: ISupplier
    category: ICategory
    weight: number,
    price: number
}