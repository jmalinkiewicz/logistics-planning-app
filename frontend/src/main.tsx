import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DataProvider } from "./providers/data-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Layout 50/50: Data Manager Window / Three.js Visualization Window
    children: [
      { index: true, element: <div>Project Welcome</div> },
      {
        path: "transits",
        element: <div>Transits Layout</div>,
        children: [
          { index: true, element: <div>Transits List</div> },
          {
            path: ":id",
            element: <div>Transit Details</div>,
          },
        ],
      },
      {
        path: "parcels",
        element: <div>Parcels Layout</div>,
        children: [
          { index: true, element: <div>Parcels List</div> },
          {
            path: ":id",
            element: <div>Parcel Details</div>,
          },
        ],
      },
      {
        path: "locations",
        element: <div>Locations Layout</div>,
        children: [
          { index: true, element: <div>Locations List</div> },
          {
            path: ":id",
            element: <div>Location Details</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={router} />,
    </DataProvider>
  </StrictMode>
);
