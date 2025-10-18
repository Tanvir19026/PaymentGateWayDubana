import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ScanPay from "./Pages/ScanPay.jsx";
import CashPay from "./Pages/CashPay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    
  },
{
    path: "/payment/zelle",
    element:<ScanPay></ScanPay>
},
{
  path:"/payment/cash",
  element:<CashPay></CashPay>
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);