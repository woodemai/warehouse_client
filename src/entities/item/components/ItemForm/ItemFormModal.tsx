import { Button } from "@/shared/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { FormState } from "@/shared/consts/formState"
import { FC, useEffect, useState } from "react"
import { z } from "zod"
import formSchema from "./ItemFormSchema"
import { UseFormReturn } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Calendar } from "@/shared/components/ui/calendar"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/shared/lib/shadcn/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/shared/components/ui/command"
import { Textarea } from "@/shared/components/ui/textarea"
import { CategoryService, ICategory } from "@/entities/category"
import { ISupplier, SupplierService } from "@/entities/supplier"
import { format } from "date-fns"

interface ItemFormModalProps {
    formState: FormState,
    onSubmit: (values: z.infer<typeof formSchema>) => void,
    setIsOpen: (open: boolean) => void,
    form: UseFormReturn<{
        name: string;
        description: string;
        supplier: {
            id: string;
            name: string;
            inn: number;
        };
        productionDate: Date;
        expirationDate: Date;
        storageCondition: string;
        weight: number;
        price: number;
        category: {
            id: string,
            name: string,
            description: string
        };
    }, undefined>
}

const ItemFormModal: FC<ItemFormModalProps> = ({
    formState,
    onSubmit,
    form,
    setIsOpen
}) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    useEffect(() => {
        CategoryService.getCategorires().then(res => setCategories(res.data));
        SupplierService.getSuppliers().then(res => setSuppliers(res.data));
    }, []);
    return (
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
                            name="supplier"
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
                                                            (supplier) => supplier === field.value
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
                                                                form.setValue("supplier", supplier)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    supplier === field.value
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
                            name="category"
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
                                                            (category) => category === field.value
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
                                                                form.setValue("category", category)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    category === field.value
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
    )
}
export default ItemFormModal;