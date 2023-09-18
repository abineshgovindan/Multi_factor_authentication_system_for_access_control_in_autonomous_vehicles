
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";


import {
  action as loginAction,
  LoginPage,
} from "./pages/LoginPage";
import { Root } from "./layout/Root";
import { VerifyPage } from "./pages/VerifyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/verify",
        element: <VerifyPage />,

      },

      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
