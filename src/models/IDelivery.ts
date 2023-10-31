export interface IDelivery {
    id: string,
    addressFrom: string,
    addressTo: string,
    dateFrom: string,
    dateTo: string,
    status: string,
    progress: number,
    buyerId: string
}