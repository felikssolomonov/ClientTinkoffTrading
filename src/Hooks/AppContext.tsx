import React, { createContext, useState, useContext, useCallback } from "react";
import moment from "moment";
import { CandleResponseType, CandleRequestType, CandleType, CandleSeriesType, intervalType } from "../Types/Types";
import { requestServer } from "../Api/Api";

interface AuthProps {
    children: any;
}

export interface ContextType {
    getCurrencies: () => Promise<unknown>;
    getPortfolio: () => void;
    getCandles: (data: CandleRequestType) => Promise<unknown>;
    currencies: Array<any> | null;
    portfolio: Array<any> | null;
    candles: Array<CandleSeriesType> | null;
    candleError: string | null;
    currenciesError: string | null;
    interval: intervalType;
    dateFrom: string;
    dateTo: string;
    ticker: string;
    onChangeInterval: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDateStart: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDateEnd: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTicker: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppContext = createContext<ContextType>({
    getCurrencies: () => { return new Promise(() => { }) },
    getPortfolio: () => { },
    getCandles: () => { return new Promise(() => { }) },
    currencies: null,
    portfolio: null,
    candles: null,
    candleError: null,
    currenciesError: null,
    interval: intervalType["5min"],
    dateFrom: moment().format('YYYY-MM-DDTHH:mm'),
    dateTo: moment().format('YYYY-MM-DDTHH:mm'),
    ticker: "TRUR",
    onChangeInterval: () => { },
    onChangeDateStart: () => { },
    onChangeDateEnd: () => { },
    onChangeTicker: () => { },
});

export const useApp = (): ContextType => useContext(AppContext);

const AppProvider = ({ children }: AuthProps) => {
    const [currencies, setCurrencies] = useState<Array<any> | null>(null);
    const [currenciesError, setCurrenciesError] = useState<string | null>(null);
    const [portfolio, setPortfolio] = useState<Array<any> | null>(null);
    const [candles, setCandles] = useState<Array<CandleSeriesType> | null>(null);
    const [candleError, setCandleError] = useState<string | null>(null);

    const [interval, setInterval] = useState<intervalType>(intervalType["5min"]);
    const [dateFrom, setDateFrom] = useState<string>(moment().format('YYYY-MM-DDTHH:mm'));
    const [dateTo, setDateTo] = useState<string>(moment().format('YYYY-MM-DDTHH:mm'));
    const [ticker, setTicker] = useState<string>("TRUR");

    const getCurrencies = useCallback((): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            requestServer.getCurrencies()
                .then((currencies: any[]) => {
                    setCurrencies(currencies);
                    setCurrenciesError(null);
                    // @ts-ignore
                    resolve();
                })
                .catch((error: string) => {
                    setCurrenciesError(error + "");
                    reject();
                });
        });
    }, []);

    const getPortfolio = useCallback(async () => {
        const portfolio = await requestServer.getPortfolio();
        setPortfolio(portfolio);
    }, []);

    const getCandles = useCallback((data: CandleRequestType): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            requestServer.getCandles(data)
                .then((candles: CandleResponseType[]) => {
                    const candless: CandleType[] = [];
                    candles.length && candles.forEach(candle => {
                        const candleObj: CandleType = {
                            x: moment(candle.time).add(3, 'hours').valueOf(),
                            y: [candle.o, candle.h, candle.l, candle.c],
                        };
                        candless.push(candleObj);
                    });
                    const series: CandleSeriesType[] = [
                        {
                            data: candless
                        }];
                    setCandles(series);
                    setCandleError(null);
                    // @ts-ignore
                    resolve();
                })
                .catch((error: string) => {
                    setCandleError(error + "");
                    reject();
                });
        });
    }, []);

    const onChangeInterval = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // @ts-ignore
        setInterval(e.target.value as intervalType);
    }, []);

    const onChangeDateStart = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDateFrom(e.target.value);
    }, []);

    const onChangeDateEnd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDateTo(e.target.value);
    }, []);

    const onChangeTicker = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTicker(e.target.value);
    }, []);

    return (
        <AppContext.Provider
            value={{
                getCurrencies,
                getPortfolio,
                getCandles,
                currencies,
                portfolio,
                candles,
                candleError,
                currenciesError,
                interval,
                dateFrom,
                dateTo,
                ticker,
                onChangeInterval,
                onChangeDateStart,
                onChangeDateEnd,
                onChangeTicker,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;