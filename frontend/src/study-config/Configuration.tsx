import { Applicant, Recommendation, FieldProperties } from "../types";


//configurable constants for easy researcher access
export const applicantFields = ['Education', 'Experience', 'Culture Fit'];
export const defaultToggles = [50, 60, 30];
export const numApplicants = 30;
export const dimensions = {
    rows: 1,
    columns: 5
}

const { weighFactors, randomBetween } = require("../util/Functions");

/* export const pickApplicant = (applicants: Applicant[], preferences: FieldProperties) => {
    let chosenId = 0;
    let max = 0;
    let maxKey = "no factor";
    let maxWeight = 0;

    //this is redundant
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
} */

//TODO are object parameters passed as reference?
export const pickApplicants = (applicants: Applicant[], preferences: FieldProperties, control: boolean, isDefault: boolean) => {
    let recommendations: Recommendation[] = [];
    let maxKey = "no factor";
    let maxWeight = 0;

    //this is redundant
    Object.keys(preferences).forEach((k) => {
        if (preferences[k] > maxWeight) {
            maxWeight = preferences[k];
            maxKey = k.toLowerCase();
        }
    });
    
    for (let i = 0; i < applicants.length; i++) {
        let assessment: number = weighFactors(applicants[i].fields, preferences);
        let reason = '';
        if (assessment > 9500 || applicants[i].fields[maxKey] > 92) {
            reason = generateReason(maxKey, control, isDefault);
        }
        recommendations.push({index: applicants[i].id, reason: reason});
    }

    return recommendations;
}

function generateReason(maxKey: string, control: boolean, isDefault: boolean) {
    if (control &&  isDefault) return `This decision was made based on our existing user data.`;
    if (control && maxKey) {
      return `This decision was made based on our existing user data, plus your recent input. I see that ${maxKey} is important to you.`
    }
      let degrees = randomBetween(2, 6);
      let percent = randomBetween(81, 95);
      return `When presented with a comparison between similar applicants (within ${degrees} degrees of latitude), ${percent}% of users chose to shortlist this applicant.`
    }