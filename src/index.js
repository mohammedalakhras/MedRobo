import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Language/i18next";
import "./index.css";
import Home from "./Component/Home";
import ContactUs from "./Component/ContactUs";
import About from "./Component/About";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
