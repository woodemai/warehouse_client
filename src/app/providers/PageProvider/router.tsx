import Layout from "@/app/providers/PageProvider/Layout";
import { AuthPage } from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { ProfilePage } from "@/pages/profile";
import { UnAuthPage } from "@/pages/unauth";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/unauth',
        element: <UnAuthPage />
      }
    ]
  },

])
export default router;