import { FC, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EditItemFormProps {
    id: string
    name: string,
    description: string,
    manufacturer: string,
    productionDate: string,
    expirationDate: string,
    storageCondition: string
    weight: number
    price: number
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(15, {
        message: "Name must be less than 15 characters"
    }),
    description: z.string().min(6, {
        message: "Description must be at least 6 characters"
    }).max(300, {
        message: "Description must be less than 300 characters"
    }),
    manufacturer: z.string().min(2, {
        message: "Manufacturer must be at least 2 characters"
    }).max(50, {
        message: "Manufacturer must be less than 50 characters"
    }),
    productionDate: z.date().min(new Date("2020-01-01"), { message: "Too old" }),
    expirationDate: z.date().min(new Date("2020-01-01"), { message: "Too old" }),
    storageCondition: z.string().min(8, {
        message: "Storage condition must be at least 8 characters"
    }).max(100, {
        message: "Storage condition must be less than 100 characters"
    }),
    weight: z.coerce.number(),
    price: z.coerce.number()
})
const EditItemForm: FC<EditItemFormProps> = ({
    id,
    name,
    description,
    manufacturer,
    productionDate,
    expirationDate,
    storageCondition,
    weight,
    price
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            description: description,
            manufacturer: manufacturer,
            storageCondition: storageCondition,
            productionDate: new Date(),
            expirationDate: new Date(),
            weight: weight,
            price: price
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        axios.put(`http://localhost:8080/item/${id}`, { ...values })
            .then(res => console.log(res))
            .then(() => {
                form.reset()
                setIsOpen(false)
            })
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger><Button className='w-20'>Edit</Button></DialogTrigger>
            <DialogContent>
                <ScrollArea className="h-[34rem]">
                    <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                        <DialogDescription>
                            Editing {name}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Moose Horns" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Item's name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="These are the strongest best and coolest horns" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {name}'s description
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="manufacturer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manufacturer</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Horns and Hooves LLC" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Manufacturer's company name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="productionDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Production date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            {name}'s production date
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expirationDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Expiration date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            {name}'s expiration date
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="storageCondition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Storage condition</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Store in a warm, dry place" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {name}'s storage condition
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight</FormLabel>
                                        <FormControl>
                                            <Input placeholder="65"  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {name}'s weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="73" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {name}'s price
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full justify-between ">
                                <DialogClose >
                                    <Button variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" >Update</Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default EditItemForm;