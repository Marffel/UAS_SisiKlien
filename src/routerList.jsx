import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import MainLayout from "./components/mainLayout";
import Dashboard from "./pages/dashboard";
import Gunung from "./pages/gunung";
import Korban from "./pages/korban";

const RouterList = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        index: true, // Halaman default
        element: <Dashboard />,
      },
      {
        path: "gunung",
        element: <Gunung />,
      },
      {
        path: "korban",
        element: <Korban />,
      },
    ],
  },
]);

export default RouterList;
