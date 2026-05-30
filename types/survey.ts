export type SurveyOption = {
  label: string;
  value: string;
};

export type SurveyQuestion = {
  id: keyof SurveyAnswers;
  title: string;
  type: "single" | "multi";
  required?: boolean;
  options: SurveyOption[];
};

export type SurveyAnswers = {
  year: string;
  majors: string[];
  habit: string;
  pain: string[];
  start: string;
  waste: string[];
  gamble: string;
  signal: string[];
  abandon: string;
  aiProblem: string[];
  aiBlocker: string[];
  aiFail: string;
  feature: string[];
  referralFeature: string;
  betaMaterial: string;
  betaSpeed: string;
  feedback: string;
};

export type WaitlistContact = {
  email: string;
  school: string;
  majorText: string;
  openProblem: string;
};

export type LeadScoreResult = {
  score: number;
  cohort: "Founding Beta Candidate" | "Early Access Match" | "Waitlist Confirmed";
  profile: string[];
};

export type WaitlistSubmission = SurveyAnswers &
  WaitlistContact &
  LeadScoreResult & {
    shareUrl: string;
    submittedAt: string;
  };
