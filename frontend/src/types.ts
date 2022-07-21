export interface Scenario {
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface Completion {
  system: Manipulation;
  interacted: boolean;
}

export interface Comparable {
  id: number;
  fields: FieldProperties;
}

export interface FieldProperties {
  [key: string]: number;
}

export interface Applicant extends Comparable {
  reason: string;
}

export interface Recommendation {
  index: number;
  reason: string;
}

export interface Manipulation {
  id: number;
  title: string;
  description: string;
  transparency: boolean;
  control: boolean;
  image?: string;
}

export interface Net {
  iterations: number;
  dims: number[];
  emptyBoard: boolean[][];
}

export enum VARIANTS {
  WELLBEING = 'WELL',
  EVALUATION = 'EVAL'
}