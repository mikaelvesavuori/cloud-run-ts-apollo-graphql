import { getUsersUseCase } from '../../../usecases/getUsers';

import { apiResponseValid } from '../../testdata/apiResponse';

describe('Success cases', () => {
  test('It should return valid user data from the user backend', async () => {
    await expect(getUsersUseCase()).resolves.toEqual(expect.arrayContaining(apiResponseValid));
  });
});
