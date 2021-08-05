// @ts-nocheck
import React from "react";
import './App.scss';
import { useApp } from "./AppContext";

const App = () => {
  const { getCurrencies, currencies, getPortfolio, portfolio } = useApp();

  return (
    <div className={"App"}>
      {currencies && <div className={"profile-info-currencies"}>
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
      </div>}
      {portfolio && <div className={"profile-info-portfolio"}>
        {
          portfolio.map((item, index) => {
            return (<div
              key={"portfolio_" + item.figi}
              className={"profile-info-currency"}>
              {item.name + " - " + item.balance + "(" + item.blocked + ")"}
            </div>);
          })
        }
      </div>}
      <div className={"get-profile-info-btn"}
        onClick={getCurrencies}
      >{"Получить мои данные"}</div>
      <div className={"get-profile-info-btn"}
        onClick={getPortfolio}
      >{"Получить мой портфель"}</div>
    </div>
  );
}

export default App;
