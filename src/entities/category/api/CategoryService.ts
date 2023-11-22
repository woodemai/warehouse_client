import api from "@/shared/api/http";
import { ICategory } from "@/entities/category/models/ICategory";
import { AxiosResponse } from "axios";

export class CategoryService {
    static async getCategorires(): Promise<AxiosResponse<ICategory[]>> {
        return api.get<ICategory[]>(`/v1/categories`);
    }
    static async createCategory(name: string, description: string): Promise<AxiosResponse<ICategory>> {
        return api.post<ICategory>('/v1/categories', {name, description});
    }
    static async getCategory(id: string): Promise<AxiosResponse<ICategory>> {
        return api.get<ICategory>(`/v1/categories/${id}`);
    }
    static async updateCategory(category: ICategory) :Promise<AxiosResponse<ICategory>> {
        return api.patch<ICategory>(`/v1/categories/${category.id}`, {category});
    }
}