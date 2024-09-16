const apiBaseUrl = "http://localhost:3000/api";

export const getAllTestData = async () => {
  try {
    const req = await fetch(apiBaseUrl + "/test");

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
