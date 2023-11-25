import { ICategory } from "@/entities/category";
import { ISupplier } from "@/entities/supplier";
import * as z from "zod"

const supplierSchema =  z.object<ISupplier>({
    id: "",
    name: "",
    inn: 0,
});

const categorySchema = z.object<ICategory>({
    id: "",
    name: "",
    description: "",
});

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(30, {
        message: "Name must be less than 30 characters"
    }),
    description: z.string().min(6, {
        message: "Description must be at least 6 characters"
    }).max(300, {
        message: "Description must be less than 300 characters"
    }),
    productionDate: z.date().min(new Date("2020-01-01"), { message: "Too old" }),
    expirationDate: z.date().min(new Date("2020-01-01"), { message: "Too old" }),
    storageCondition: z.string().min(8, {
        message: "Storage condition must be at least 8 characters"
    }).max(100, {
        message: "Storage condition must be less than 100 characters"
    }),
    weight: z.coerce.number(),
    price: z.coerce.number(),
    supplier: z.string(),
    category: z.string()
})
export default formSchema;