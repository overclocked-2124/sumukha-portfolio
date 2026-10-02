import { Card } from "@/components/ui/card";
import { User, Compass, Cpu, Orbit } from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      title: "First-Principles Rigor",
      description: "Deconstructing systems down to memory models, cache lines, protocol primitives, and mathematical invariants rather than relying on cargo-cult abstractions.",
    },
    {
      title: "Tactile Ergonomics",
      description: "Interface components should feel solid, predictable, and responsive. Visual feedback and spatial cadence elevate utility into an extension of thought.",
    },
    {
      title: "Living Documentation",
      description: "Codebases and digital gardens should be treated as continuously tended ecosystems: seeded, pruned, refactored, and interconnected.",
    },
  ];

  const competencies = [
    {
      domain: "Distributed Systems & Infra",
      items: ["Go", "gRPC", "Protobuf", "Distributed Consensus", "Docker / Linux Cgroups", "Observability"],
    },
    {
      domain: "Frontend Architecture",
      items: ["TypeScript", "Next.js (App Router)", "React 19", "Tailwind CSS v4", "Google Material 3", "Web Components"],
    },
    {
      domain: "Systems & Low-Level Security",
      items: ["C / C++", "Microarchitectural Analysis", "AST Parsing", "Static Analysis", "POSIX Internals"],
    },
  ];

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-wider uppercase">
          <User className="w-3.5 h-3.5" />
          <span>Operator Biography &amp; Ethos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          About the Station
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Engineering systems from low-level execution pipelines to high-craft user interfaces.
        </p>
      </div>

      {/* Main Narrative Card */}
      <Card className="rounded-2xl border-slate-800/80 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-indigo-500/30 bg-indigo-950/60 flex items-center justify-center text-indigo-400">
            <Orbit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Sumukha • overclocked-2124</h2>
            <span className="text-xs font-mono text-slate-400">Systems Engineer &amp; Interface Craftsman</span>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            I am a software engineer focused on building robust, high-performance computing infrastructure and refined digital experiences. My technical work spans distributed telemetry engines, compiler and instruction-level analysis tools, and interface design systems.
          </p>
          <p>
            This portfolio functions as a digital garden: an interconnected network of evolving ideas, production notes, and experiments. Unlike static timelines, this space preserves working hypotheses alongside finished codebases.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
          <div><span className="text-slate-500">Location:</span> Planetary Orbit / India</div>
          <div><span className="text-slate-500">Focus:</span> Infrastructure, Security &amp; Next-Gen Web</div>
          <div><span className="text-slate-500">GitHub:</span> <a href="https://github.com/overclocked-2124" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">@overclocked-2124</a></div>
        </div>
      </Card>

      {/* Engineering Philosophy */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Core Engineering Tenets</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((p) => (
            <Card key={p.title} className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/60 flex flex-col gap-2.5">
              <h3 className="text-sm font-semibold text-slate-200">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Competencies Matrix */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Technical Domain Matrix</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {competencies.map((comp) => (
            <Card key={comp.domain} className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/60 flex flex-col gap-3">
              <span className="text-xs font-mono font-medium text-indigo-300 uppercase tracking-wider">
                {comp.domain}
              </span>
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0 text-xs text-slate-300">
                {comp.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
