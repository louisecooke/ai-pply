import { FieldProperties } from "../types";

export const toMinutes = (totalSeconds: number) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return (minutes + ":" + (seconds < 10 ? '0': '') + seconds);
}

export const sumValues = (obj: Object) => {
    let sum = Object.values(obj).reduce((a: number, b: number) => a + b) as number;
    return sum;
};

export const weighFactors = (fields: FieldProperties, preferences: FieldProperties) => {
    let sum = 0;
    let keys = Object.keys(fields);
    keys.forEach((i) => {
        sum += fields[i] * preferences[i];
    });
    return sum;
}

export const objectsEqual = (one: FieldProperties, two: FieldProperties) => {
    return Object.keys(one).length === Object.keys(two).length &&
    (Object.keys(one) as (keyof typeof one)[]).every((k) => {
        return (
            Object.prototype.hasOwnProperty.call(two, k) && one[k] === two[k]
        );
    });
}