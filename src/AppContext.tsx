import React, { createContext, useState, useContext, useCallback } from "react";
import { requestServer } from "./Api";

interface AuthProps {
    children: any;
}

export interface ContextType {
    getCurrencies: () => void;
    getPortfolio: () => void;
    currencies: Array<any> | null;
    portfolio: Array<any> | null;
}

export const AppContext = createContext<ContextType>({
    getCurrencies: () => { },
    getPortfolio: () => { },
    currencies: null,
    portfolio: null,
});

export const useApp = (): ContextType => useContext(AppContext);

const AppProvider = ({ children }: AuthProps) => {
    const [currencies, setCurrencies] = useState<Array<any> | null>(null);
    const [portfolio, setPortfolio] = useState<Array<any> | null>(null);

    const getCurrencies = useCallback(async () => {
        const currencies = await requestServer.getCurrencies();
        setCurrencies(currencies);
    }, []);

    const getPortfolio = useCallback(async () => {
        const portfolio = await requestServer.getPortfolio();
        setPortfolio(portfolio);
    }, []);

    return (
        <AppContext.Provider
            value={{
                getCurrencies,
                getPortfolio,
                currencies,
                portfolio,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;