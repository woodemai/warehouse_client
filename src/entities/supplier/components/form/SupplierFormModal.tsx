import { Button } from "@/shared/components/ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { FormState } from "@/shared/consts/formState"
import { FC } from "react"
import { z } from "zod"
import formSchema from "./SupplierFormSchema"
import { UseFormReturn } from "react-hook-form"
interface SupplierFormModalProps {
    formState: FormState,
    onSubmit: (values: z.infer<typeof formSchema>) => void,
    form: UseFormReturn<{ name: string; inn: number }, undefined>
}
const SupplierFormModal: FC<SupplierFormModalProps> = ({
    formState,
    onSubmit,
    form
}) => {

    return (
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
    )
}
export default SupplierFormModal;