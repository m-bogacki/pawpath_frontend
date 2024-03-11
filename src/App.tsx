import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Map from "./pages/Map";
import ErrorPage from "./pages/Error";
import Auth from "./pages/Auth";
import PrivateRoutes from "./pages/routes/PrivateRoutes";
import PublicRoutes from "./pages/routes/PublicRoutes";
import AnimalCareEdit from "./pages/AnimalCareEdit";
import AnimalEdit from "./pages/AnimalEdit";
import MyAccount from "./pages/MyAccount";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "/animals",
                element: <Animals />,
              },
              {
                path: "/animals/:id",
                element: <AnimalEdit />,
              },
              {
                path: "/map",
                element: <Map />,
              },
              { path: "/animalCare/:id", element: <AnimalCareEdit /> },
              { path: "/myAccount", element: <MyAccount /> },
            ],
          },
          {
            element: <PublicRoutes />,
            children: [
              { path: "/", element: <Home /> },

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
