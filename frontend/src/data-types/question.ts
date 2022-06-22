type Option = {
    id: number;
    question: number;
    text: string;
    value: number;
  }

enum Q_TYPE {
    WELLBEING = 'Wellbeing',
    EVALUATION = 'Evaluation'
}

interface QuestionConfig {
    id: number;
    text: string;
    variant: Q_TYPE;
    options: Option[];
};

  
export class Question {
    id: number;
    text: string;
    variant: Q_TYPE;
    options: Option[];

    constructor(config: QuestionConfig) {
        this.id = config.id;
        this.text = config.text;
        this.variant = config.variant;
        this.options = config.options;
    }
}