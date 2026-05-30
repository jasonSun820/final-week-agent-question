import type { LeadScoreResult, SurveyAnswers } from "@/types/survey";

const joinedAnswers = (answers: SurveyAnswers) => Object.values(answers).flat().join(" | ");

export function inferProfile(answers: SurveyAnswers): string[] {
  const tags = new Set<string>();
  const joined = joinedAnswers(answers);

  if (/Three days|One day|All-nighter|通宵|Cram|procrastination/i.test(joined)) {
    tags.add("Last-minute Survivor");
  }

  if (/PPT|slides|Compress/i.test(joined)) {
    tags.add("PPT Overloaded");
  }

  if (/AI unreliable|Hallucination|Do not trust|Often wrong|Looks right/i.test(joined)) {
    tags.add("AI Skeptic");
  }

  if (/Often|Sometimes|Forced|Predict|guessing|Past-paper/i.test(joined)) {
    tags.add("Strategic Gambler");
  }

  if (/skip|abandon|not to study|不用学|放弃/i.test(joined)) {
    tags.add("Tactical Skipper");
  }

  if (!tags.size) {
    tags.add("Final Week Explorer");
  }

  return Array.from(tags);
}

export function calculateLeadScore(answers: SurveyAnswers): number {
  const joined = joinedAnswers(answers);
  let score = 24;

  score += Math.min(22, (answers.pain.length + answers.waste.length) * 3);
  score += Math.min(18, (answers.aiProblem.length + answers.aiBlocker.length) * 2);

  if (/Three days before|One day before|All-nighter/.test(answers.start)) score += 16;
  if (/Often|Sometimes|Forced to/.test(answers.gamble)) score += 10;
  if (/Definitely|Always at the end|Depends on time/.test(answers.abandon)) score += 8;
  if (/Predict|skip|not to study|Survival|Past-paper|Professor-style/i.test(joined)) score += 8;
  if (/Yes, real PPTs|Immediately|10-minute call/.test(joined)) score += 14;
  if (/Text feedback|Maybe, sample first/.test(joined)) score += 6;

  return Math.min(99, score);
}

export function scoreLead(answers: SurveyAnswers): LeadScoreResult {
  const score = calculateLeadScore(answers);
  const profile = inferProfile(answers);
  const betaSignals = `${answers.betaMaterial} ${answers.betaSpeed} ${answers.feedback}`;

  if (
    score >= 82 &&
    /Yes, real PPTs/.test(answers.betaMaterial) &&
    /Immediately|10-minute call/.test(betaSignals)
  ) {
    return { score, profile, cohort: "Founding Beta Candidate" };
  }

  if (score >= 68 && /Maybe|Text feedback|During next final/.test(betaSignals)) {
    return { score, profile, cohort: "Early Access Match" };
  }

  return { score, profile, cohort: "Waitlist Confirmed" };
}
