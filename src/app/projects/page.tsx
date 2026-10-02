import { ProjectsClientView } from "@/components/projects-client-view";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Page Header — Auxia-style split header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#C8C5D0]/30 pb-8 items-start">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#5954A8] font-bold">PROJECTS / REPOSITORIES</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B1B1F] font-sans">
            Engineered Systems
          </h1>
        </div>
        <div className="md:col-span-2">
          <p className="text-base text-[#46464F] leading-relaxed font-normal">
            Software engineering systems, research experiments, and developer tools built across userspace telemetry, distributed services, and responsive web applications.
          </p>
        </div>
      </div>

      {/* Interactive Projects Catalog */}
      <ProjectsClientView />
    </div>
  );
}
