// @ts-nocheck
import React, { useCallback, useState } from "react";
import Candles from "../Components/Candles/Candles";
import Currencies from "../Components/Currencies/Currencies";
import './App.scss';

const App = () => {
  const [showCurrencies, setHideCurrencies] = useState<boolean>(false);
  const [showCandles, setHideCandles] = useState<boolean>(false);

  const onHideCurrencies = useCallback(() => {
    setHideCurrencies(!showCurrencies);
  }, [showCurrencies]);

  const onHideCandles = useCallback(() => {
    setHideCandles(!showCandles);
  }, [showCandles]);

  return (
    <div className={"App"}>

      <div className={"hide-info-btn"}>
        <span onClick={onHideCurrencies}>
          {(showCurrencies ? "Скрыть" : "Показать") + " финансы "
            + (showCurrencies ? "⇩" : "⇨")}
        </span>
      </div>
      {showCurrencies && <Currencies />}



      <div className={"hide-info-btn"}>
        <span onClick={onHideCandles}>
          {(showCandles ? "Скрыть" : "Показать") + " свечи " + (showCandles ? "⇩" : "⇨")}
        </span>
      </div>
      {showCandles && <Candles />}


      {/* {portfolio && <div className={"profile-info-portfolio"}>
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
        onClick={getPortfolio}
      >{"Получить мой портфель"}</div> */}
    </div>
  );
}

export default App;
