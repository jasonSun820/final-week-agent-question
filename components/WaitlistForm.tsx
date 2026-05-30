"use client";

import { useMemo, useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import SuccessScreen from "@/components/SuccessScreen";
import { saveWaitlistSubmission } from "@/lib/supabase";
import { scoreLead } from "@/lib/leadScore";
import type { SurveyAnswers, SurveyQuestion, WaitlistContact, WaitlistSubmission } from "@/types/survey";

const initialAnswers: SurveyAnswers = {
  year: "",
  majors: [],
  habit: "",
  pain: [],
  start: "",
  waste: [],
  gamble: "",
  signal: [],
  abandon: "",
  aiProblem: [],
  aiBlocker: [],
  aiFail: "",
  feature: [],
  referralFeature: "",
  betaMaterial: "",
  betaSpeed: "",
  feedback: "",
};

const initialContact: WaitlistContact = {
  email: "",
  school: "",
  majorText: "",
  openProblem: "",
};

const questions: SurveyQuestion[] = [
  {
    id: "year",
    title: "Year",
    type: "single",
    required: true,
    options: ["Freshman", "Sophomore", "Junior", "Senior", "Master", "Other"].map((value) => ({ label: value, value })),
  },
  {
    id: "majors",
    title: "Major",
    type: "multi",
    options: ["CS / Engineering", "Business", "Economics", "Psychology", "Law", "Medical", "Design", "Humanities", "Other"].map((value) => ({ label: value, value })),
  },
  {
    id: "habit",
    title: "Study habit",
    type: "single",
    required: true,
    options: [
      ["平时不学 Final 冲刺", "Cram during Final Week"],
      ["考前一周开始", "Start one week before"],
      ["有计划但经常拖延", "Planned but procrastinate"],
      ["很焦虑效率低", "Anxious low efficiency"],
      ["长期 procrastination", "Long-term procrastination"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "pain",
    title: "Biggest Final Week collapse point",
    type: "multi",
    options: [
      ["PPT 太多", "Too many PPTs"],
      ["不知道重点", "Do not know重点"],
      ["时间不够", "Not enough time"],
      ["AI 不靠谱", "AI unreliable"],
      ["不知道先学什么", "Do not know what first"],
      ["老师范围模糊", "Vague professor scope"],
      ["阅读材料太长", "Reading too long"],
      ["熬夜效率低", "Low efficiency overnight"],
      ["不知道放弃什么", "Do not know what to abandon"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "start",
    title: "When do you usually start reviewing?",
    type: "single",
    required: true,
    options: [
      ["两周前", "Two weeks before"],
      ["一周前", "One week before"],
      ["三天前", "Three days before"],
      ["前一天", "One day before"],
      ["通宵", "All-nighter"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "waste",
    title: "Where do you waste the most time?",
    type: "multi",
    options: [
      ["整理资料", "Organizing materials"],
      ["找重点", "Finding重点"],
      ["做计划", "Making plans"],
      ["看不懂 PPT", "Cannot understand PPT"],
      ["AI 废话太多", "AI too verbose"],
      ["刷手机", "Phone scrolling"],
      ["不知道会不会考", "Do not know exam probability"],
      ["不知道该不该跳过", "Do not know whether to skip"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "gamble",
    title: "Do you actively guess exam questions?",
    type: "single",
    required: true,
    options: [
      ["经常", "Often"],
      ["偶尔", "Sometimes"],
      ["被迫", "Forced to"],
      ["从不", "Never"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "signal",
    title: "How do you judge what matters?",
    type: "multi",
    options: ["老师强调", "PPT 出现频率", "学长学姐", "历年题", "TA", "Reddit", "Discord", "AI", "直觉"].map((label) => ({ label, value: label })),
  },
  {
    id: "abandon",
    title: "Will you abandon part of the content?",
    type: "single",
    required: true,
    options: [
      ["一定会", "Definitely"],
      ["看时间", "Depends on time"],
      ["不敢", "Afraid to"],
      ["最后都会放弃", "Always at the end"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "aiProblem",
    title: "What breaks your trust in AI?",
    type: "multi",
    options: [
      ["抓错重点", "Wrong重点"],
      ["总结太长", "Too long summary"],
      ["幻觉", "Hallucination"],
      ["看起来对其实错", "Looks right but wrong"],
      ["不懂老师风格", "No professor style"],
      ["不会判断考试概率", "Cannot judge exam probability"],
      ["输出太泛", "Too generic"],
      ["不知道什么可以不学", "Cannot tell what to skip"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "aiBlocker",
    title: "Why would you not use AI?",
    type: "multi",
    options: [
      ["不信任", "Do not trust it"],
      ["太慢", "Too slow"],
      ["太多废话", "Too much nonsense"],
      ["经常错", "Often wrong"],
      ["不懂课程", "Does not understand course"],
      ["不适合考试", "Not exam-oriented"],
      ["还要自己整理", "Still have to organize myself"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "aiFail",
    title: "If AI caused a failed exam, what would you do?",
    type: "single",
    required: true,
    options: [
      ["直接弃用", "Stop using it"],
      ["Double Check", "Double Check"],
      ["本来就不信", "Never trusted it anyway"],
      ["更相信学长学姐", "Trust senior students more"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "feature",
    title: "What do you want AI to help with most?",
    type: "multi",
    options: [
      ["自动抓重点", "Auto find重点"],
      ["告诉我哪些不用学", "Tell me what not to study"],
      ["压缩 PPT", "Compress PPT"],
      ["Survival Plan", "Survival Plan"],
      ["自动排时间", "Schedule time"],
      ["预测考点", "Predict exam topics"],
      ["速背版", "Memorization version"],
      ["根据老师风格猜题", "Professor-style prediction"],
      ["历年题预测", "Past-paper prediction"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "referralFeature",
    title: "Which feature would you recommend to classmates?",
    type: "single",
    required: true,
    options: [
      ["AI 赌题", "AI exam guessing"],
      ["自动抓重点", "Auto find重点"],
      ["Final 冲刺模式", "Final sprint mode"],
      ["一键压缩 PPT", "One-click PPT compression"],
      ["生存计划", "Survival plan"],
      ["历年题预测", "Past-paper prediction"],
      ["告诉你哪些可以不学", "Tell what can be skipped"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "betaMaterial",
    title: "Founding Beta: would you test this with real course material?",
    type: "single",
    required: true,
    options: [
      ["可以，我愿意用真实 PPT 测", "Yes, real PPTs"],
      ["先看 sample，靠谱再上传", "Maybe, sample first"],
      ["不想上传，只想看 demo", "No upload, only demo"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "betaSpeed",
    title: "If selected, how soon would you try the private beta?",
    type: "single",
    required: true,
    options: [
      ["马上试，最好这周", "Immediately"],
      ["下次 final week 会试", "During next final"],
      ["先观望，有兴趣", "Just curious"],
    ].map(([label, value]) => ({ label, value })),
  },
  {
    id: "feedback",
    title: "Can we ask you for quick feedback?",
    type: "single",
    required: true,
    options: [
      ["可以 10 分钟 call", "10-minute call"],
      ["可以文字反馈", "Text feedback"],
      ["暂时不想被打扰", "No feedback"],
    ].map(([label, value]) => ({ label, value })),
  },
];

export default function WaitlistForm() {
  const [answers, setAnswers] = useState<SurveyAnswers>(initialAnswers);
  const [contact, setContact] = useState<WaitlistContact>(initialContact);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [offline, setOffline] = useState(false);
  const [success, setSuccess] = useState<WaitlistSubmission | null>(null);

  const lead = useMemo(() => scoreLead(answers), [answers]);
  const answeredCount = questions.filter((question) => {
    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length + (contact.email ? 1 : 0);
  const progress = Math.round((answeredCount / (questions.length + 1)) * 100);

  function updateAnswer(id: keyof SurveyAnswers, value: string | string[]) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  function shareUrl() {
    if (typeof window === "undefined") return process.env.NEXT_PUBLIC_SITE_URL || "";
    const configured = process.env.NEXT_PUBLIC_SITE_URL;
    if (configured) return configured;
    const url = new URL(window.location.href);
    url.hash = "";
    return url.protocol === "file:" ? "[部署后的公网网站链接]" : url.toString();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const result = scoreLead(answers);
    const submission: WaitlistSubmission = {
      ...answers,
      ...contact,
      ...result,
      shareUrl: shareUrl(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await saveWaitlistSubmission(submission);
      setOffline(Boolean(response.offline));

      if (response.offline) {
        const existing = JSON.parse(localStorage.getItem("final-week-submissions") || "[]") as WaitlistSubmission[];
        localStorage.setItem("final-week-submissions", JSON.stringify([submission, ...existing]));
      }

      setSuccess(submission);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Failed to save submission.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mt-8">
        <SuccessScreen offline={offline} submission={success} />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="sticky top-0 z-10 mb-4 grid gap-3 rounded-lg border border-line bg-white/90 p-3 shadow-soft backdrop-blur md:top-4">
        <div className="flex items-center justify-between gap-3 text-sm font-black">
          <span>{progress}% complete</span>
          <span>Survival Score {lead.score}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#eceff3]">
          <span className="block h-full rounded-full bg-ink transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[lead.cohort, ...lead.profile.slice(0, 4)].map((tag) => (
            <span key={tag} className="shrink-0 rounded-full bg-[#dff6ed] px-3 py-1 text-xs font-black text-[#174f38]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        {questions.map((question) => (
          <QuestionCard
            key={String(question.id)}
            question={question}
            value={answers[question.id]}
            onChange={updateAnswer}
          />
        ))}

        <div className="rounded-lg border border-line bg-white p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-2 font-bold">
              Email *
              <input
                required
                className="min-h-12 rounded-lg border border-line px-3 font-normal outline-none focus:border-ink"
                placeholder="you@school.edu"
                type="email"
                value={contact.email}
                onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
              />
            </label>
            <label className="grid gap-2 font-bold">
              School
              <input
                className="min-h-12 rounded-lg border border-line px-3 font-normal outline-none focus:border-ink"
                placeholder="Optional"
                value={contact.school}
                onChange={(event) => setContact((current) => ({ ...current, school: event.target.value }))}
              />
            </label>
            <label className="grid gap-2 font-bold">
              Major
              <input
                className="min-h-12 rounded-lg border border-line px-3 font-normal outline-none focus:border-ink"
                placeholder="Optional"
                value={contact.majorText}
                onChange={(event) => setContact((current) => ({ ...current, majorText: event.target.value }))}
              />
            </label>
            <label className="grid gap-2 font-bold md:col-span-2">
              What do you most want AI to solve?
              <textarea
                className="min-h-28 rounded-lg border border-line p-3 font-normal outline-none focus:border-ink"
                placeholder="Tell us the one thing that would save you during Final Week."
                value={contact.openProblem}
                onChange={(event) => setContact((current) => ({ ...current, openProblem: event.target.value }))}
              />
            </label>
          </div>

          {error ? <p className="mt-3 rounded-lg bg-[#fff0f0] p-3 text-sm text-[#9d2424]">{error}</p> : null}

          <div className="mt-4 grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ink bg-ink px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Saving..." : "Submit Waitlist"}
            </button>
            <p className="text-sm text-muted">
              No Discord, no group chat. Just early access if this matches your pain.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
