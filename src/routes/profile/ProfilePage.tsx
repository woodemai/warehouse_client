import Header from "@/components/header/Header";
import { Context } from "@/main";
import { useContext, useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";

const ProfilePage = () => {
    const {store} = useContext(Context)
    const [user, setUser] = useState(store.user);
    useEffect(() => {
        setUser(store.user)
    }, [store.user]);
    return ( 
        <>  
            <Header/>
            <div className="mt-20 w-full h-screen flex justify-center items-center">
                <UserInfo user={user} />
            </div>
        </>
     );
}
 
export default ProfilePage;