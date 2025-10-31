export async function getLocations() {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/locations");
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}
