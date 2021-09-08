import React from "react";
import { useApp } from "../../Hooks/AppContext";
import "./Currencies.scss"

const Currencies = () => {
    const { getCurrencies, currencies } = useApp();
    return (<div className={"currencies-container"}>
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
        <div className={"currencies-btn"}
            onClick={getCurrencies}
        >{"Получить мои данные"}</div>
    </div>);
}

export default Currencies;