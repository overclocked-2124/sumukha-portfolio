import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GitBranch, Layers, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  tagline: string;
  description: string;
  category: "Distributed Systems" | "Hardware & Security" | "Frontend & UI";
  stack: string[];
  status: "Active" | "Completed" | "Production";
  stars?: number;
  repoUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    title: "ChipCheck",
    tagline: "Silicon telemetry & instruction analysis suite",
    description: "Hardware verification diagnostics and instruction profiling tool. Designed to identify microarchitectural bottlenecks and enforce low-level validation suites.",
    category: "Hardware & Security",
    stack: ["TypeScript", "Next.js", "C++ Engine", "Telemetry"],
    status: "Active",
    repoUrl: "https://github.com/overclocked-2124/ChipCheck",
  },
  {
    title: "pennant",
    tagline: "High-throughput distributed feature evaluation daemon",
    description: "Distributed feature flagging engine architected for low-latency nodes. Features zero-allocation flag evaluation, memory-mapped state caches, and telemetry backhaul.",
    category: "Distributed Systems",
    stack: ["Go", "gRPC", "Protobuf", "Distributed Cache"],
    status: "Production",
    repoUrl: "https://github.com/overclocked-2124/pennant",
  },
  {
    title: "Portfolio & Digital Garden",
    tagline: "Celestial knowledge graph & personal engineering hub",
    description: "Space-themed digital garden synthesizing Google Material 3 tokens, shadcn/ui components, and Next.js App Router. Features clean editorial typography and strict zero-emoji aesthetics.",
    category: "Frontend & UI",
    stack: ["Next.js", "React 19", "Material 3", "Tailwind CSS v4"],
    status: "Active",
    repoUrl: "https://github.com/overclocked-2124/Portfolio",
    demoUrl: "/",
  },
  {
    title: "VeloCell",
    tagline: "Autonomous cellular automaton & compute grid",
    description: "Algorithmic simulation exploring high-speed grid state transitions and parallel compute workloads across decentralized nodes.",
    category: "Distributed Systems",
    stack: ["Rust", "WebAssembly", "Canvas API"],
    status: "Completed",
    repoUrl: "https://github.com/overclocked-2124/VeloCell",
  },
  {
    title: "PhaseShift",
    tagline: "Harmonic frequency synthesis and spectral visualizer",
    description: "DSP pipeline for dynamic phase modulation, spectral visualization, and real-time audio analysis utilizing modern web audio buffers.",
    category: "Frontend & UI",
    stack: ["Web Audio API", "GLSL", "React"],
    status: "Completed",
    repoUrl: "https://github.com/overclocked-2124/PhaseShift",
  },
  {
    title: "SQL Injection Analysis Lab",
    tagline: "AST parser & payload containment sandbox",
    description: "Security research lab demonstrating abstract syntax tree decomposition for dynamic query sanitization and vulnerability discovery.",
    category: "Hardware & Security",
    stack: ["Python", "AST", "Security Analysis"],
    status: "Completed",
    repoUrl: "https://github.com/overclocked-2124/SQL-Injection-Lab",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>Artifacts &amp; Repositories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Engineered Systems
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Production systems, exploratory experiments, and research toolkits developed across distributed infrastructure, hardware security, and user interfaces.
        </p>
      </div>

      {/* Filter / Category Indicator */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/60 text-xs font-mono text-slate-400">
        <span className="text-slate-500 mr-2">TAXONOMY:</span>
        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-indigo-300">
          All Sectors ({projects.length})
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
          Distributed Systems
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
          Hardware &amp; Security
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
          Frontend &amp; UI
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border-slate-800/80 bg-slate-950/70 p-6 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400/90">
                    {project.tagline}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="rounded-full text-[10px] font-mono border-slate-800 bg-slate-900/80 text-slate-400 shrink-0 px-2.5 py-0.5"
                >
                  {project.status}
                </Badge>
              </div>

              <p className="text-sm text-slate-300/80 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-500">
                {project.category}
              </span>

              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
