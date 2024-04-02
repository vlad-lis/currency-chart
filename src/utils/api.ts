import axios, { AxiosError } from 'axios';
import BASE_URL from './constants';

type TCurrencyRatios = {
  date: string;
  baseCurrency: {
    [ratio: string]: number;
  };
};

type ApiResponse = {
  success: boolean;
  data?: TCurrencyRatios;
  status?: number;
};

const fetchCurrencyRatios = async (): Promise<ApiResponse> => {
  try {
    const res = await axios.get(BASE_URL);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, status: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, status: undefined };
  }
};

export default fetchCurrencyRatios;
