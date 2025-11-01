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

export function randomHex() {
  // Generate a vibrant color in HSL and convert to HEX
  const hue = Math.floor(Math.random() * 360); // full color wheel
  const saturation = 70 + Math.random() * 30; // 70–100% saturation → vibrant
  const lightness = 45 + Math.random() * 15; // 45–60% lightness → not too dark/light

  return hslToHex(hue, saturation, lightness);
}

// helper: convert HSL → HEX
function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const useDismissModal = () => {
  const dismiss = () =>
    (document.querySelector('[data-state="open"]') as HTMLDivElement).click();
  return {
    dismiss,
  };
};
