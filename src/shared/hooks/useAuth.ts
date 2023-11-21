import { IUser } from "@/entities/user/models/IUser";
import { useEffect } from "react";
import Store from "../store/store";

export function useAuth(store: Store) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userItem = localStorage.getItem("user");
        if (token && userItem) {
            store.checkAuth().then(() => {
                if (store.isAuth && userItem) {
                    const user: IUser = JSON.parse(userItem);
                    store.setUser(user);
                }
            });
        }
    }, [store]);
}