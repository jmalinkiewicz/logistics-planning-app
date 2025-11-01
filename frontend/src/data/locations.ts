const endpoint = import.meta.env.VITE_API_BASE_URL + "/locations";

export async function getLocations() {
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

export async function createLocation(city: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city,
    }),
  });

  return res;
}
