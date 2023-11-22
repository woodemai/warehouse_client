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
import { FC, useState } from "react"
import CategoryService from "@/entities/category/api/CategoryService"
import { FormState } from "@/shared/consts/formState"
import { ICategory } from "@/entities/category/models/ICategory"
import { cn } from "@/shared/lib/shadcn/utils"
import { Textarea } from "../../../shared/components/ui/textarea"

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
})
interface CategoryFormProps {
    formState: FormState,
    category?: ICategory
}

export const CategoryForm: FC<CategoryFormProps> = ({
    formState,
    category
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name ?? "",
            description: category?.description ?? "",
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (formState === FormState.UPDATE && category) {
            const updatedCategory: ICategory = {
                id: category?.id,
                name: values.name,
                description: values.description
            }
            CategoryService.updateCategory(updatedCategory)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
        } else {
            CategoryService.createCategory(values.name, values.description)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })

        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className={cn(formState === FormState.CREATE && "w-full")}>
                {formState === FormState.CREATE ? "Создать" : "Изменить"}
            </Button>
            <DialogContent>
                <ScrollArea className="h-auto">
                    <DialogHeader>
                        <DialogTitle>Категория</DialogTitle>
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
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="name" placeholder="Рога" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Название новой категории
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
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Рога Лосяша" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Описание новой категории
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter >
                                <DialogClose>Отмена</DialogClose>
                                <Button>
                                    {formState === FormState.CREATE ? "Создать" : "Обновить"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    );
}