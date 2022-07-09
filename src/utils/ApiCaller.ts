import axios from 'axios';

const API_URL = 'https://recruitment-test.flip.id/';

const axiosInstance = axios.create({
  baseURL: API_URL,
})

export const get = async (url: string): Promise<void> => {
  const { data } = await axiosInstance({
    method: 'GET',
    url
  });

  return data;
}
