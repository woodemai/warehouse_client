import formSchema from "./SupplierFormSchema";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { FC, useState } from "react";
import { cn } from "@/shared/lib/shadcn/utils";
import SupplierService from "@/entities/supplier/api/SupplierService";
import { FormState } from "@/shared/consts/formState";
import { ISupplier } from "@/entities/supplier/models/ISupplier";


interface SupplierFormProps {
    formState: FormState,
    supplier?: ISupplier
}
export const SupplierForm: FC<SupplierFormProps> = ({
    formState,
    supplier
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: supplier?.name ?? "",
            inn: supplier?.inn ?? 0
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (formState === FormState.UPDATE && supplier) {
            SupplierService.updateSupplier(supplier)
        } else {
            SupplierService.createSupplier(values.name, values.inn)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className={cn(formState === FormState.CREATE && "w-full")}>{formState === FormState.UPDATE ? "Изменить" : "Создать"}</Button>
            <DialogContent>
                <ScrollArea className="h-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {formState === FormState.CREATE ? "Создать поставщика" : "Изменить поставщика"}
                        </DialogTitle>
                        <DialogDescription>
                            Введите характеристики ниже
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="name" placeholder="Производство №4" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Имя поставщика
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
                                        <FormLabel>ИНН</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456789101" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            12 цифр
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter >
                                <DialogClose>Отмена</DialogClose>
                                <Button type="submit" >{formState === FormState.UPDATE ? "Обновить" : "Создать"}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}