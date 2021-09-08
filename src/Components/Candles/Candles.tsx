
import React, { useCallback, useState } from "react";
import ChartComponent from "./ChartComponent";
import { useApp } from "../../Hooks/AppContext";
import { enumToMap, intervalType } from "../../Types/Types";
import "./Candles.scss"


const Candles = () => {
    const { getCandles, candles, candleError, interval,
        onChangeInterval, dateFrom, onChangeDateStart,
        dateTo, onChangeDateEnd, ticker, onChangeTicker
    } = useApp();

    const [loading, setLoading] = useState<boolean>(false);

    const onGetCandles = useCallback(() => {
        if (!loading) {
            setLoading(true);
            getCandles({
                ticker: ticker,
                from: dateFrom,
                to: dateTo,
                interval: interval,
            })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [ticker, dateFrom, dateTo, interval, loading]);

    return (
        <>
            <div className={"candles-container"}>

                <div className={"candles-column"}>
                    <div className={"candles-row"}>
                        <label htmlFor="dateFrom" className={"candles-label"}>
                            {"Start date:"}
                        </label>
                        <input
                            className={"candles-interval-date"}
                            type="datetime-local"
                            id="dateFrom"
                            value={dateFrom}
                            onChange={onChangeDateStart}
                        // min="2018-01-01"
                        // max="2018-12-31"
                        ></input>
                    </div>

                    <div className={"candles-row"}>
                        <label htmlFor="dateTo" className={"candles-label"}>
                            {"End date:"}
                        </label>
                        <input
                            className={"candles-interval-date"}
                            type="datetime-local"
                            id="dateTo"
                            value={dateTo}
                            onChange={onChangeDateEnd}
                        // min="2018-01-01"
                        // max="2018-12-31"
                        ></input>
                    </div>
                </div>

                <div className={"candles-column"}>
                    <div className={"candles-row"}>
                        <label htmlFor="interval" className={"candles-label"}>
                            {"Interval:"}
                        </label>
                        <select id="interval" className={"candles-interval-select"} value={interval}
                            // @ts-ignore
                            onChange={onChangeInterval}>
                            {
                                // @ts-ignore
                                enumToMap(intervalType).map((interval, ind) => {
                                    return (<option key={interval.name + ind} value={interval.name} >{interval.name}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div className={"candles-row"}>
                        <label htmlFor="ticker" className={"candles-label"}>
                            {"Ticker:"}
                        </label>
                        <input
                            className={"candles-interval-ticker"}
                            type="text"
                            id="ticker"
                            value={ticker}
                            onChange={onChangeTicker}
                        ></input>
                    </div>
                </div>

                <div className={"candles-button" + (loading ? " button-disabled" : "")}
                    onClick={onGetCandles}
                >{"Получить свечи"}</div>
            </div>
            {loading && <span className={"loading"}>{"loading"}</span>}
            {candleError && <span style={{
                color: "red"
            }}>{candleError}</span>}
            {candles && candles.length &&
                <ChartComponent />
            }
        </>
    );
}

export default Candles;
