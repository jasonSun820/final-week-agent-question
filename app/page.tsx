import Hero from "@/components/Hero";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="pain" className="mx-auto w-[min(1120px,calc(100%_-_32px))] py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black leading-none tracking-normal md:text-6xl">
            Built for the last 72 hours.
          </h2>
          <p className="mt-4 text-lg text-muted">
            这不是完美笔记，也不是另一个聊天框。它是一个期末周生存过滤器：
            帮你决定先学什么、压缩什么、以及哪些内容可以战略性放弃。
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["PPT Overload", "几百页 slides 堆在一起，明天就考，但不知道哪里会出。"],
            ["Strategic Guessing", "你本来就在赌题。问题是靠直觉赌，还是靠信号赌。"],
            ["AI Skepticism", "AI 说得很像真的，但抓错重点真的会要命。"],
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-lg border border-line bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <strong className="block text-xl">{title}</strong>
              <p className="mt-2 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,calc(100%_-_32px))] py-10 md:py-14">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black leading-none tracking-normal md:text-6xl">
            The MVP we are testing.
          </h2>
          <p className="mt-4 text-lg text-muted">
            上传 PPT，得到考试导向的 Final Cheat Sheet、生存计划，以及
            Study This / Skip This / Review Later 的直接拆分。
          </p>
        </div>
      </section>

      <section id="survey" className="mx-auto w-[min(1120px,calc(100%_-_32px))] py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black leading-none tracking-normal md:text-6xl">
            Join early access.
          </h2>
          <p className="mt-4 text-lg text-muted">
            大约两分钟。你的答案会帮助我们判断：中文留学生期末周最需要先救哪一步。
          </p>
        </div>

        <WaitlistForm />
      </section>
    </main>
  );
}
