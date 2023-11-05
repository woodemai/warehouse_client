import api, { BASE_URL } from "@/lib/http";
import { IUser } from "@/models/IUser";
import { AxiosResponse } from "axios";

export default class UserService {
    static async getUser(id: string): Promise<AxiosResponse<IUser>> {
        return api.get<IUser>(`${BASE_URL}/v1/user/${id}`)
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