import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(50, {
        message: "Name must be less than 50 characters"
    }),
    inn: z.coerce.number().int().gte(100000000000, {
        message: "Must have 12 digits"
    }).lte(999999999999, {
        message: "Must have 12 digits"
    })
});
export default formSchema;