import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Map from "./pages/Map";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Auth from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dogs", element: <Animals /> },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
