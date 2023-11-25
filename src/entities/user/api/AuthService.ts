import api, { API_URL } from "@/shared/api/http";
import { AuthResponse } from "@/entities/user/models/AuthResponse";
import axios, { AxiosResponse } from "axios";

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse >> {
        return axios.post<AuthResponse>(`${API_URL}/v1/auth/login`, { email, password }, { withCredentials: true })
    }
    static async registration(email: string, password: string, role: string): Promise<AxiosResponse<AuthResponse>> {
        return axios.post<AuthResponse>(`${API_URL}/v1/auth/registration`, { email, password, role }, { withCredentials: true })

    }
    static async logout(): Promise<void> {
        return api.delete('v1/auth/logout')
    }
}