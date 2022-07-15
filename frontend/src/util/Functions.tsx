import { FieldProperties, Applicant } from "../types";

export const toMinutes = (totalSeconds: number) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return (minutes + ":" + (seconds < 10 ? '0': '') + seconds);
}

export const sumValues = (obj: Object) => {
    let sum = Object.values(obj).reduce((a: number, b: number) => a + b) as number;
    return sum;
};

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

    for (let i = 0; i < 5; i++) {
        let maxFactor = '';
        let maxVal = 0;
        Object.entries(applicants[i].fields).forEach(([key, value]) => {
            if (value > 89 && value > maxVal) {
                maxVal = value;
                maxFactor = key;
            }
        })
        applicants[i] = {...applicants[i], reason: generateReason(maxPref, maxFactor, control, isDefault)};
    }
    return applicants;
}


function generateReason(maxPref: string, maxFactor, control: boolean, isDefault: boolean) {
    let degrees = randomBetween(2, 6);
    let percent = randomBetween(81, 95);
    let option = randomBetween(0, 2);
    if (maxFactor !== '') {
        return `The ${maxFactor.toLowerCase()} of this applicant is exceptional.` 
    }
    if (option === 0) {
        return `When presented with a comparison between similar applicants (within ${degrees} degrees of latitude), ${percent}% of users chose to shortlist this applicant.`
    } 
    if (option === 1 && control && maxPref && !isDefault) {
            return `This decision was made based on our existing user data, plus your recent input. I see that ${maxPref} is important to you.`
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

  
/* //TODO are object parameters passed as reference?
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
            reason = generateReason(maxKey, maxWeight, control, isDefault);
        }
        recommendations.push({index: applicants[i].id, reason: reason});
    }

    return recommendations;
} */