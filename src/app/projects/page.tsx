import type { Metadata } from "next";
import { ProjectsClientView } from "@/components/projects-client-view";

export const metadata: Metadata = {
  title: "Projects & Systems — Sumukha Upadhyaya",
  description:
    "Ten engineered systems including Overwatch Userspace EDR in C, VeloCell gRPC chat engine, Heli-XR, Project BAGH, RVCE Events, and Git-DSA in C99.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#D5D1C5] pb-8 items-end">
        <div className="md:col-span-5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] text-balance">
            Projects &amp; Systems
          </h1>
        </div>
        <div className="md:col-span-7">
          <p className="text-sm sm:text-base text-[#52514C] leading-relaxed text-pretty">
            Production backends, Linux userspace security monitors, edge acoustic ML pipelines, and C99 data-structure engines built from first principles.
          </p>
        </div>
      </div>

      <ProjectsClientView />
    </div>
  );
}
