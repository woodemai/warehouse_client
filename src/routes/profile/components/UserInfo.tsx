import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Context } from "@/main";
import { IUser } from "@/models/IUser";
import { IUserRole } from "@/models/IUserRole";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfoProps {
    user: IUser
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
    const [role, setRole] = useState("Клиент")
    const [open, setOpen] = useState(false)
    const { store } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        if(user.role === IUserRole.EMPLOYEE) {
            setRole("Сотрудник")
        }
    }, []);
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
                <Button onClick={() => setOpen(true)} variant="outline" className="flex flex-row gap-x-2">Выйти</Button>
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

export default UserInfo;