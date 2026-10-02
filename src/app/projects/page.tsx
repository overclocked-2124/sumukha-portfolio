import { ProjectsClientView } from "@/components/projects-client-view";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5954A8] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <span>Projects &amp; Repositories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1B20] font-sans">
          Engineered Systems
        </h1>
        <p className="text-base text-[#49454F] leading-relaxed font-normal">
          Software engineering systems, research experiments, and developer tools built across userspace telemetry, distributed services, and responsive web applications.
        </p>
      </div>

      {/* Interactive Projects Catalog */}
      <ProjectsClientView />
    </div>
  );
}
