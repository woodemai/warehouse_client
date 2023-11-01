import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FC, useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import formSchema from "./ItemFormSchema";
import { ICategory } from "@/models/ICategory"
import { ISupplier } from "@/models/ISupplier"
import ItemService from "@/services/ItemService"
import { IItem } from "@/models/IItem"
import { FormState } from "../../models/formState"
import { Textarea } from "../ui/textarea"


interface ItemFormProps {
    categories: ICategory[],
    suppliers: ISupplier[],
    item?: IItem,
    formState: FormState
}
const ItemForm: FC<ItemFormProps> = ({
    categories,
    suppliers,
    item,
    formState
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item?.name ?? "",
            description: item?.description ?? "",
            storageCondition: item?.storageCondition ?? "",
            productionDate: new Date(),
            expirationDate: new Date(),
            weight: item?.weight ?? 0,
            price: item?.price ?? 0,
            supplierId: item?.supplierId,
            categoryId: item?.categoryId,
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (formState === FormState.UPDATE && item) {
            const {
                name,
                description,
                productionDate,
                expirationDate,
                storageCondition,
                weight,
                price,
                categoryId,
                supplierId
            } = values
            const updatedItem: IItem = {
                id: item.id,
                name,
                description,
                productionDate,
                expirationDate,
                storageCondition,
                weight,
                price,
                categoryId,
                supplierId
            }
            ItemService.updateItem(updatedItem, item.id)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })

        } else {
            ItemService.createItem({ ...values })
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)}
                className={cn(formState === FormState.CREATE && "w-full")}>
                {formState === FormState.UPDATE ? "Изменить" : "Создать"}
            </Button>
            <DialogContent className="bg-white">
                <ScrollArea className="h-[34rem]">
                    <DialogHeader>
                        <DialogTitle>Создать новый предмет</DialogTitle>
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
                                            <Input autoComplete="name" placeholder="Копыта" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Название нового предмета
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
                                            <Textarea placeholder="Самые лошадиные копыта на диком западе" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Описание нового предмета
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="supplierId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Поставщик</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-auto justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? suppliers.find(
                                                                (supplier) => supplier.id === field.value
                                                            )?.name
                                                            : "Выберите поставщика"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Найти поставщика..." />
                                                    <CommandEmpty>Поставщик не найден</CommandEmpty>
                                                    <CommandGroup>
                                                        {suppliers.map((supplier) => (
                                                            <CommandItem
                                                                value={supplier.name}
                                                                key={supplier.id}
                                                                onSelect={() => {
                                                                    form.setValue("supplierId", supplier.id)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        supplier.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {supplier.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Поставщик нового предмета
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Категория</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-auto justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? categories.find(
                                                                (category) => category.id === field.value
                                                            )?.name
                                                            : "Выберите категорию"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Найти категорию..." />
                                                    <CommandEmpty>Категория не найдена.</CommandEmpty>
                                                    <CommandGroup>
                                                        {categories.map((category) => (
                                                            <CommandItem
                                                                value={category.name}
                                                                key={category.id}
                                                                onSelect={() => {
                                                                    form.setValue("categoryId", category.id)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        category.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {category.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Категория нового предмета
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
                                        <FormLabel htmlFor={field.name}>Дата производства</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id={field.name}
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Выберите дату</span>}
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
                                            Дата производства нового предмета
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
                                        <FormLabel htmlFor={field.name}>Срок годности</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id={field.name}
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Выберите дату</span>}
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
                                            Годен до
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
                                        <FormLabel>Условия хранения</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Хранить в теплом сухом месте" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Условия хранения нового предмета
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
                                        <FormLabel>Вес</FormLabel>
                                        <FormControl>
                                            <Input placeholder="65кг"  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Вес нового предмета
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
                                        <FormLabel>Цена</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1999 ₽" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Цена нового предмета
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Отмена</Button>
                                <Button type="submit" >{formState === FormState.UPDATE ? "Обновить" : "Создать"}</Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    );
}

export default ItemForm;