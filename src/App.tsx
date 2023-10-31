import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Context } from './main';
import { IUser } from './models/IUser';
import AuthPage from './routes/auth/AuthPage';
import ProfilePage from './routes/profile/ProfilePage';
import Home from './routes/home/Home';

const router = createBrowserRouter([
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
])

function App() {
  // const [items, setItems] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [suppliers, setSuppliers] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:8080/categories").then((res) => setCategories(res.data));
  //   axios.get("http://localhost:8080/item").then(res => setItems(res.data));
  //   axios.get("http://localhost:8080/suppliers").then(res => setSuppliers(res.data));
  // }, []);
  const {store} = useContext(Context)
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
    const userItem = localStorage.getItem("user")
        if(userItem) {
            const user:IUser = JSON.parse(userItem)
            store.setUser(user)
        }
  }, []);

  return <RouterProvider router={router}/>
}

export default observer(App);
