import { Context } from "@/app/providers/StoreProvider/StoreProvider";
import { useContext } from "react";




export function useStore() {
    const {store} = useContext(Context);
    return { store }
}