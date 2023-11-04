import z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().optional()
})
export default formSchema;