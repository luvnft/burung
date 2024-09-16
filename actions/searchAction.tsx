export const searchAddress = async (value: string | null) => {
  try {
    const req = await fetch(`/api/search-address?q=${value}`);

    if (!req.ok) {
      throw new Error(`Error status ${req.status}`);
    }

    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
