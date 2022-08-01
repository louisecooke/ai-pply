export interface User {
  id: string;
  creationTime: Date;
  completions: number[];
}

/* export type UserContext {
  user: User;
  updateUser: (id: number, )
}
 */

export interface Interaction {
  system: number;
  total_time: number;
  a_changes: number;
  c_changes: number;
  t_clicks: number;
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