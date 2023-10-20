import formSchema from "./SupplierFormSchema";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { FC, useState } from "react";
import { cn } from "@/lib/utils";


interface SupplierFormProps {
    updating?: boolean,
    id?: string,
    name?: string,
    inn?: number
}
const SupplierForm: FC<SupplierFormProps> = ({
    updating,
    id,
    name,
    inn
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            inn: inn
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (updating) {
            axios.put(`http://localhost:8080/suppliers/${id}`, { ...values })
            .then(() => {
                form.reset()
                setIsOpen(false)
            })
        } else {
            axios.post("http://localhost:8080/suppliers", { ...values })
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
        }

    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className={cn(!updating && "w-full")}>{updating ? "Edit" : "New"}</Button>
            <DialogContent>
                <ScrollArea className="h-auto">
                    <DialogHeader>
                        <DialogTitle>Create supplier</DialogTitle>
                        <DialogDescription>
                            Enter the characteristics below
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
                                            Supplier's name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="inn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>INN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12 digits number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Supplier's INN
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter >
                                <DialogClose>Cancel</DialogClose>
                                <Button type="submit" >{updating ? "Save" : "Create"}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default SupplierForm;