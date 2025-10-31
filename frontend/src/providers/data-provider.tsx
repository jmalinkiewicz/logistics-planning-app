import React, { createContext, useContext, useEffect, useState } from "react";
import { type Parcel, type Transit, type Location } from "../definitions";
import { getTransits } from "../data/transits";
import { getParcels } from "../data/parcels";
import { getLocations } from "../data/locations";

export type DataContextType = {
  parcels: Parcel[];
  transits: Transit[];
  locations: Location[];
};

const defaultState = {
  parcels: [],
  transits: [],
  locations: [],
};

const DataContext = createContext<DataContextType>(defaultState);

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [transits, setTransits] = useState<Transit[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function loadData() {
      const [loadedTransits, loadedParcels, loadedLocations] =
        await Promise.all([getTransits(), getParcels(), getLocations()]);

      setTransits(loadedTransits);
      setParcels(loadedParcels);
      setLocations(loadedLocations);
    }

    loadData();
  }, []);

  const value = {
    parcels,
    transits,
    locations,
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
