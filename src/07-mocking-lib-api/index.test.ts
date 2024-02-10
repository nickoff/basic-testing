import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as jest.Mocked<typeof axios>);
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('');
    expect(spyAxiosCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as jest.Mocked<typeof axios>);
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const instance = axios.create({ baseURL });

    await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(instance.get).toHaveBeenCalledWith('');
    spyAxiosCreate.mockRestore();
  });

  test('should return response data', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'test' }),
    } as unknown as jest.Mocked<typeof axios>);
    const response = await throttledGetDataFromApi('');

    jest.runAllTimers();
    expect(response).toEqual('test');
    spyAxiosCreate.mockRestore();
  });
});
