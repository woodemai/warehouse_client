import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "@/shared/hooks/useStore";

const defaultRoutes = [
    {
        path: "/",
        title: "Главная"
    },
]

const Header = () => {
    const { store } = useStore()
    const [routes, setRoutes] = useState(defaultRoutes);
    useEffect(() => {
        if (!store.isAuth) {
            setRoutes([...defaultRoutes, { path: "/auth", title: 'Войти' }])
        } else {
            setRoutes([...defaultRoutes, { path: "/profile", title: 'Профиль' }])
        }
    }, [store.isAuth]);

    return (
        <header className="absolute top-0 left-0 w-full flex flex-row justify-between items-center p-4 bg-white shadow-sm">
            <Link to={'/'}>
                <div className="cursor-pointer flex flex-row gap-x-4 items-center">
                    <img src={`../logo.svg`} alt="logo" width={40} height={40} />
                    <h1 className="tracking-tight text-2xl font-bold hidden sm:block">Warehouse</h1>
                </div>
            </Link>
            <nav className="flex justify-end">
                {routes.map(route => <NavItem key={route.path} {...route} />)}
            </nav>
        </header>
    );
}

export default observer(Header);