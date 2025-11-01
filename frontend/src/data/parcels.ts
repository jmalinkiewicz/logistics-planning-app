import type { ParcelRequest } from "@/definitions";

const endpoint = import.meta.env.VITE_API_BASE_URL + "/parcels";

export async function getParcels() {
  try {
    const res = await fetch(endpoint);
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createParcel(parcel: ParcelRequest) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...parcel,
    }),
  });

  return res;
}
