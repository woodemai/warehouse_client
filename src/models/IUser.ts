import { UserRole } from "./UserRole";

export interface IUser {
    id: string,
    email: string,
    password: string,
    role: UserRole;
}