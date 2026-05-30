import { createClient } from "@supabase/supabase-js";
import type { WaitlistSubmission } from "@/types/survey";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export async function saveWaitlistSubmission(submission: WaitlistSubmission) {
  if (!supabase) {
    return {
      ok: true,
      offline: true,
      message: "Supabase is not configured. Submission was handled locally.",
    };
  }

  const { error } = await supabase.from("waitlist_submissions").insert({
    email: submission.email,
    school: submission.school || null,
    year: submission.year,
    major_text: submission.majorText || null,
    majors: submission.majors,
    habit: submission.habit,
    pain: submission.pain,
    start: submission.start,
    waste: submission.waste,
    gamble: submission.gamble,
    signal: submission.signal,
    abandon: submission.abandon,
    ai_problem: submission.aiProblem,
    ai_blocker: submission.aiBlocker,
    ai_fail: submission.aiFail,
    feature: submission.feature,
    referral_feature: submission.referralFeature,
    beta_material: submission.betaMaterial,
    beta_speed: submission.betaSpeed,
    feedback: submission.feedback,
    open_problem: submission.openProblem || null,
    lead_score: submission.score,
    cohort: submission.cohort,
    profile: submission.profile,
    share_url: submission.shareUrl,
    raw_json: submission,
  });

  if (error) {
    throw error;
  }

  return { ok: true, offline: false };
}
