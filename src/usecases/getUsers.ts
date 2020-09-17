import { fetchData } from '../frameworks/fetchData';

const ENDPOINT = `https://your-integration-endpoint.net/v1/someService`;

export async function getUsersUseCase() {
  try {
    return await fetchData(ENDPOINT);
  } catch (error) {
    throw new Error(error);
  }
}
