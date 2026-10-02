import { ProjectsClientView } from "@/components/projects-client-view";
import { Layers } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
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
          Production systems, exploratory experiments, and low-level research engines developed across userspace security, distributed infrastructure, and reactive interfaces.
        </p>
      </div>

      {/* Interactive Projects Catalog */}
      <ProjectsClientView />
    </div>
  );
}
