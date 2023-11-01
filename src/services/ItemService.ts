import api from "@/lib/http";
import { IItem } from "@/models/IItem";
import { AxiosResponse } from "axios";

interface CreatedItem {
    name: string,
    description: string,
    productionDate: Date,
    expirationDate: Date,
    storageCondition: string,
    supplierId: string,
    categoryId: string,
    weight: number,
    price: number,
}

export default class ItemService {
    static async getItems(): Promise<AxiosResponse<IItem[]>> {
        return api.get<IItem[]>(`/v1/items`)
    }
    static async createItem(item: CreatedItem): Promise<AxiosResponse<IItem>> {
        return api.post<IItem>('/v1/items', item);
    }
    static async updateItem(item: CreatedItem, id: string): Promise<AxiosResponse<IItem>> {
        return api.patch<IItem>(`/v1/items/${id}`, item);
    }
    static async deleteItem(id: string): Promise<void> {
        return api.delete(`/v1/items/${id}`)
    }

}