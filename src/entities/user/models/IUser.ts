import { UserRole } from "../consts/UserRole";

export interface IUser {
    id: string,
    email: string,
    password: string,
    role: UserRole;
}