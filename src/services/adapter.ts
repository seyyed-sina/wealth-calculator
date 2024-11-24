import { apiEndpoints } from '@constants';
import { LocalResponse } from '@types';

export const fetchData = async <T>(
  url: string,
  config?: RequestInit,
): Promise<LocalResponse<T>> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    ...config,
  };

  const res = await fetch(url, options);
  return (await res.json()) as LocalResponse<T>;
};

export const mutateData = async <T>(
  url: string,
  config?: RequestInit,
): Promise<LocalResponse<T>> => {
  const options: RequestInit = {
    method: 'POST',
    ...config,
  };

  return await fetchData<T>(url, options);
};

export const localFetch = async <T>(
  url: string,
  config?: RequestInit,
): Promise<LocalResponse<T>> => {
  const BASE_URL = apiEndpoints.LOCAL_BASE_URL;
  const api_url = `${BASE_URL}${url}`;

  return await fetchData<T>(api_url, config);
};

export const localMutate = async <T>(url: string, config?: RequestInit) => {
  const options: RequestInit = {
    method: 'POST',
    ...config,
  };

  return await localFetch<T>(url, options);
};
