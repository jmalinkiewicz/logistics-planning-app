type TransitStatus = "scheduled" | "in_progress" | "completed";
type ParcelStatus = "scheduled" | "unassigned" | "in_progress" | "completed";

export type Location = {
  id: number;
  city: string;
};

export type Transit = {
  id: number;
  startLocation: Location;
  endLocation: Location;
  weightKg: number;
  widthM: number;
  heightM: number;
  depthM: number;
  status: TransitStatus;
  transit: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  volumeM3: number;
};

export type Parcel = {
  id: number;
  startLocation: Location;
  endLocation: Location;
  weightKg: number;
  widthM: number;
  heightM: number;
  depthM: number;
  volumeM3: number;
  status: ParcelStatus;
  transitId: number | null; // updated from `transit`
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
