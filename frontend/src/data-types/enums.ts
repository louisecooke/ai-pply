export enum SCALE_VARS {
    WELLBEING = 'WELL',
    EVALUATION = 'EVAL'
  }

export enum TASK_STAGES {
    TRAINING, HIRING, QUESTIONNAIRE, TRANSITION
}

//right side of enum is displayed text
//check if left side matches left side of back end
export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
    DEFAULT = 'I prefer not to say'
}

export enum AGE {
    UNDER_18 = 'under 18',
    _18_24 = '18-24',
    _25_34 = '25-34',
    _35_44 = '35-44',
    _45_54 = '45-54',
    _55 = '55+',
    DEFAULT = 'I prefer not to say'
}

export enum EDUCATION {
    UND = 'Less than secondary',
    SECONDARY = 'Secondary school',
    FACHHOCHSCHULE = 'Fachhochschule or equivalent',
    APPRENTICESHIP = 'Apprenticeship or equivalent',
    TRADE_TECHNICAL = 'Trade/technical certification',
    BACHELOR = 'Bachelor degree',
    MASTER = 'Master degree',
    PHD = 'Doctorate',
    OTH = 'Other',
    DEFAULT = 'I prefer not to say'
}