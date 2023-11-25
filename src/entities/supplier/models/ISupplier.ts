export interface ISupplier {
    id: string,
    name: string,
    inn: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}