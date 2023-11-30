import { describe, test, expect } from "vitest";
import { getRole } from "./getRole";
import { UserRole } from "@/entities/user";

describe("Get role tests", () => {
    test("Buyer", () => {
        expect(getRole(UserRole.BUYER)).toBe("Покупатель");
    });
    test("Employee", () => {
        expect(getRole(UserRole.EMPLOYEE)).toBe("Сотрудник");
    });
    test("Supplier", () => {
        expect(getRole(UserRole.SUPPLIER)).toBe("Поставщик");
    });
    test("Fake role", () => {
        expect(getRole(UserRole.SUPPLIER)).not.toBe("Неизвестная роль");
    });
})