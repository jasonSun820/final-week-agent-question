export default function Hero() {
  return (
    <section className="mx-auto grid w-[min(1120px,calc(100%_-_32px))] gap-9 py-12 md:min-h-screen md:grid-cols-[1.18fr_0.82fr] md:items-center md:py-16">
      <div>
        <span className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3 text-sm font-semibold text-muted">
          Private beta waitlist · 中文留学生优先内测
        </span>
        <h1 className="mt-5 max-w-4xl text-[clamp(40px,11vw,92px)] font-black leading-[0.94] tracking-normal">
          Final Week is not studying anymore. It&apos;s survival.
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(19px,4.5vw,28px)] leading-tight text-[#30333a]">
          Upload your PPTs. Find what actually matters. Pass Finals with less guessing.
        </p>
        <p className="mt-4 max-w-2xl text-[17px] text-[#4f535b]">
          给考前才开始翻 PPT、边焦虑边问 ChatGPT、还不敢完全相信 AI 的留学生。
        </p>
        <p className="mt-6 text-sm text-muted">
          1284 students already shared their Final Week struggles.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["考前 72 小时", "PPT 太多", "AI 怕幻觉", "需要抓重点"].map((tag) => (
            <span key={tag} className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-sm font-bold">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:flex">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ink bg-ink px-5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-soft"
            href="#survey"
          >
            Join Early Access <span className="ml-2">→</span>
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ink bg-white px-5 font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-soft"
            href="#pain"
          >
            看看是不是你
          </a>
        </div>
      </div>

      <div className="mx-auto w-[min(100%,390px)] rounded-[32px] border border-line bg-[#f2f3f5] p-3 shadow-soft transition hover:-translate-y-1">
        <div className="overflow-hidden rounded-3xl border border-[#dfe2e8] bg-white">
          <div className="flex items-center justify-between border-b border-line p-5">
            <strong>Survival Scan</strong>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c8ccd4]" />
              <span className="h-2 w-2 rounded-full bg-[#c8ccd4]" />
              <span className="h-2 w-2 rounded-full bg-[#c8ccd4]" />
            </div>
          </div>
          <div className="p-5">
            <div className="rounded-2xl border border-dashed border-[#bfc5cf] bg-soft p-5">
              <span className="text-xs font-bold uppercase text-muted">Uploaded</span>
              <strong className="mt-2 block text-lg">Lecture_01-12_Final.pdf</strong>
              <div className="mt-3 h-2 rounded-full bg-[#eceff3]">
                <span className="block h-full w-[78%] rounded-full bg-ink" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted">
                <span className="font-bold text-[#1f7a52]">Scanning exam signals</span>
                <span>Survival score 84</span>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {[
                ["Study This", "Regression assumptions", "老师反复提到，PPT 出现 6 次。", "text-[#1f7a52]"],
                ["Review Later", "Model comparison table", "有用，但大概率不是主观题核心。", "text-[#a86616]"],
                ["Skip This", "Historical appendix", "除非老师点名，否则先放弃。", "text-[#b23838]"],
              ].map(([label, title, body, color]) => (
                <div key={label} className="rounded-2xl border border-line bg-white p-4">
                  <div className={`mb-1 text-xs font-black uppercase ${color}`}>{label}</div>
                  <strong>{title}</strong>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
