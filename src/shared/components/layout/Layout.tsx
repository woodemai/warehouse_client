import Header from "../header/Header";
import { Outlet } from 'react-router-dom'
import { Toaster } from "../ui/toaster";
const Layout = () => {
    return (
        <>
            <Header />
            <div className="pt-20 w-full min-h-screen h-full bg-gray-100">
                <Toaster />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;