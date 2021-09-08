// @ts-nocheck
import React, { useMemo } from "react";
import Chart from 'react-apexcharts'
import { useResizeDetector } from 'react-resize-detector';
import { useApp } from "../../Hooks/AppContext";

const ChartComponent = () => {
    const { candles, ticker } = useApp();
    const { width, ref } = useResizeDetector();

    const state = useMemo(() => {
        return {
            options: {
                chart: {
                    type: 'candlestick',
                    height: 300
                },
                title: {
                    text: 'Свечи по тикеру ' + ticker,
                    align: 'center'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: false
                    }
                }
            },
        }
    }, [ticker]);

    return (<div className={"candles-chart"} ref={ref}>
        <Chart
            options={state.options}
            series={candles}
            type="candlestick"
            height={300}
            width={width}
        />
    </div>)
}

export default ChartComponent;