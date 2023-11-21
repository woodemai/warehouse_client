import { useEffect, useState } from "react";
import { useStore } from "./useStore";

export function useUser() {
    const { store } = useStore()
    const [user, setUser] = useState(store.user);
    useEffect(() => {
        setUser(store.user)
    }, [store.user]);
    return user;
}