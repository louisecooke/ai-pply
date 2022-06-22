export interface Scenario {
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface Comparable {
  id: number;
  fields: FieldProperties;
}

export interface FieldProperties {
  [key: string]: number;
}

export interface Applicant extends Comparable {
}

export interface Recommendation {
  index: number;
  reason: string;
}

export interface Manipulation {
  id: number;
  title: string;
  transparency: boolean;
  control: boolean;
  image?: string;
}