import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Terminal, 
  Orbit, 
  Compass, 
  FolderGit2, 
  BookOpen 
} from "lucide-react";

export default function Home() {
  const gardenNotes = [
    {
      title: "Distributed Consensus in Deep Space Networks",
      stage: "Evergreen",
      category: "Systems",
      readTime: "6 min read",
      date: "Oct 2026",
      summary: "Exploring latency-tolerant routing mechanisms and synchronization patterns across high-propagation delay clusters.",
    },
    {
      title: "Deterministic Runtime Environments & Sandboxing",
      stage: "Budding",
      category: "Security",
      readTime: "8 min read",
      date: "Sep 2026",
      summary: "A breakdown of microVM isolation primitives, memory fences, and capability-based access models.",
    },
    {
      title: "Synthesizing Design Tokens with Material 3 & Tailwind",
      stage: "Seedling",
      category: "Architecture",
      readTime: "4 min read",
      date: "Sep 2026",
      summary: "Architecting a unified design token pipeline bridging component primitives and custom web elements.",
    },
  ];

  const featuredProjects = [
    {
      title: "ChipCheck",
      description: "Hardware verification telemetry and microarchitecture instruction analysis engine.",
      tags: ["TypeScript", "Next.js", "Analysis"],
      stats: "Private Core",
      href: "/projects",
    },
    {
      title: "pennant",
      description: "Distributed feature flagging and high-throughput evaluation daemon built for low-latency nodes.",
      tags: ["Distributed Systems", "Go", "Observability"],
      stats: "Distributed",
      href: "/projects",
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-start gap-6 pt-6 sm:pt-12">
        {/* Status Chip / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-950/40 text-xs font-mono text-indigo-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ORBITAL STAGE • ACTIVE RESEARCH</span>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Cultivating systems, architecture, and ideas in deep space.
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed">
            Welcome to my digital garden and technical workshop. A curated locus for interconnected notes, software architectures, exploratory seedlings, and production artifacts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 px-6 flex items-center gap-2"
            )}
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 px-6 backdrop-blur-md flex items-center gap-2"
            )}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Explore Garden</span>
          </Link>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-6 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Garden Notes</span>
            <span className="text-2xl font-bold text-slate-200">24+</span>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Repositories</span>
            <span className="text-2xl font-bold text-indigo-400">80+</span>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Primary Stack</span>
            <span className="text-2xl font-bold text-cyan-400">TS / Next</span>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Design System</span>
            <span className="text-2xl font-bold text-violet-400">M3 + shadcn</span>
          </div>
        </div>
      </section>

      {/* Garden Entries / Recent Notes */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Orbit className="w-5 h-5 text-indigo-400" />
            <h2 className="text-2xl font-semibold tracking-tight text-white">Recent Garden Sprouts</h2>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <span>All garden notes</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gardenNotes.map((note) => (
            <Card
              key={note.title}
              className="group flex flex-col justify-between rounded-2xl border-slate-800/80 bg-slate-950/60 p-5 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge
                    variant="outline"
                    className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[11px] font-mono rounded-full px-2.5 py-0.5"
                  >
                    {note.stage}
                  </Badge>
                  <span className="text-slate-500 font-mono text-[11px]">{note.date}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {note.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-900 text-xs font-mono text-slate-500">
                <span>{note.category}</span>
                <span>{note.readTime}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-semibold tracking-tight text-white">Highlighted Systems</h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>All projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <Card
              key={project.title}
              className="rounded-2xl border-slate-800/80 bg-slate-950/60 p-6 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 border border-slate-800 rounded px-2 py-0.5">
                    {project.stats}
                  </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-900">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.href}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Inspect <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Philosophies / Garden Rules */}
      <section className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/40 to-slate-950/80 p-8 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Compass className="w-4 h-4" />
            <span>Digital Garden Taxonomy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Information Architecture &amp; Growth Stages
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            Unlike traditional static portfolios or chronological blogs, this space is organized as an organic garden: ideas evolve from initial observations to structured architectural frameworks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-xs font-mono font-medium text-emerald-400">Seedling</span>
              <p className="text-xs text-slate-400">
                Early-stage fragments, rough notes, initial questions, and emerging hunches.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-xs font-mono font-medium text-amber-400">Budding</span>
              <p className="text-xs text-slate-400">
                Synthesized concepts with supporting experiments, benchmarks, and architectural designs.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-xs font-mono font-medium text-indigo-400">Evergreen</span>
              <p className="text-xs text-slate-400">
                Mature, referenced essays and production-verified engineering patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
