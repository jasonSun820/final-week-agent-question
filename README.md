# Final Week Agent V2

Production-grade SaaS MVP scaffold for the **Final Week Survival System**.

This is not an AI chatbot, tutor, or notes app. It is a survival system for students who need to compress course material, find likely exam topics, decide what to study, and decide what to skip during Final Week.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Project Structure

```text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  Hero.tsx
  QuestionCard.tsx
  WaitlistForm.tsx
  SuccessScreen.tsx

lib/
  supabase.ts
  leadScore.ts

types/
  survey.ts

public/
```

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If Supabase is not configured, submissions fall back to browser `localStorage` and the success screen shows an offline warning. Do not collect real users without Supabase configured.

## Supabase Table

Create this table in Supabase SQL Editor:

```sql
create table if not exists waitlist_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  school text,
  year text,
  major_text text,
  majors jsonb default '[]'::jsonb,
  habit text,
  pain jsonb default '[]'::jsonb,
  start text,
  waste jsonb default '[]'::jsonb,
  gamble text,
  signal jsonb default '[]'::jsonb,
  abandon text,
  ai_problem jsonb default '[]'::jsonb,
  ai_blocker jsonb default '[]'::jsonb,
  ai_fail text,
  feature jsonb default '[]'::jsonb,
  referral_feature text,
  beta_material text,
  beta_speed text,
  feedback text,
  open_problem text,
  lead_score integer,
  cohort text,
  profile jsonb default '[]'::jsonb,
  share_url text,
  raw_json jsonb
);

alter table waitlist_submissions enable row level security;

create policy "Allow public waitlist inserts"
on waitlist_submissions
for insert
to anon
with check (true);
```

For PMF analysis, use Supabase table filters or export CSV.

Key metrics:

- Email submit rate
- Willing to test with real PPTs
- Willing to try immediately
- Willing to give feedback
- Top pain points
- Top requested features
- Founding Beta Candidate count

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Next.js.
4. Add the environment variables above.
5. Deploy.

## Mainland China Note

Vercel is fast to launch but may be unstable from mainland China. For mainland-heavy acquisition, consider:

- Tencent Cloud COS static hosting + CDN
- Alibaba Cloud OSS static hosting + CDN
- A custom domain with region-aware routing

The invite text uses the current deployed URL, so it works on any public host.
