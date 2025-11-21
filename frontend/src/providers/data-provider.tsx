import React, { createContext, useContext, useEffect, useState } from "react";
import { type Parcel, type Transit, type Location } from "../definitions";
import { getTransits } from "../data/transits";
import { getParcels } from "../data/parcels";
import { getLocations } from "../data/locations";

export type DataContextType = {
  parcels: Parcel[];
  transits: Transit[];
  locations: Location[];
  revalidate: (routes: string[]) => Promise<void>; // <-- added
};

const defaultState = {
  parcels: [],
  transits: [],
  locations: [],
  revalidate: async () => {},
};

const DataContext = createContext<DataContextType>(defaultState);

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [transits, setTransits] = useState<Transit[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Helper to fetch specific datasets
  const revalidate = async (routes: string[]) => {
    const promises: Promise<void>[] = [];

    if (routes.includes("/transits")) {
      promises.push(getTransits().then((data) => setTransits(data)));
    }

    if (routes.includes("/parcels")) {
      promises.push(getParcels().then((data) => setParcels(data)));
    }

    if (routes.includes("/locations")) {
      promises.push(getLocations().then((data) => setLocations(data)));
    }

    await Promise.all(promises);
  };

  useEffect(() => {
    revalidate(["/transits", "/parcels", "/locations"]);
  }, []);

  const value = {
    parcels,
    transits,
    locations,
    revalidate,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
