import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DataProvider } from "./providers/data-provider.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import TransitsLayout from "@/components/data-manager/transits/transits-layout";
import ParcelsLayout from "@/components/data-manager/parcels/parcels-layout";
import LocationsLayout from "@/components/data-manager/locations/locations-layout";

import Transits from "@/components/data-manager/transits/transits";
import Transit from "@/components/data-manager/transits/transit";

import Parcels from "@/components/data-manager/parcels/parcels";
import Parcel from "@/components/data-manager/parcels/parcel";

import Locations from "@/components/data-manager/locations/locations";
import Location from "@/components/data-manager/locations/location";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DataProvider>
        <App />
      </DataProvider>
    ),
    children: [
      { index: true, element: <div>Project Welcome</div> },

      {
        path: "transits",
        element: (
          <Suspense fallback={<div>Loading…</div>}>
            <TransitsLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Transits />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Transit />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "parcels",
        element: (
          <Suspense fallback={<div>Loading…</div>}>
            <ParcelsLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Parcels />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Parcel />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "locations",
        element: (
          <Suspense fallback={<div>Loading…</div>}>
            <LocationsLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Locations />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<div>Loading…</div>}>
                <Location />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>
);
