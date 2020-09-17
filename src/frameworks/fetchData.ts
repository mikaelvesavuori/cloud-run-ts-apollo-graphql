import fetch from "node-fetch";

export async function fetchData(endpoint: string) {
  try {
    if (!endpoint) throw new Error("Error in fetchData!");

    return await fetch(endpoint)
      .then(async (data) => await data.json())
      .then((data) => data);
  } catch (error) {
    throw new Error(error);
  }
}
