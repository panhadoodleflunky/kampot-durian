# AGENTS.md

Instructions for AI coding agents working in this repository. Cline, Claude, VS Code agent mode, and most other tools read this file automatically. Students: read it too. These are the rules your AI partner is being held to, and they are the same rules you are graded against.

## What this project is

One student's Khmer Living Archive, built in ICT 340 at AUPP. Every student builds the same four-feature skeleton (browse and search, contributor accounts, own-your-entries, submit-review-publish) around their own collection of Khmer culture. Features arrive in three sprints. Build only what the current task asks for; do not build ahead.

## Stack facts

- Next.js 15, App Router, React 19.
- JavaScript only. No TypeScript, no .ts or .tsx files, ever.
- Plain React. No CSS frameworks, no component libraries, no state libraries.
- Styling follows the existing pattern: inline style objects (see `app/page.js`) or a plain CSS file.
- `collection.config.js` is the single source of the archive's identity (name, description, curator, source). Read from it; never hard-code those values.

## Hard rules

1. Do not add dependencies. The three in `package.json` are the whole list. If a task seems to need a package, stop and say so instead of installing it.
2. Do not touch `package.json`, `package-lock.json`, `next.config.mjs`, or `.gitignore` unless the task explicitly names them.
3. Never write an API key, token, or password into any file. This repository is public.
4. Keep diffs scoped to what was asked. If completing the task honestly requires touching another file, say which file and why before editing it.
5. One component per file in `components/`, plain function components, roughly 80 lines or less. If a component wants to be bigger, split it.
6. Khmer text is first-class content, not an edge case. Never transliterate or "fix" it, and never invent it. **This edition is English-only by the owner's decision of 9 September 2026** — the growers' Khmer terms were removed from the site and preserved in `PROJECT.md` §8, ready to go back in for the Khmer edition. Do not re-insert them into this edition, and do not delete the `khmerName` field or the language-detection code that will carry them. Sample data comes from the student's real entries, never lorem ipsum.

## Working style

- For anything beyond a one-file change, state a short plan before writing code.
- Explain changes plainly. The student must be able to defend every line in a code review; write code and explanations that make that possible.
- The student reviews and approves every diff. Expect rejections and make them easy: small steps, clear boundaries.
- **Log the session before you finish, every session, using the full
  template.** At the end of any task that changes content, code, or a rule,
  append to the decision log (§11) of `PROJECT.md`, which sits one level
  above this repository in the course folder: the date, the prompt the
  student gave you in their own words, what you actually changed and in
  which files, what you decided and why, and anything left open — **then
  fill in every one of the nine fields in `PROJECT.md` §14**: technique used,
  what came back, what worked, what didn't, what was changed or rejected
  before accepting the output, any decision made that the task didn't
  specify, what was learned, which model(s) were used, and what's left open.
  **This is required on every entry, not just the ones that feel important.**
  "None" or "n/a" is a fine answer for a field that plainly doesn't apply to
  that session — leaving the field out is not, and an entry missing a field
  is treated the same as an unlogged change. This is the exact shape the
  Prompt Journal, weekly process log and sprint reflection ask for later;
  write it once, here, instead of making the student reconstruct it from
  commit history at the deadline. Close out anything it answers in
  `TODO.md`, the request list beside it — that file is the owner's scratch
  pad, so read it, act on it and tick items off, but never reformat or tidy
  it. `PROJECT.md` is the record of this project — the brief, the
  interviews, the Khmer glossary, the rules and the log, all in one file. It
  is what the student defends in review, and an unlogged change is an
  unfinished change. **Never commit it: it holds the farm's location and the
  household's income.**

## Content rule: primary sources only, and nothing invented

This archive is a record of testimony from real people, asked directly. It is
not a compilation, and it is no longer allowed to be one. An earlier version
carried invented speakers ("Mother", "Father", "Grandfather") and invented
quotes; the version after that replaced them with published research and news
reporting. Both are gone. The rule now:

- **Every claim on this site comes from a named, dated interview with a real
  person, or from the Khmer vocabulary that family uses in the field.** The
  interviews are recorded in `content/sources.js`.
- **Do not cite, quote, paraphrase, link to, or search for anything on the
  internet.** No news reports, no research papers, no trade standards, no
  government statistics, no encyclopaedias, no other websites. Not as a
  source, not as background, not as a sanity check on a grower's number. If a
  grower's figure looks wrong to you, that is not a reason to go and look it
  up — it is a question for the next interview.
- **No borrowed images.** Every photograph must be the curator's own. No stock,
  no Wikimedia, no licensed third-party image, however correctly attributed.
- Never invent a speaker, quote, date, Khmer name, statistic, or photo caption.
  "I don't know" is a valid entry state — see `status: "in-progress"`.
- Where a claim is thin, mark the entry `status: "in-progress"` and say what is
  missing. An admitted gap is worth more than a filled one.
- Say out loud what this sourcing costs. A reader cannot check any figure here
  against an outside source, and the site must not paper over that.
- `content/field-notes.js` and `content/sources.js` are the only places entry
  content lives. Pages read from them; no page hard-codes an entry.
- Four cautions travel with all of this material and are kept worded the same
  way everywhere they appear — see `cautions` in `content/sources.js`: peak
  prices, estimated tree counts, one orchard only, and the withheld location of
  the water source.

**If a task seems to need a fact nobody at the orchard has given, stop and say
so.** Do not fill it. The gap is the finding.

## Repository hygiene — what may be pushed

**This repository is public, and the course instructor is a collaborator.** On
4 September 2026 the working notes were removed from it and its history was
rewritten, because `INTERVIEW-ANSWERS.md` contained the orchard's exact
location and the growers' household income figures, and `/about` publicly
promises that location is not published.

**Commit only these:** source under `app/`, `components/`, `content/`; assets
in `public/`; `collection.config.js`, `entry-sketch.md`, `README.md`,
`package.json`, `package-lock.json`, `next.config.mjs`, `.gitignore`.

**`AGENTS.md` is tracked as of 15 September 2026.** It is this file, it holds
rules and no private material, and the Sprint 2 amendment below is a contract
change the instructor is meant to see in the history.

**Never commit, and never `git add -f`:**

| Path | Why |
| --- | --- |
| `PROJECT.md` | one level up, outside the repo. Interviews, Khmer glossary, build log, private notes. **Never `git add` it, and never move it into the repo.** |
| `.env*`, `.vercel`, `node_modules`, `.next` | already ignored |

**Before any commit that adds a file, run `git status` and look at what is
staged.** If it is not code, an asset, or project config, it does not go in.

**After any large content change, grep the tracked files for material the
growers asked to withhold** — the distance from the rapids, the access road,
the water source, household income — and for absolute claims that may have
gone stale (`only`, `every`, `never`, `most of this`). Six such contradictions
went live on 4 September before being caught.

**Reading the working file:** there is one, `PROJECT.md`, in the course folder
one level above this repository. Read it there. It holds the farm's location
and the household's income, so it must never be moved into the repository or
committed. The `workspace/` folder it replaced is gone.

## Sprint 2 amendment (added week 5)

Two dependencies are approved for Sprint 2, and only these two:
- @supabase/supabase-js
- @supabase/ssr

Everything else in the hard rules stands, especially rule 3:
no keys, tokens, or passwords in any committed file, ever.
Auth configuration lives in .env.local and in Vercel
environment variables.

Three consequences of the above, written down so they are not argued later:

- Rule 1 (do not add dependencies) is suspended for those two package names
  only. Any third package is still a stop-and-say-so, including one an agent
  offers as a peer dependency, a type stub, or a "required" helper.
- Rule 2 (do not touch `package.json`, `package-lock.json`, `.gitignore`) is
  lifted only for the install of those two packages and for the one
  `.gitignore` edit that made this file tracked. Nothing else in those files
  changes without the task naming them.
- Sprint 2 builds contributor accounts: sign up, log in, log out. It does not
  build entry ownership or submit-review-publish. Those are later tasks, and
  "do not build ahead" still holds.
