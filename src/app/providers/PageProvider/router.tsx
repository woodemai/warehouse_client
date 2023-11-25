import Layout from "@/app/providers/PageProvider/Layout";
import ProtectedRoute from "@/shared/components/protected/ProtectedRoute";
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
        element: <ProtectedRoute><HomePage /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
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