import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./components/Student/Home/Home";
import ItemDetails from "./components/Student/Items/ItemDetails";
import Menu from "./components/Student/Menu/Menu";
import UserRegistration from "./components/Registration/UserRegistration";
import UserLogin from "./components/Registration/UserLogin";
import Store from "./Store";
import { loadStudent } from "./actions/studentAction";
import StudentProfile from "./components/Student/Profile/StudentProfile";
import ForgotPassword from "./components/Registration/ForgotPassword";
import ResetPassword from "./components/Registration/ResetPassword";
import Cart from "./components/Student/Cart/Cart";
import OrderSuccess from "./components/Student/Orders/OrderSuccess";
import { MyOrder } from "./components/Student/Orders/MyOrder";
import Dashboard from "./components/Admin/Dashboard";
import OwnerList from "./components/Admin/OwnerList";
import StudentList from "./components/Admin/StudentList";
import OrderList from "./components/Admin/OrderList";

import { cheackAuthLoader,dashboardLoader, idLoader, logout as logoutAction } from './util/auth';
import Items from "./components/Owner/Item/Items";
import OwnerRegister from "./components/Registration/OwnerRegistration";
import OwnerLogin from "./components/Registration/OwnerLogin";
import OwnerDashboard from "./components/Owner/Dashboard/OwnerDashboard";
import Profile from "./components/Owner/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";
import AddItem from "./components/Owner/Item/AddItem";



const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'item/:id',
        element: <ItemDetails />
      },
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'menu/:keyword',
        element: <Menu />
      },
      {
        path: 'ordersuccess',
        element: <OrderSuccess />
      },
      {
        path: 'myorders',
        element: <MyOrder />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'ownerlist',
        element: <OwnerList />
      },
      {
        path: 'studentlist',
        element: <StudentList />
      },
      {
        path: 'orderlist',
        element: <OrderList />
      },
      {
        path: 'password/reset/:token',
        element: <ResetPassword />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'saccount',
        element: <StudentProfile />
      },
      {
        path: 'oitems',
        element: <Items />,
      },
      {
        path: 'odashboard',
        element: <OwnerDashboard />,
        loader: dashboardLoader,
      },
      {
        path: 'oprofile',
        element: <Profile />,
        loader: cheackAuthLoader,
      },
      {
        path: 'additem',
        element: <AddItem />,
      }
    ]
  },
  {
    path: 'sregister',
    element: <UserRegistration />
  },
  {
    path: 'slogin',
    element: <UserLogin />
  },
  {
    path: 'forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: 'oregister',
    element: <OwnerRegister />
  },
  {
    path: 'ologin',
    element: <OwnerLogin />,
    loader: idLoader,
  },
  {
    path: 'logout',
    action: logoutAction,
  },
])

function App() {
  useEffect(() => {
    if (
      window.location.pathname !== "/menu" &&
      window.location.pathname !== "/sregister" &&
      window.location.pathname !== "/slogin"
    ) {
      Store.dispatch(loadStudent());
    }
  }, []);

  
  return  <>
    <RouterProvider router={router}/>
  </>
}

export default App;
