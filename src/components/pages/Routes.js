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
import CartPage from "./CartPage";
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
        {
          path: "cart",
          element: <CartPage />,
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
