import { useStore } from "@/shared/hooks/useStore";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = observer(({ children }: { children: ReactNode }) => {
    const { store } = useStore()
    if (!store.isAuth && !store.isLoading) {
        return <Navigate to='/unauth' />
    } else if (store.isLoading) {
        return <Loader />
    }
    return children;
})

export default ProtectedRoute;