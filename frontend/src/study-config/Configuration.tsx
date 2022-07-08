import { Applicant, Recommendation, FieldProperties } from "../types";


//configurable constants for easy researcher access
export const applicantFields = ['Education', 'Experience', 'Culture Fit'];
export const defaultToggles = [50, 60, 30];
export const numApplicants = 30;
export const dimensions = {
    rows: 1,
    columns: 5
}

const { weighFactors } = require("../util/Functions");

export const pickApplicant = (applicants: Applicant[], preferences: FieldProperties) => {
    let chosenId = 0;
    let max = 0;
    let maxKey = "no factor";
    let maxWeight = 0;
    Object.keys(preferences).forEach((k) => {
        if (preferences[k] > maxWeight) {
            maxWeight = preferences[k];
            maxKey = k.toLowerCase();
        }
    });
    
    for (let i = 0; i < applicants.length; i++) {
        let assessment: number = weighFactors(applicants[i].fields, preferences);
        if (assessment > max) {
            max = assessment;
            chosenId = applicants[i].id;
        }
    }

    return { chosenId, maxKey };
}