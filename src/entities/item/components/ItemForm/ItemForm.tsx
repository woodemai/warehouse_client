import { Dialog } from "@/shared/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FC, Suspense, lazy, useCallback, useState } from "react"
import formSchema from "./ItemFormSchema";
import { IItem } from "@/entities/item/models/IItem"
import { FormState } from "../../../../shared/consts/formState"
import { ItemService } from "../../api/ItemService"
import OpenFormButton from "./OpenFormButton"
import { Loader } from "@/shared/components/ui/loader"
const ItemFormModal = lazy(() => import("./ItemFormModal"));

interface ItemFormProps {
    item?: IItem,
    formState: FormState
    setUpdated?: (updated: boolean) => void
}
export const ItemForm: FC<ItemFormProps> = ({
    item,
    formState,
    setUpdated
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
            supplier: item?.supplier.id ?? "",
            category: item?.category.id ?? "",
        },
    })
    const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
        if (formState === FormState.UPDATE && item) {
            ItemService.updateItem(values, item.id)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
        } else if (setUpdated) {
            ItemService.createItem(values)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
                .finally(() => setUpdated(true))
        }
    }, [form, formState, item, setUpdated])
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <OpenFormButton setIsOpen={setIsOpen} formState={formState} />
            <Suspense fallback={<Loader />}>
                <ItemFormModal setIsOpen={setIsOpen} form={form} onSubmit={onSubmit} formState={formState} />
            </Suspense>
        </Dialog>

    );
}