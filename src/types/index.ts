export interface Question {
  question: string;
  options: string[];
}

export interface Answer {
  respondent: string;
  commit: string;
  answers: number[];
}

export interface SurveyInfo {
  title: string;
  desc: string;
  id: string;
  remaining: number;
  reward: string;
  respondents: number;
  daysleft: number;
  finished: boolean;
}
