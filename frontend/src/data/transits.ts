const endpoint = import.meta.env.VITE_API_BASE_URL + "/transits";

import type { TransitRequest } from "@/definitions";

export async function getTransits() {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/transits");
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createTransit(transit: TransitRequest) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...transit,
    }),
  });

  return res;
}
