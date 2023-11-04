import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Context } from "@/main";
import UserService from "@/services/UserService";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const { store } = useContext(Context);
    const [role, setRole] = useState("")
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(store.user)
    const navigate = useNavigate()
    useEffect(() => {
        setUser(store.user)
    }, [store.user]);
    useEffect(() => {
        setRole(UserService.getRole(store.user.role))
    }, [store.user.role]);
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