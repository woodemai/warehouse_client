import { NavLink } from "react-router-dom";
import { memo } from "react";
import { cn } from "@/shared/lib/shadcn/utils";
import { Button } from "@/shared/components/ui/button";

const NavItem = memo(({ path, title }: { path: string, title: string }) => {
    return (
        <Button variant="link" className={cn("text-base text-gray-600 text-center hover:text-gray-900")}>
            <NavLink to={path} className={({ isActive }) =>
                isActive ? "bg-gray-100 rounded-md text-gray-900 p-2" : "p-2"
            }>
                {title}
            </NavLink>
        </Button>
    );
});

export default NavItem;