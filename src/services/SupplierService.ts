import api from "@/lib/http";
import { ISupplier } from "@/models/ISupplier";
import { AxiosResponse } from "axios";

export default class SupplierService {
    static async getSuppliers(): Promise<AxiosResponse<ISupplier[]>> {
        return api.get<ISupplier[]>(`/v1/suppliers`)
    }
    static async createSupplier(name: string, inn: number) :Promise<AxiosResponse<ISupplier>> {
        return api.post<ISupplier>(`v1/suppliers`, {name, inn})
    }
    static async getSupplier(id: string): Promise<AxiosResponse<ISupplier>> {
        return api.get<ISupplier>(`/v1/suppliers/${id}`)
    }

}