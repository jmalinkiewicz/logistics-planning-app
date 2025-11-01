import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DataProvider } from "./providers/data-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import TransitsLayout from "./components/data-manager/transits/transits-layout.tsx";
import Transits from "./components/data-manager/transits/transits.tsx";
import Transit from "./components/data-manager/transits/transit.tsx";
import ParcelsLayout from "./components/data-manager/parcels/parcels-layout.tsx";
import Parcels from "./components/data-manager/parcels/parcels.tsx";
import Parcel from "./components/data-manager/parcels/parcel.tsx";
import LocationsLayout from "./components/data-manager/locations/locations-layout.tsx";
import Locations from "./components/data-manager/locations/locations.tsx";
import Location from "./components/data-manager/locations/location.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Layout 50/50: Data Manager Window / Three.js Visualization Window
    children: [
      { index: true, element: <div>Project Welcome</div> },
      {
        path: "transits",
        element: <TransitsLayout />,
        children: [
          { index: true, element: <Transits /> },
          {
            path: ":id",
            element: <Transit />,
          },
        ],
      },
      {
        path: "parcels",
        element: <ParcelsLayout />,
        children: [
          { index: true, element: <Parcels /> },
          {
            path: ":id",
            element: <Parcel />,
          },
        ],
      },
      {
        path: "locations",
        element: <LocationsLayout />,
        children: [
          { index: true, element: <Locations /> },
          {
            path: ":id",
            element: <Location />,
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
