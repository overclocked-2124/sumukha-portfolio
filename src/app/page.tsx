import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  personalInfo, 
  projectList, 
  gardenNotes, 
  experienceList 
} from "@/data/portfolio-data";

export default function Home() {
  const featuredProjects = projectList.filter((p) => p.featured);
  const featuredNotes = gardenNotes.slice(0, 3);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Seedling":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Budding":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "Evergreen":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
      default:
        return "border-slate-700 bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-start gap-6 pt-6 sm:pt-10">
        {/* Status Chip / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-xs font-mono text-indigo-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ORBITAL STAGE // ACTIVE SYSTEMS RESEARCH &amp; ARCHITECTURE</span>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Cultivating systems, low-level runtimes, and ideas in deep space.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300/90 font-normal leading-relaxed">
            Welcome to the digital garden of <span className="text-white font-medium">{personalInfo.name}</span>. A curated space for kernel-free telemetry, distributed infrastructure, living research seedlings, and high-craft interfaces.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25 px-6 flex items-center gap-2 cursor-pointer font-medium"
            )}
          >
            <span>Explore Systems &rarr;</span>
          </Link>

          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-slate-700/70 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 px-6 backdrop-blur-md flex items-center gap-2 cursor-pointer"
            )}
          >
            <span>Garden Notes &rarr;</span>
          </Link>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white px-5 backdrop-blur-md flex items-center cursor-pointer"
            )}
          >
            <span>Operator Dossier</span>
          </Link>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-6 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">RVCE Engineering</span>
            <span className="text-2xl font-bold text-slate-100">9.69 <span className="text-xs text-slate-500 font-mono">CGPA</span></span>
          </div>
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">IIT Madras Data</span>
            <span className="text-2xl font-bold text-indigo-400">9.15 <span className="text-xs text-slate-500 font-mono">GPA</span></span>
          </div>
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">GitHub Repos</span>
            <span className="text-2xl font-bold text-cyan-400">50+ <span className="text-xs text-slate-500 font-mono">Public</span></span>
          </div>
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Internships</span>
            <span className="text-2xl font-bold text-violet-400">3 <span className="text-xs text-slate-500 font-mono">Completed</span></span>
          </div>
        </div>
      </section>

      {/* Featured Systems Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Highlighted Systems</h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center text-xs font-mono text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <span>View all {projectList.length} systems &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              className="flex flex-col justify-between rounded-2xl border-slate-800/80 bg-slate-950/75 p-6 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400/90 leading-tight">
                      {project.tagline}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono border-slate-800 bg-slate-900 px-2 py-0.5 text-slate-400 shrink-0"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-slate-300/85 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-500">
                  {project.category}
                </span>

                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      [Source Code]
                    </a>
                  )}
                  <Link
                    href={`/projects`}
                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Garden Entries / Recent Notes */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Living Garden Logbook</h2>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>All garden notes &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredNotes.map((note) => (
            <Link key={note.slug} href={`/blogs/${note.slug}`} className="group block">
              <Card className="flex flex-col justify-between h-full rounded-2xl border-slate-800/80 bg-slate-950/75 p-5 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
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
                    <span className="text-slate-500 font-mono text-[11px]">{note.date}</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {note.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-900 text-xs font-mono text-slate-500">
                  <span>{note.category}</span>
                  <span className="text-slate-400 group-hover:text-indigo-300">
                    Read &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience Timeline Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Experience &amp; Industry Impact</h2>
          </div>
          <Link
            href="/about"
            className="group flex items-center text-xs font-mono text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <span>Full dossier &rarr;</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {experienceList.map((exp, idx) => (
            <Card key={idx} className="p-6 rounded-2xl border-slate-800/80 bg-slate-950/70 backdrop-blur-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                  <span className="text-xs font-mono text-slate-500">/ {exp.type}</span>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-medium">{exp.role}</span>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {exp.bullets[0]}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.techStack.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-xs font-mono text-slate-400 border border-slate-800 bg-slate-900/60 rounded-full px-3 py-1 self-start">
                {exp.timeline}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Dispatch & Telemetry Contact Section */}
      <section className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/50 to-slate-950/90 p-8 sm:p-10 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Direct Transmission Channel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            Initiate Contact with the Station
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Interested in collaborating on low-level systems, distributed infrastructure, or full-stack architectures? Reach out directly via email or professional networks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-mono bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
          >
            <span>Send Email ({personalInfo.email})</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2.5 rounded-full text-xs font-mono bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
          >
            <span>GitHub Profile</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2.5 rounded-full text-xs font-mono bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
          >
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
}
