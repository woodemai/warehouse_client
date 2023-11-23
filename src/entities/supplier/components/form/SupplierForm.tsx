import formSchema from "./SupplierFormSchema";
import { Dialog } from "@/shared/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/shared/components/ui/button"
import { FC, Suspense, lazy, memo, useCallback, useState } from "react";
import { cn } from "@/shared/lib/shadcn/utils";
import { FormState } from "@/shared/consts/formState";
import { ISupplier } from "@/entities/supplier/models/ISupplier";
import { SupplierService } from "../../api/SupplierService";
import { Loader } from "@/shared/components/ui/loader";
const SupplierFormModal = lazy(() => import("./SupplierFormModal"));

interface SupplierFormProps {
    formState: FormState,
    supplier?: Readonly<ISupplier>
    setUpdated?: (updated: boolean) => void
}
export const SupplierForm: FC<SupplierFormProps> = memo(({
    formState,
    supplier,
    setUpdated
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: supplier?.name ?? "",
            inn: supplier?.inn ?? 0
        },
    })
    const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
        if (formState === FormState.UPDATE && supplier) {
            SupplierService.updateSupplier(supplier)
        } else if (setUpdated) {
            SupplierService.createSupplier(values.name, values.inn)
                .then(() => {
                    form.reset()
                    setIsOpen(false)
                })
                .finally(() => setUpdated(true))
        }
    }, [form, formState, setUpdated, supplier])
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <Button onClick={() => setIsOpen(true)} className={cn(formState === FormState.CREATE && "w-full")}>{formState === FormState.UPDATE ? "Изменить" : "Создать"}</Button>
            <Suspense fallback={<Loader />}>
                <SupplierFormModal onSubmit={onSubmit} formState={formState} form={form} />
            </Suspense>
        </Dialog>
    );
})