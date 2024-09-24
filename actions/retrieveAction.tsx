export const retrieveCoordinates = async (value: string | null) => {
  try {
    const req = await fetch(`/api/retrieves?id=${value}`);

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
