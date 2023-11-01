import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Context } from './main';
import { IUser } from './models/IUser';
import AuthPage from './routes/auth/AuthPage';
import ProfilePage from './routes/profile/ProfilePage';
import Home from './routes/home/Home';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: '/auth',
        element: <AuthPage />
      }
    ]
  },

])

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    const userItem = localStorage.getItem("user")
    if (userItem) {
      const user: IUser = JSON.parse(userItem)
      store.setUser(user)
    }
  }, []);

  return <RouterProvider router={router} />
}

export default observer(App);
