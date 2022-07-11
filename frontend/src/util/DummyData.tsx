import { FieldProperties } from "../types";
import { randomBetween } from "./Functions";

const { applicantFields, defaultToggles } = require("../study-config/Configuration");

export const randomString = (length: number) => {
    let result = Array<string>(length);
    for (let i = 0; i < length; i++) {
        let rand = Math.round(Math.random());
        if (rand) {
            result[i] = (Math.random() + 1).toString(36).substring(7);
        } else {
            result[i] = '';
        }
    }
    return result;
}

export const randomApplicant = () => {
    let toggles: number[] = [];
    for (let i = 0; i < applicantFields.length; i++ ) {
        toggles.push(randomBetween(24, 92));
    }
    return setPreferences(toggles);
}

export const defaultPreferences = () => {
    return setPreferences(defaultToggles);
}

const setPreferences = (values: number[]) => {
    let fieldSet: FieldProperties = {};
    applicantFields.forEach((el, index) => {
        fieldSet[el] = values[index];
    })
    return fieldSet as FieldProperties;
}

