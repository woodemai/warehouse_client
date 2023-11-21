import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    if (!localStorage.getItem('token')) {
        return <Navigate to='/unauth' />
    }
    return children;
}

export default ProtectedRoute;