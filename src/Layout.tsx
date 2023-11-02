import Header from "./components/header/Header";
import { Outlet } from 'react-router-dom'
import { Toaster } from "./components/ui/toaster";
const Layout = () => {
    return (
        <>
            <Header />
            <div className="pt-20 w-full h-screen bg-gray-100">
                <Toaster />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;