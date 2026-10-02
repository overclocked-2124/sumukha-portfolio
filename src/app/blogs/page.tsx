import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowUpRight, Clock, Calendar } from "lucide-react";

interface Note {
  slug: string;
  title: string;
  excerpt: string;
  stage: "Seedling" | "Budding" | "Evergreen";
  category: "Systems" | "Security" | "Architecture" | "Design";
  date: string;
  readTime: string;
}

const gardenNotes: Note[] = [
  {
    slug: "distributed-consensus-deep-space",
    title: "Distributed Consensus in Deep Space Networks",
    excerpt: "Exploring latency-tolerant routing mechanisms, raft partition handling, and cryptographic state verification across planetary delay intervals.",
    stage: "Evergreen",
    category: "Systems",
    date: "Oct 2026",
    readTime: "7 min read",
  },
  {
    slug: "deterministic-runtime-sandboxing",
    title: "Deterministic Runtime Environments & MicroVM Sandboxing",
    excerpt: "Dissecting KVM-based microVMs, capability revocation, and deterministic syscall interception in multi-tenant agent execution boundaries.",
    stage: "Budding",
    category: "Security",
    date: "Sep 2026",
    readTime: "9 min read",
  },
  {
    slug: "material3-and-shadcn-synthesis",
    title: "Synthesizing Design Tokens: Google Material 3 and shadcn/ui",
    excerpt: "How to harmonize custom web elements, semantic M3 elevation tiers, and Tailwind CSS v4 variables into a cohesive design system without aesthetic friction.",
    stage: "Seedling",
    category: "Design",
    date: "Sep 2026",
    readTime: "5 min read",
  },
  {
    slug: "zero-allocation-telemetry",
    title: "Designing Zero-Allocation Telemetry Pipelines in Go",
    excerpt: "Leveraging sync.Pool, ring buffers, and off-heap serialization patterns to process gigabytes of metric events per node without GC pauses.",
    stage: "Evergreen",
    category: "Systems",
    date: "Aug 2026",
    readTime: "11 min read",
  },
  {
    slug: "ast-security-parsing",
    title: "Abstract Syntax Tree Rewriting for Dynamic SQL Containment",
    excerpt: "Why regex-based query sanitizers always fail, and how compiler parse trees guarantee safe parameterized statement transformations.",
    stage: "Budding",
    category: "Security",
    date: "Jul 2026",
    readTime: "6 min read",
  },
  {
    slug: "principles-of-digital-gardening",
    title: "Epistemology of the Digital Garden",
    excerpt: "Transitioning from chronological publication streams to interconnected semantic graphs. Why incremental pruning and tending yields better knowledge synthesis.",
    stage: "Evergreen",
    category: "Architecture",
    date: "Jun 2026",
    readTime: "4 min read",
  },
];

export default function BlogsPage() {
  const getStageColor = (stage: Note["stage"]) => {
    switch (stage) {
      case "Seedling":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Budding":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "Evergreen":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    }
  };

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Garden Logbook &amp; Essays</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Digital Garden Notes
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          An evolving locus of technical research, architectural notes, and essays. Organized by growth stage rather than publication chronology.
        </p>
      </div>

      {/* Stage Explainer Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-slate-500">STAGE FILTER:</span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-200">
            All Notes ({gardenNotes.length})
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 hover:border-emerald-500/40 cursor-pointer transition-colors">
            Seedling (1)
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400 hover:border-amber-500/40 cursor-pointer transition-colors">
            Budding (2)
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-indigo-300 hover:border-indigo-500/40 cursor-pointer transition-colors">
            Evergreen (3)
          </span>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Last pruned: Today
        </div>
      </div>

      {/* Notes Stream */}
      <div className="flex flex-col gap-5">
        {gardenNotes.map((note) => (
          <Card
            key={note.slug}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border-slate-800/80 bg-slate-950/60 p-6 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono ${getStageColor(
                    note.stage
                  )}`}
                >
                  {note.stage}
                </Badge>
                <span className="text-slate-500 font-mono text-[11px]">
                  {note.category}
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.date}
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {note.readTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                {note.title}
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                {note.excerpt}
              </p>
            </div>

            <div className="sm:self-center shrink-0">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-indigo-400 transition-colors border border-slate-800 rounded-full px-3.5 py-1.5 bg-slate-900/80">
                <span>Read note</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
