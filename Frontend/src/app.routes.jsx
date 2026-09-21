import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1> home page</h1></Protected>
    },
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/register",
        element:<Register />
    }
])