import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { CreateOrder, Error, Home, Login, OrderDetail, OrderDetail2, Orders, Payment, PaymentSuccess, Profile, Waiting } from "./pages";
import "./i18n";
import "./index.css";
import { AdminLayout, AuthLayout } from "./layouts";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: (
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "order/create",
            element: <CreateOrder />,
          },
          {
            path: "order",
            element: <OrderDetail />,
          },
          {
            path: "order-detail",
            element: <OrderDetail2 />,
          },
          {
            path: "payment/:orderId",
            element: <Payment />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "waiting",
            element: <Waiting />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={"Loading..."}>
      <Provider store={store}>
        <ConfigProvider>
          <StyleProvider hashPriority="high">
            <RouterProvider router={router} />
          </StyleProvider>
        </ConfigProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
