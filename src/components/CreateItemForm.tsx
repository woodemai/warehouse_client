import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(15, {
        message: "Name must be less than 15 characters"
    }),
    description: z.string().min(6, {
        message: "Description must be at least 6 characters"
    }).max(50, {
        message: "Description must be less than 50 characters"
    }),
    manufacturer: z.string().min(2, {
        message: "Manufacturer must be at least 2 characters"
    }).max(25, {
        message: "Manufacturer must be less than 25 characters"
    }),
    productionDate: z.date(),
    expirationDate: z.date(),
    storageCondition: z.string().min(8, {
        message: "Storage condition must be at least 8 characters"
    }).max(100, {
        message: "Storage condition must be less than 100 characters"
    }),
    weight: z.number(),
    price: z.number()
})

const CreateItemForm = () => {
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new item</DialogTitle>
                    <DialogDescription>
                        Create your new item
                    </DialogDescription>

                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
}

export default CreateItemForm;