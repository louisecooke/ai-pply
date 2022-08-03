import { shortlistLength, numApplicants } from "../study-config/Configuration";
import { FieldProperties, Applicant } from "../data-types/interfaces";
const { randomApplicant } = require("./DummyData");


export const toMinutes = (totalSeconds: number) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return (minutes + ":" + (seconds < 10 ? '0': '') + seconds);
}

/*
This function obscures the applicant IDs to prevent users from choosing the same applicants each round, 
simply after recognizing the applicants are the same and they want to be consistent with their decision-making.
If the desired behaviour is to simply display the applicant ID, you can comment the return statement 
and uncomment the second.
*/
export const displayId = (appId: number, sysId: number) => {
    return ((appId + sysId) % (numApplicants) + 1);
    //return appId;
}

export const sumValues = (obj: Object) => {
    if (Object.values(obj).length > 1) {
    let sum = Object.values(obj).reduce((a: number, b: number) => a + b) as number;
    return sum;
    } else {
        return 0;
    }
};

export const newApplicants = (num: number) => {
    let applicantList = [] as Applicant[];
    for (var i = 0; i < num; i++) {
      applicantList.push({id: i + 1, fields: randomApplicant(), reason: ''} as Applicant);
    }
    return applicantList;
}

export const customSort = (applicants: Applicant[], preferences: FieldProperties, control: boolean, transparency: boolean, isDefault: boolean) => {
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
        Object.entries(applicants[i].fields).forEach(([key, value]) => {
            if (value > 88 && value > maxVal) {
                maxVal = value;
                maxFactor = key;
            }
        })
        applicants[i] = {...applicants[i], reason: transparency ? generateReason(maxPref, maxFactor, control, isDefault, applicants[i].reason) : ''};
    }
    return applicants;
}

function generateReason(maxPref: string, maxFactor, control: boolean, isDefault: boolean, prevReason: string) {
    let degrees = randomBetween(2, 6);
    let option = randomBetween(0, 3);

    if (maxFactor !== '') {
        return control ? `The ${maxFactor.toLowerCase()} of this applicant is exceptional. Similar employees have performed well at your company.`
        : `This applicant scores high on ${maxFactor.toLowerCase()}, which is an indicator of success in your organization in many cases.`
    }
    if (option === 0) {
        return control ? `When your managers have made comparable decisions (with an applicant ${100 - 2 * degrees}% similar), this kind of applicant was often shortlisted.`
        : `When presented with a comparison between similar applicants (within ${degrees} degrees of latitude), many of your hiring managers chose to shortlist such an applicant.`
    } 
    if (!isDefault && ((prevReason !== '') || (option === 1 && control && maxPref))) {
        let second = `I see that ${maxPref} is important to you.`;
        if (prevReason !== '') {
            second = prevReason.slice(0, -1) + `, and ` + second
        }
        return `This decision was made based on your past data and recent input. ` + second;
    }
    if (option === 2) {
        return control ? `This applicant is very similar to a high-achieving member of your team.` :
            `One of the most effective members of your team had a comparable application.`
    }
    else return control ? `This applicant matches the general profile of effective employees in your organization.` :
    `This applicant has an overall profile similar to successful employees in your organization.`

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