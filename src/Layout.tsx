import Header from "./components/header/Header";
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <>
            <Header />
            <div className="pt-20 w-full h-screen bg-gray-100">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;