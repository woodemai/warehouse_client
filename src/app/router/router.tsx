import Layout from "@/shared/components/layout/Layout";
import ProtectedRoute from "@/pages/auth/components/ProtectedRoute";
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