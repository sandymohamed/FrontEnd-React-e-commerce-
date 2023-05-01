import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../MainLayout";
import Error404 from "./Error404";
import HomePage from "./HomePage";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
// -------------------------------------------------------------------------------------


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error404 />,
      children: [
        {
          path: "/",
          element: <HomePage  />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]);


const Routes = () => {
    return (
        <RouterProvider router={router} />

    )
}

export default Routes
