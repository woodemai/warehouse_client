import { UserRole } from "@/entities/user/consts/UserRole";
import { IItem, ItemForm } from "..";
import DeleteItemDialog from "./DeleteItemDialog";
import { useStore } from "@/shared/hooks/useStore";
import { FormState } from "@/shared/consts/formState";

const ItemControlButtons = ({
    item
}: { item: IItem }) => {
    const { store } = useStore()
    if (store.user.role === UserRole.EMPLOYEE) {
        return (
            <div className='flex flex-row justify-between'>
                <DeleteItemDialog id={item.id} name={item.name} />
                <ItemForm
                    item={item}
                    formState={FormState.UPDATE} />
            </div>
        )
    }
    else return null;
}
export default ItemControlButtons;