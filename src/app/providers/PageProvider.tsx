import { RouterProvider } from "react-router-dom";
import router from "../router/router";

const PageProvider = () =>  {
    return <RouterProvider router={router}/>
}
export default PageProvider;