import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  personalInfo, 
  projectList, 
  gardenNotes, 
  experienceList,
  educationList
} from "@/data/portfolio-data";

export default function Home() {
  const featuredProjects = projectList.filter((p) => p.featured);
  const featuredNotes = gardenNotes.slice(0, 3);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Seedling":
        return "border-[#85D49B]/50 bg-[#D2E7D6] text-[#0F381E]";
      case "Budding":
        return "border-[#FFB77D]/50 bg-[#FFDCC1] text-[#2E1500]";
      case "Evergreen":
        return "border-[#C7BFFF]/50 bg-[#E3DFFF] text-[#140E62]";
      default:
        return "border-[#C8C5D0] bg-[#EEEBF2] text-[#1B1B1F]";
    }
  };

  return (
    <div className="flex flex-col gap-24 py-4">
      {/* Hero Section — Auxia-inspired high-impact typography and clean pacing */}
      <section className="flex flex-col items-start gap-8 pt-4 sm:pt-8">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1B1B1F] leading-[1.08] font-sans">
            Systems runtimes, distributed backends, and reliable web infrastructure.
          </h1>
          <p className="text-lg sm:text-xl text-[#46464F] leading-relaxed font-normal pt-2">
            I am <span className="font-semibold text-[#1B1B1F]">Sumukha Upadhyaya</span>, a software engineering student at <span className="font-semibold text-[#1B1B1F]">RVCE</span> (9.69 CGPA) and <span className="font-semibold text-[#1B1B1F]">IIT Madras</span> (9.15 GPA). Previously engineering access control and BigQuery ingestion pipelines at <span className="font-semibold text-[#1B1B1F]">Auxia</span>, and multi-tenant platforms at <span className="font-semibold text-[#1B1B1F]">FindInbox</span>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-[#5954A8] text-white hover:bg-[#4B4699] transition-all px-6 py-2.5 text-xs font-semibold cursor-pointer shadow-xs"
            )}
          >
            <span>Explore Systems &rarr;</span>
          </Link>

          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-[#C7BFFF]/60 bg-[#E3DFFF] text-[#140E62] hover:bg-[#D5CEFF] transition-all px-6 py-2.5 text-xs font-semibold cursor-pointer"
            )}
          >
            <span>Engineering Notes &rarr;</span>
          </Link>

          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-full border border-[#C8C5D0]/60 bg-white text-[#1B1B1F] hover:bg-[#F4F2F7] px-6 py-2.5 text-xs font-mono transition-colors"
          >
            {personalInfo.email}
          </a>
        </div>

        {/* Auxia-inspired Systems Architecture Pipeline */}
        <div className="w-full mt-4 p-6 sm:p-8 rounded-3xl bg-[#F4F2F7] border border-[#C8C5D0]/30 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C8C5D0]/30 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#5954A8] font-bold">
                Systems Execution Architecture
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#1B1B1F] mt-0.5">
                From userspace syscall interception to zero-allocation distributed evaluation
              </h2>
            </div>
            <span className="text-xs font-mono text-[#635F6A] shrink-0">
              PRODUCTION TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-[#C8C5D0]/20 shadow-xs">
              <span className="text-[11px] font-mono text-[#5954A8] font-bold">STAGE 01</span>
              <h3 className="text-sm font-bold text-[#1B1B1F]">Syscall Interception</h3>
              <p className="text-xs text-[#46464F] leading-relaxed">
                Linux ptrace attaches to execution boundaries to observe tracee state without kernel module crash risks.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-[#C8C5D0]/20 shadow-xs">
              <span className="text-[11px] font-mono text-[#5954A8] font-bold">STAGE 02</span>
              <h3 className="text-sm font-bold text-[#1B1B1F]">Register Decoding</h3>
              <p className="text-xs text-[#46464F] leading-relaxed">
                Decodes x86_64 System V ABI registers (orig_rax, rdi, rsi) to reconstruct cross-process memory strings.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-[#C8C5D0]/20 shadow-xs">
              <span className="text-[11px] font-mono text-[#5954A8] font-bold">STAGE 03</span>
              <h3 className="text-sm font-bold text-[#1B1B1F]">Zero-Allocation Eval</h3>
              <p className="text-xs text-[#46464F] leading-relaxed">
                Memory-mapped caches and sync.Pool buffer reuse evaluate feature flags in sub-microsecond critical paths.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-[#C8C5D0]/20 shadow-xs">
              <span className="text-[11px] font-mono text-[#5954A8] font-bold">STAGE 04</span>
              <h3 className="text-sm font-bold text-[#1B1B1F]">Production Rollout</h3>
              <p className="text-xs text-[#46464F] leading-relaxed">
                Live database migrations with backward compatibility and BigQuery self-serve RPC ingestion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Selected Systems — Auxia-style split header */}
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#C8C5D0]/30 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#5954A8] font-bold">01 / SELECTED SYSTEMS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight">
              Engineered Systems
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm sm:text-base text-[#46464F] leading-relaxed">
              Low-level research engines, microarchitectural verification tools, and high-throughput distributed daemons built from first principles in C, Go, Python, and TypeScript.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              className="flex flex-col justify-between rounded-3xl border-[#C8C5D0]/30 bg-white p-7 hover:border-[#5954A8]/40 hover:shadow-xs transition-all duration-200 group"
            >
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-lg font-bold text-[#1B1B1F] group-hover:text-[#5954A8] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-[#5954A8]">
                      {project.tagline}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono border-[#C8C5D0]/40 bg-[#F4F2F7] px-2.5 py-0.5 text-[#46464F] shrink-0"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-[#46464F] leading-relaxed">
                  {project.description}
                </p>

                {/* Architectural Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#F4F2F7] border border-[#C8C5D0]/20 mt-1">
                    <span className="text-[10px] font-mono text-[#635F6A] uppercase tracking-wider font-semibold">
                      Key Capabilities
                    </span>
                    <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs text-[#46464F]">
                      {project.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8] mt-1.5 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-[#46464F] bg-[#F4F2F7] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#C8C5D0]/20 text-xs font-mono">
                <span className="text-[#635F6A]">
                  {project.category}
                </span>

                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#46464F] hover:text-[#1B1B1F] transition-colors"
                    >
                      [Source Code]
                    </a>
                  )}
                  <Link
                    href={`/projects`}
                    className="text-[#5954A8] hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 02: Work Experience — Auxia-style split header */}
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#C8C5D0]/30 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#5954A8] font-bold">02 / INDUSTRY WORK</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight">
              Work Experience
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm sm:text-base text-[#46464F] leading-relaxed">
              Production engineering internships with verified ownership over database access control, data warehouse ingestion RPCs, and multi-tenant applications.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {experienceList.map((exp, idx) => (
            <Card key={idx} className="p-7 rounded-3xl border-[#C8C5D0]/30 bg-white flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C8C5D0]/20 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#1B1B1F]">{exp.company}</h3>
                  <span className="text-xs font-mono text-[#5954A8] font-semibold">{exp.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#635F6A]">
                  <span className="px-3 py-1 rounded-full bg-[#F4F2F7] border border-[#C8C5D0]/40">{exp.timeline}</span>
                  <span className="text-[#C8C5D0]">/</span>
                  <span>{exp.type}</span>
                </div>
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm text-[#46464F] leading-relaxed">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-[#46464F] bg-[#F4F2F7] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 03: Education & Academic Performance */}
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#C8C5D0]/30 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#5954A8] font-bold">03 / ACADEMIC FOUNDATION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight">
              Education &amp; Rigor
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm sm:text-base text-[#46464F] leading-relaxed">
              Top percentile academic performance combining core computer science and operating systems with concurrent data science and algorithmic optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {educationList.map((edu) => (
            <Card
              key={edu.institution}
              className="flex flex-col justify-between p-6 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#635F6A]">
                  <span>{edu.timeline}</span>
                  <Badge variant="outline" className="border-[#C7BFFF]/40 bg-[#E3DFFF] text-[#140E62] text-[10px] font-bold">
                    {edu.grade}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-[#1B1B1F] leading-snug">{edu.institution}</h3>
                <span className="text-xs font-mono text-[#5954A8] font-medium">{edu.degree}</span>
                <p className="text-xs text-[#46464F] leading-relaxed mt-1">{edu.details}</p>
              </div>

              <ul className="mt-4 pt-4 border-t border-[#C8C5D0]/20 list-none p-0 flex flex-col gap-1.5 text-xs text-[#635F6A]">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8] mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 04: Engineering Notes / Digital Garden */}
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#C8C5D0]/30 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#5954A8] font-bold">04 / DIGITAL GARDEN</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight">
              Engineering Notes
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm sm:text-base text-[#46464F] leading-relaxed">
              In-depth research writeups and systems architectural notes. Organized by growth stage from early seedlings to evergreen reference patterns.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredNotes.map((note) => (
            <Link key={note.slug} href={`/blogs/${note.slug}`} className="group block h-full">
              <Card className="flex flex-col justify-between h-full rounded-3xl border-[#C8C5D0]/30 bg-white p-6 hover:border-[#5954A8]/40 hover:shadow-xs transition-all duration-200">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono rounded-full px-2.5 py-0.5 ${getStageColor(
                        note.stage
                      )}`}
                    >
                      {note.stage}
                    </Badge>
                    <span className="text-[#635F6A] font-mono text-[11px]">{note.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#1B1B1F] group-hover:text-[#5954A8] transition-colors leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-[#46464F] leading-relaxed">
                    {note.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#C8C5D0]/20 text-xs font-mono text-[#635F6A]">
                  <span>{note.category}</span>
                  <span className="text-[#5954A8] group-hover:underline">
                    Read &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 05: Auxia-Style Callout Contact */}
      <section className="rounded-3xl border border-[#C8C5D0]/40 bg-[#F4F2F7] p-8 sm:p-12 flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-[#5954A8] font-bold">
            05 / CONTACT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1F] tracking-tight font-sans">
            Let&apos;s build something durable together.
          </h2>
          <p className="text-sm sm:text-base text-[#46464F] leading-relaxed">
            I am always open to discussing systems programming, distributed infrastructure, open-source projects, and engineering opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center px-6 py-3 rounded-full text-xs font-mono bg-[#5954A8] text-white hover:bg-[#4B4699] transition-colors shadow-xs font-semibold"
          >
            <span>Email me ({personalInfo.email})</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-5 py-3 rounded-full text-xs font-mono bg-white border border-[#C8C5D0]/60 text-[#1B1B1F] hover:bg-[#EEEBF2] transition-colors font-medium"
          >
            <span>GitHub Profile</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-5 py-3 rounded-full text-xs font-mono bg-white border border-[#C8C5D0]/60 text-[#1B1B1F] hover:bg-[#EEEBF2] transition-colors font-medium"
          >
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
}
