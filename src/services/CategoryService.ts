import api from "@/lib/http";
import { ICategory } from "@/models/ICategory";
import { AxiosResponse } from "axios";

export default class CategoryService {
    static async getCategorires(): Promise<AxiosResponse<ICategory[]>> {
        return api.get<ICategory[]>(`/v1/categories`)
    }
    static async createCategory(name: string, description: string): Promise<AxiosResponse<ICategory>> {
        return api.post<ICategory>('/v1/categories', {name, description});
    }
    static async getCategory(id: string): Promise<AxiosResponse<ICategory>> {
        return api.get<ICategory>(`/v1/categories/${id}`)
    }
}