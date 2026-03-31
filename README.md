# sumukha.dev — Portfolio

> Not a portfolio page. A live engineering dashboard.

---

## The Concept

Most portfolios are static brochures. This one runs.

**sumukha.dev** is a real-time ops dashboard that aggregates live data about you — GitHub activity, LeetCode streak, project uptime, CTF rankings, commit velocity — served from a Kotlin BFF over gRPC/Protobuf, rendered in Next.js. The portfolio *is* the demo.

Visitors don't read about what you've built. They watch it working.

---

## What Makes It Stand Out

### 1. Live Data, Not Static Copy
- GitHub contribution graph — real, streaming, updates on scroll
- LeetCode: problems solved, acceptance rate, streak — fetched live
- RateForge: actual metrics from your deployed rate limiter (requests/sec, algorithm breakdown) — because why not dogfood your own project
- Uptime badges for your deployed services — live pings

### 2. Kotlin BFF + gRPC — The Stack Is The Point
The backend isn't Express. It's a Kotlin Spring Boot BFF exposing a gRPC API with Protobuf schemas. The Next.js frontend talks to it via grpc-web. When a recruiter opens DevTools, they see Protobuf binary on the wire. That's the flex.

### 3. Terminal Mode
Press `/` anywhere → drops into a terminal. Type commands:
- `whoami` → prints your bio
- `projects` → lists projects with live status
- `skills --verbose` → skill tree with context
- `ctf` → recent CTF writeups/ranks
- `contact` → opens contact form
- `sudo hire sumukha` → easter egg

### 4. The "Hire Me" API
Your portfolio exposes a public REST endpoint: `GET /api/sumukha` — returns a JSON profile. Documented with OpenAPI. Recruiters/bots can query you. Put it in your resume. It's ridiculous and it works.

### 5. Rate Limited (by RateForge, obviously)
The portfolio API is rate limited using your own RateForge SDK. The rate limit headers show up in responses. It's self-referential and impossible to miss.

---

## Stack

```
Frontend        Next.js 15 (App Router) + Tailwind + Framer Motion
BFF             Kotlin Spring Boot + gRPC server (port 9090)
Protocol        Protobuf 3 — shared schema between BFF and frontend
Transport       grpc-web (browser → BFF) + REST passthrough for /api/sumukha
Data Sources    GitHub GraphQL API, LeetCode GraphQL, your own deployed services
Rate Limiting   RateForge SDK (Token Bucket, sliding window)
Deploy          Vercel (frontend) + Fly.io or Cloud Run (BFF)
```

---

## Architecture

```
Browser
  │
  ├── grpc-web ──────────────► Kotlin BFF (gRPC :9090)
  │                                 │
  │                                 ├── GitHub GraphQL API
  │                                 ├── LeetCode GraphQL API
  │                                 ├── RateForge metrics endpoint
  │                                 └── Uptime checks (your services)
  │
  └── /api/sumukha (REST) ───► Next.js API Route → BFF passthrough
```

---

## Proto Schema (rough)

```protobuf
syntax = "proto3";

service PortfolioService {
  rpc GetProfile (ProfileRequest) returns (ProfileResponse);
  rpc GetProjects (ProjectsRequest) returns (stream ProjectStatus);
  rpc GetActivity (ActivityRequest) returns (ActivityResponse);
  rpc RunCommand (TerminalCommand) returns (TerminalOutput);
}

message ProjectStatus {
  string name = 1;
  string url = 2;
  bool is_live = 3;
  int64 uptime_ms = 4;
  string last_deployed = 5;
}

message ActivityResponse {
  int32 leetcode_solved = 1;
  int32 github_commits_30d = 2;
  string current_streak = 3;
  repeated string recent_repos = 4;
}
```

---

## Pages / Sections

| Route | Content |
|-------|---------|
| `/` | Hero — name, tagline, live GitHub activity heatmap, terminal prompt |
| `/projects` | Cards with live uptime + metrics from BFF stream |
| `/stack` | Visual skill tree — not a list, an actual graph |
| `/ctf` | CTF writeups, recent competitions, tools |
| `/blog` | (optional) MDX posts |
| `/api/sumukha` | The public JSON endpoint — the actual flex |

---

## Design Direction

**Dark. Dense. Technical.** Like a terminal crossed with a Bloomberg terminal.

- Font: Geist Mono for code, Inter for prose
- Colors: near-black background, electric blue/cyan accents, green for live/online indicators
- No stock photos, no gradients-for-the-sake-of-gradients
- Micro-animations: numbers counting up, typing effect in terminal, streaming data ticker
- Mobile: collapses gracefully but the terminal still works

**Reference vibes:** Linear's website density + Vercel's dark mode + a real monitoring dashboard

---

## Easter Eggs

- `sudo hire sumukha` in terminal → opens a pre-filled email draft
- Konami code → matrix rain but it's your commit history
- `/api/sumukha?format=resume` → returns your resume as JSON (RFC-compliant obviously)
- RateForge rate limit hit → custom 429 page that explains what RateForge is

---

## Repo Structure (planned)

```
sumukha-portfolio/
├── frontend/                 # Next.js app
│   ├── app/
│   ├── components/
│   │   ├── Terminal.tsx
│   │   ├── ProjectCard.tsx   # streams live status via grpc-web
│   │   └── ActivityFeed.tsx
│   └── proto/                # generated TS types from .proto
│
├── bff/                      # Kotlin Spring Boot gRPC server
│   ├── src/main/kotlin/
│   │   ├── PortfolioService.kt
│   │   ├── GitHubClient.kt
│   │   └── LeetCodeClient.kt
│   └── proto/                # shared .proto files
│
└── proto/                    # source of truth for .proto schemas
    └── portfolio.proto
```

---

## Why This Stack For a Portfolio?

Because the stack *is* the pitch. You're not saying "I know Kotlin and gRPC" in a bullet point. You're showing a recruiter a Kotlin gRPC server running in production, streaming Protobuf to a Next.js frontend, rate limited by your own distributed rate limiter, with a public API they can curl from their terminal.

That's a conversation starter, not a resume line.

---

## Build Order

1. Proto schema → generate Kotlin + TypeScript types
2. Kotlin BFF — stub all services, get gRPC running locally
3. Next.js shell — dark theme, layout, terminal component
4. Wire grpc-web — browser talking to BFF
5. Plug in real data sources (GitHub, LeetCode)
6. Live project status stream
7. `/api/sumukha` public endpoint
8. Polish + deploy

Estimated: 2-3 focused weekends.

---

*Built by Sumukha Upadhyaya — RVCE ISE + IIT Madras DS*
*Stack: Next.js · Kotlin · gRPC · Protobuf · RateForge*
