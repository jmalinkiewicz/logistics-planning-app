export async function getParcels() {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/parcels");
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}
