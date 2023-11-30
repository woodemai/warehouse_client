import { UserRole } from "../../../consts/UserRole";

export function getRole(role: UserRole) {
    switch (role) {
        case UserRole.BUYER:
            return "Покупатель"
        case UserRole.EMPLOYEE:
            return "Сотрудник"
        case UserRole.SUPPLIER:
            return "Поставщик"
        default:
            return "Неизвестная роль";
    }
}