import { shortlistLength } from "../study-config/Configuration";
import { FieldProperties, Applicant } from "../types";
const { randomApplicant } = require("./DummyData");

export const toMinutes = (totalSeconds: number) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return (minutes + ":" + (seconds < 10 ? '0': '') + seconds);
}

export const sumValues = (obj: Object) => {
    let sum = Object.values(obj).reduce((a: number, b: number) => a + b) as number;
    return sum;
};

export const newApplicants = (num: number) => {
    let applicantList = [] as Applicant[];
    for (var i = 0; i < num; i++) {
      applicantList.push({id: i + 1, fields: randomApplicant(), reason: ''} as Applicant);
    } 
    return applicantList;
}

export const customSort = (applicants: Applicant[], preferences: FieldProperties, control: boolean, isDefault: boolean) => {
    applicants.sort((a, b) => {
        return weighFactors(b.fields, preferences) - weighFactors(a.fields, preferences)
    })
    let maxPref = "";
    let maxWeight = 0;
    let keys = Object.keys(preferences);

    keys.forEach((k) => {
        if (preferences[k] > maxWeight) {
            maxWeight = preferences[k];
            maxPref = k.toLowerCase();
        }
    });

    for (let i = 0; i < shortlistLength; i++) {
        let maxFactor = '';
        let maxVal = 0;
        let consistent = false;
        Object.entries(applicants[i].fields).forEach(([key, value]) => {
            if (value > 89 && value > maxVal) {
                maxVal = value;
                maxFactor = key;
            }
        })
        if (applicants[i].reason !== '') consistent = true; 
        applicants[i] = {...applicants[i], reason: generateReason(maxPref, maxFactor, control, isDefault, consistent)};
    }
    return applicants;
}

/* The variable 'consistent' acts as a safeguard against the following case:
  A user is working with the control+transparency system
  Applicant 2 (for example) is chosen and the given explanation falls under option 0. 
  The user adjusts the control panel, therefore sorting and giving new explanations for all applications.
  Applicant 2 is chosen again, and given option 0 again. However, the randomized values would be different.
  Instead, this second/third/nth time will default to the 'past data' explanation, which does not contain a randomized value.
*/
function generateReason(maxPref: string, maxFactor, control: boolean, isDefault: boolean, consistent: boolean) {
    let degrees = randomBetween(2, 6);
    let percent = randomBetween(81, 95);
    let option = randomBetween(0, 2);
    if (maxFactor !== '') {
        return `The ${maxFactor.toLowerCase()} of this applicant is exceptional. Similar employees have performed well at your company.`
    }
    if (option === 0) {
        return `When presented with a comparison between similar applicants (within ${degrees} degrees of latitude), many of your hiring managers chose to shortlist this applicant.`
    } 
    if (!isDefault && ((consistent) || (option === 1 && control && maxPref))) {
            return `This decision was made based on your past data, plus your recent input. I see that ${maxPref} is important to you.`
        }
    else return `The application of this candidate scores similarly to successful employees in your organization.`
    }
    

export const weighFactors = (fields: FieldProperties, preferences: FieldProperties) => {
    let sum = 0;
    let keys = Object.keys(fields);
    let maxKey = Object.keys(preferences).reduce((a, b) => fields[a] > fields[b] ? a : b);
    keys.forEach((i) => {
        if (i === maxKey) {
            sum += fields[i] * preferences[i];
        } else {
            sum += fields[i] * preferences[i];
        }
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

export function randomBetween(low: number, high: number) {
    return Math.round(Math.random() * (high - low)) + low;
  }