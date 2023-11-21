export interface IItem {
    id: string,
    name:string,
    description:string,
    productionDate: Date,
    expirationDate: Date,
    storageCondition: string,
    supplierId: string,
    categoryId: string,
    weight: number,
    price: number
}