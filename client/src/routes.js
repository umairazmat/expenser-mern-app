import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";
import Category from "./pages/Category";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
      ,
      {
        path: "/category",
        element: (
          <CheckAuth>
            <Category />
          </CheckAuth>
        ),
      }
    ],
  },
]);

export default routes; // Use 'export default' to properly export the 'routes' variable
