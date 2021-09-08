import { EnumType } from "typescript";

export enum intervalType {
    "1min",
    "2min",
    "3min",
    "5min",
    "10min",
    "15min",
    "30min",
    "hour",
    "day",
    "week",
    "month"
}

export const enumToMap = (enumValue: EnumType) => {
    let arr: { name: string }[] = [];
    const enumValues = Object.values(enumValue);
    const length = enumValues.length / 2;
    enumValues.forEach((value, index) => {
        if (index >= length) return;
        arr.push({
            name: value
        });
    });
    return arr;
}

export interface CandleRequestType {
    ticker: string;
    from: string;
    to: string;
    interval: intervalType;
}

export interface CandleResponseType {
    o: number;
    c: number;
    h: number;
    l: number;
    v: number;
    interval: string;
    figi: string;
    time: Date;
}

export interface CandleType {
    x: number,
    y: Array<number>
}

export interface CandleSeriesType {
    data: Array<CandleType>
}