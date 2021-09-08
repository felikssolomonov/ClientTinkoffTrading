import axios from "axios";
import { CandleRequestType, CandleResponseType } from "../Types/Types";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    // headers: {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // },
});

export const requestServer = {
    getCurrencies: async () => {
        try {
            const response = await axiosInstance.get("/");
            return response.data.currency.currencies;
        } catch (error: any) {
            return error;
        }
    },
    getPortfolio: async () => {
        try {
            const response = await axiosInstance.get("/portfolio");
            return response.data.portfolio.positions;
        } catch (error: any) {
            return error;
        }
    },
    getCandles: ({ ticker, from, to, interval }: CandleRequestType): Promise<Array<CandleResponseType>> => {
        return new Promise((resolve, reject) => {
            axiosInstance.get("/candles?ticker="
                + ticker + "&from=" + from + "&to=" + to + "&interval=" + interval)
                .then(response => {
                    resolve(response?.data?.candles?.candles as Array<CandleResponseType>);
                })
                .catch(error => {
                    reject(error?.response?.data?.error?.payload?.message as string);
                });
        });
    },
};
