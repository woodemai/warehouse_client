import api from "@/shared/api/http";
import { IItem } from "@/entities/item/models/IItem";
import { AxiosResponse } from "axios";

type CreatedItem = Omit<IItem, 'id'>

export default class ItemService {
    static async getItems(): Promise<AxiosResponse<IItem[]>> {
        return api.get<IItem[]>(`/v1/items`)
    }
    static async get(id: string): Promise<AxiosResponse<IItem>> {
        return api.get<IItem>(`/v1/items/${id}`)
    }
    static async createItem(item: CreatedItem): Promise<AxiosResponse<IItem>> {
        return api.post<IItem>('/v1/items', item);
    }
    static async updateItem(item: IItem, id: string): Promise<AxiosResponse<IItem>> {
        return api.patch<IItem>(`/v1/items/${id}`, item);
    }
    static async deleteItem(id: string): Promise<void> {
        return api.delete(`/v1/items/${id}`)
    }

}