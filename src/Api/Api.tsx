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
    getCurrencies: (): Promise<Array<any>> => {
        return new Promise((resolve, reject) => {
            axiosInstance.get("/")
                .then(response => {
                    if (response.status !== 200) {
                        reject(response?.statusText as string);
                    }
                    resolve(response.data.currency.currencies as Array<any>);
                })
                .catch(error => {
                    console.log(error.response.statusText);
                    reject(error?.response?.statusText as string);
                });
        });
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
