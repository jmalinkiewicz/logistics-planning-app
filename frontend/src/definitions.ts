type TransitStatus = "scheduled" | "in_progress" | "completed";
export type ParcelStatus =
  | "scheduled"
  | "unassigned"
  | "in_progress"
  | "completed";

export type Location = {
  id: number;
  city: string;
};

export type Transit = {
  id: number;
  startLocation: Location;
  endLocation: Location;
  currentLoadKg: number;
  maxVolumeM3: number;
  maxLoadKg: number;
  widthM: number;
  heightM: number;
  depthM: number;
  status: TransitStatus;
  transit: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  departureDate: string;
  arrivalDate: string;
  currentVolumeM3: number;
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

export interface Box {
  id: string;
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  z: number;
  color?: string;
}

export interface BoxInput {
  id: string;
  width: number;
  height: number;
  depth: number;
  color?: string;
}

export interface Container {
  width: number;
  length: number;
  height: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}
