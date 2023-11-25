export interface ICategory {
    id: string,
    name: string,
    description: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}