import { useAuth } from "@/shared/hooks/useAuth";
import Store from "@/shared/store/store";
import { ReactNode, createContext } from "react"

const store = new Store();

interface State {
    store: Store
}
export const Context = createContext<State>({
    store
})

const StoreProvider = ({ children }: { children: ReactNode }) => {
    useAuth(store);

    return (
        <Context.Provider value={{ store }}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;