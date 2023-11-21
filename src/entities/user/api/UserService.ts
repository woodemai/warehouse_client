import api, { API_URL } from "@/shared/api/http";
import { IUser } from "@/entities/user/models/IUser";
import { AxiosResponse } from "axios";

export default class UserService {
    static async getUser(id: string): Promise<AxiosResponse<IUser>> {
        return api.get<IUser>(`${API_URL}/v1/user/${id}`)
    }
    static getRole(role: string): string {        
        switch (role) {
            case "BUYER": return "Покупатель"
            case "EMPLOYEE": return "Сотрудник"
            case "SUPPLIER": return "Поставщик"
            default: return "Роль не найдена";
        }
    }
}