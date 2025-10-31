import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, includeTime = false) {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime && { hour: "numeric", minute: "2-digit", hour12: true }),
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function getDefaultTab(path: string) {
  if (path.startsWith("/transits")) return "transits";
  if (path.startsWith("/parcels")) return "parcels";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/locations")) return "locations";

  return "about";
}
