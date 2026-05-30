"use client";

import { useEffect, useState } from "react";
import type { WaitlistSubmission } from "@/types/survey";

type Props = {
  submission: WaitlistSubmission;
  offline: boolean;
};

function buildInviteText(submission: WaitlistSubmission) {
  const courseHint = submission.school
    ? `${submission.school} / 同课的人越多，测试越准。`
    : "同课的人越多，测试越准。";

  return [
    "我刚加入了 Final Week Survival System 的早期内测。",
    "它不是 AI tutor，而是帮留学生在 final week 抓重点、压缩 PPT、预测高概率考点、判断哪些可以先放弃的 survival tool。",
    `我的 profile 是：${submission.profile.join(" / ")}。`,
    `我的内测状态：${submission.cohort}。`,
    courseHint,
    `你也可以填一下 early access：${submission.shareUrl}`,
  ].join("\n");
}

export default function SuccessScreen({ submission, offline }: Props) {
  const inviteText = buildInviteText(submission);

  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(inviteText);
      const event = new CustomEvent("final-week-copy", { detail: "copied" });
      window.dispatchEvent(event);
    } catch {
      const event = new CustomEvent("final-week-copy", { detail: "failed" });
      window.dispatchEvent(event);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-[linear-gradient(135deg,rgba(223,246,237,0.9),rgba(255,255,255,0.9)_48%)] p-5 md:p-7">
      <span className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3 text-sm font-semibold text-muted">
        You&apos;re in.
      </span>
      <h2 className="mt-4 text-4xl font-black leading-none md:text-6xl">
        We&apos;re building the fastest way to survive Finals.
      </h2>
      <p className="mt-4 text-muted">You may be selected for our first private beta.</p>

      {offline ? (
        <div className="mt-5 rounded-lg border border-[#f2d28b] bg-[#fff7e6] p-4 text-sm text-[#744b06]">
          Supabase is not configured yet. This submission was not saved to the cloud.
          Add environment variables before collecting real users.
        </div>
      ) : null}

      <h3 className="mt-6 text-xl font-black">Your Final Week Profile</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {submission.profile.map((tag) => (
          <span key={tag} className="rounded-full border border-ink bg-white px-3 py-1.5 text-sm font-bold">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-lg border border-line bg-white p-4">
        <strong>{submission.cohort}</strong>
        <p className="text-muted">
          Lead score: {submission.score}. 我们会优先邀请痛点最强、愿意真实测试、愿意反馈的同学进入第一批 private beta。
        </p>
      </div>

      <div className="mt-4 whitespace-pre-wrap rounded-lg border border-line bg-white p-4 text-sm text-[#30333a]">
        {inviteText}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          className="min-h-10 rounded-lg border border-ink bg-white px-4 font-bold text-ink transition hover:-translate-y-0.5"
          type="button"
          onClick={copyInvite}
        >
          Copy invite text
        </button>
        <CopyStatus />
      </div>
    </div>
  );
}

function CopyStatus() {
  const status = useCopyStatus();

  return (
    <span className="text-sm text-muted">
      {status || "复制后会自动带上当前网站链接。部署到任何公网托管后都能用。"}
    </span>
  );
}

function useCopyStatus() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    function handler(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setStatus(detail === "copied" ? "Copied. 发给同专业同学一起测，信号会更准。" : "复制失败，可以手动选中上面这段文字。");
    }

    window.addEventListener("final-week-copy", handler);
    return () => window.removeEventListener("final-week-copy", handler);
  }, []);

  return status;
}
