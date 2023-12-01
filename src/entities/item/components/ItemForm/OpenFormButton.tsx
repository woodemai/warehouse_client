import { Button } from "@/shared/components/ui/button"
import { FormState } from "@/shared/consts/formState"
import { cn } from "@/shared/lib/shadcn/utils"
import { FC } from "react"

interface OpenFormButtonProps {
    formState: FormState
    setIsOpen: (isOpen: boolean) => void
}
const OpenFormButton: FC<OpenFormButtonProps> = ({
    formState,
    setIsOpen
}) => {
    return (
        <Button data-testid="open-form-button" onClick={() => setIsOpen(true)}
            className={cn(formState === FormState.CREATE && "w-full")}>
            {formState === FormState.UPDATE ? "Изменить" : "Создать"}
        </Button>
    )
}
export default OpenFormButton;