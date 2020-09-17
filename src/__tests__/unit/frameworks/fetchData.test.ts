import { fetchData } from '../../../frameworks/fetchData';

import { apiResponseValid } from '../../testdata/apiResponse';

describe('Failure cases', () => {
  test('It should fail if missing endpoint string', async () => {
    // @ts-ignore
    await expect(() => fetchData()).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return valid user data from the user backend', async () => {
    const ENDPOINT = `https://your-integration-endpoint.net/v1/someService`;
    await expect(fetchData(ENDPOINT)).resolves.toEqual(expect.arrayContaining(apiResponseValid));
  });
});
