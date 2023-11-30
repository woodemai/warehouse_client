import { describe, test,expect } from "vitest";
import { UserRole } from "..";

describe("User role tests", () => {
    test("Employee", () => {
        expect(UserRole.EMPLOYEE.toString()).toBe("EMPLOYEE")
    });
    test("Buyer", () => {
        expect(UserRole.BUYER.toString()).toBe("BUYER")
    });
    test("Supplier", () => {
        expect(UserRole.SUPPLIER.toString()).toBe("SUPPLIER")
    });
})