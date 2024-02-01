import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Map from "./pages/Map";
import ErrorPage from "./pages/Error";
import Auth from "./pages/Auth";
import PrivateRoutes from "./pages/routes/PrivateRoutes";
import PublicRoutes from "./pages/routes/PublicRoutes";
import useAutoLogin from "./custom_hooks/useAutoLogin";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            element: <PrivateRoutes />,
            children: [{ path: "/animals", element: <Animals /> }],
          },
          {
            path: "/",
            element: <PublicRoutes />,
            children: [
              { path: "/", element: <Home /> },
              {
                path: "/map",
                element: <Map />,
              },
              {
                path: "/auth",
                element: <Auth />,
              },
            ],
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <main className="bg-neutral text-secondary">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
