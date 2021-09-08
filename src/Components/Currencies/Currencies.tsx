import React, { useCallback, useState } from "react";
import { useApp } from "../../Hooks/AppContext";
import "./Currencies.scss"

const Currencies = () => {
    const { getCurrencies, currencies, currenciesError } = useApp();
    const [loading, setLoading] = useState<boolean>(false);

    const onGetCurrencies = useCallback(() => {
        if (!loading) {
            setLoading(true);
            getCurrencies()
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [loading]);

    return (<div className={"currencies-container"}>
        <div className={"currencies-load-box"}>
            {loading && <span className={"loading"}>{"loading"}</span>}
            {currenciesError && <span style={{
                color: "red",
            }}>{currenciesError}</span>}
        </div>
        <div className={"currencies-info-box"}>
            {
                currencies &&
                <div className={"currencies-box"}>
                    {
                        currencies.map((item, index) => {
                            return (<div
                                key={"currency_" + item.currency}
                                className={"profile-info-currency"}
                            >
                                {item.currency + ": " + item.balance}
                            </div>);
                        })
                    }
                </div>
            }
            <div className={"currencies-btn" + (loading ? " button-disabled" : "")}
                onClick={onGetCurrencies}
            >{"Получить мои данные"}</div>
        </div>
    </div>);
}

export default Currencies;