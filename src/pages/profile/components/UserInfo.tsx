import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/shared/hooks/useUser";
import { useStore } from "@/shared/hooks/useStore";
import { getRole } from "@/entities/user";

const UserInfo = () => {
    const { store } = useStore()
    const user = useUser();
    const [role, setRole] = useState("Неизвестная роль");
    useEffect(() => {
        if (user.role) {
            setRole(getRole(user.role))
        }
    }, [user.role]);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const onClick = async () => {
        await store.logout()
            .finally(() => navigate('/auth'))

    }
    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-y-4 w-full sm:max-w-sm lg:max-w-lg">
            <h1 className="text-xl font-bold tracking-tight">Данные пользователя</h1>
            <div className="flex gap-x-4">
                <h2 className="font-semibold">Почта</h2>
                <span>{user.email}</span>
            </div>
            <div className="flex gap-x-4">
                <h2 className="font-semibold">Роль</h2>
                <span>{role}</span>
            </div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <Button onClick={() => setOpen(true)} className="flex flex-row gap-x-2">Выйти</Button>
                <AlertDialogContent className="bg-white flex flex-col gap-y-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены что хотите выйти?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отменить</AlertDialogCancel>
                        <Button variant="destructive" onClick={onClick}>Да, выйти</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default observer(UserInfo);