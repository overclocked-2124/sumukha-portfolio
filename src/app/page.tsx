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
        return "border-[#85D49B]/40 bg-[#D2E7D6] text-[#0F381E]";
      case "Budding":
        return "border-[#FFB77D]/40 bg-[#FFDCC1] text-[#2E1500]";
      case "Evergreen":
        return "border-[#C7BFFF]/40 bg-[#E3DFFF] text-[#140E62]";
      default:
        return "border-[#C8C5D0] bg-[#EEEBF2] text-[#1D1B20]";
    }
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-start gap-6 pt-6 sm:pt-10">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C7BFFF]/40 bg-[#E3DFFF] text-xs font-mono text-[#140E62]">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <span>STUDENT &amp; SOFTWARE ENGINEER • BANGALORE, INDIA</span>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1D1B20] leading-tight font-sans">
            Hi, I&apos;m {personalInfo.name}.
          </h1>
          <p className="text-lg sm:text-xl text-[#49454F] font-normal leading-relaxed">
            Undergraduate in Information Science at <span className="font-semibold text-[#1D1B20]">RVCE</span> (9.69 CGPA) and pursuing a BS in Data Science at <span className="font-semibold text-[#1D1B20]">IIT Madras</span> (9.15 GPA). I engineer systems runtimes, distributed backends, and accessible user interfaces.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-[#5954A8] text-white hover:bg-[#4B4699] transition-all shadow-xs px-6 flex items-center gap-2 cursor-pointer font-medium"
            )}
          >
            <span>Explore Projects &rarr;</span>
          </Link>

          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-[#C7BFFF]/50 bg-[#E3DFFF] text-[#140E62] hover:bg-[#D5CEFF] px-6 flex items-center gap-2 cursor-pointer font-medium"
            )}
          >
            <span>Read Notes &rarr;</span>
          </Link>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-[#C8C5D0]/60 bg-white text-[#1D1B20] hover:bg-[#F4F2F8] px-5 flex items-center cursor-pointer font-medium"
            )}
          >
            <span>About Me</span>
          </Link>
        </div>

        {/* Telemetry Stats Strip in M3 Surface Containers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-6 pt-8 border-t border-[#C8C5D0]/30">
          <div className="flex flex-col gap-1 p-4 rounded-3xl bg-[#F4F2F8] border border-[#C8C5D0]/20">
            <span className="text-[11px] font-mono text-[#635F6A] uppercase tracking-wider">RVCE Engineering</span>
            <span className="text-2xl font-bold text-[#1D1B20]">9.69 <span className="text-xs text-[#635F6A] font-mono font-normal">CGPA</span></span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-3xl bg-[#F4F2F8] border border-[#C8C5D0]/20">
            <span className="text-[11px] font-mono text-[#635F6A] uppercase tracking-wider">IIT Madras Data Sci</span>
            <span className="text-2xl font-bold text-[#5954A8]">9.15 <span className="text-xs text-[#635F6A] font-mono font-normal">GPA</span></span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-3xl bg-[#F4F2F8] border border-[#C8C5D0]/20">
            <span className="text-[11px] font-mono text-[#635F6A] uppercase tracking-wider">GitHub Repos</span>
            <span className="text-2xl font-bold text-[#1D1B20]">50+ <span className="text-xs text-[#635F6A] font-mono font-normal">Public</span></span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-3xl bg-[#F4F2F8] border border-[#C8C5D0]/20">
            <span className="text-[11px] font-mono text-[#635F6A] uppercase tracking-wider">Internships</span>
            <span className="text-2xl font-bold text-[#7A5368]">3 <span className="text-xs text-[#635F6A] font-mono font-normal">Completed</span></span>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center text-xs font-mono text-[#5954A8] hover:underline"
          >
            <span>View all {projectList.length} projects &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              className="flex flex-col justify-between rounded-3xl border-[#C8C5D0]/30 bg-white p-6 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-[#1D1B20] group-hover:text-[#5954A8] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-[#5954A8] leading-tight">
                      {project.tagline}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono border-[#C8C5D0]/40 bg-[#F4F2F8] px-2.5 py-0.5 text-[#49454F] shrink-0"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-[#49454F] leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-[#49454F] bg-[#F4F2F8] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#C8C5D0]/20">
                <span className="text-xs font-mono text-[#635F6A]">
                  {project.category}
                </span>

                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#49454F] hover:text-[#5954A8] transition-colors"
                    >
                      [Source Code]
                    </a>
                  )}
                  <Link
                    href={`/projects`}
                    className="text-xs font-mono text-[#5954A8] hover:underline"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Engineering Notes / Digital Garden Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A5368]" />
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Engineering Notes</h2>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center text-xs font-mono text-[#5954A8] hover:underline"
          >
            <span>All notes &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredNotes.map((note) => (
            <Link key={note.slug} href={`/blogs/${note.slug}`} className="group block h-full">
              <Card className="flex flex-col justify-between h-full rounded-3xl border-[#C8C5D0]/30 bg-white p-6 hover:shadow-md transition-all duration-200">
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

                  <h3 className="text-base font-bold text-[#1D1B20] group-hover:text-[#5954A8] transition-colors leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-[#49454F] leading-relaxed">
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

      {/* Experience Timeline Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Work Experience</h2>
          </div>
          <Link
            href="/about"
            className="group flex items-center text-xs font-mono text-[#5954A8] hover:underline"
          >
            <span>Full background &rarr;</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {experienceList.map((exp, idx) => (
            <Card key={idx} className="p-6 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold text-[#1D1B20]">{exp.company}</h3>
                  <span className="text-xs font-mono text-[#635F6A]">/ {exp.type}</span>
                </div>
                <span className="text-xs font-mono text-[#5954A8] font-semibold">{exp.role}</span>
                <p className="text-xs text-[#49454F] leading-relaxed mt-1">
                  {exp.bullets[0]}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.techStack.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/30 text-[#49454F]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-xs font-mono text-[#49454F] border border-[#C8C5D0]/40 bg-[#F4F2F8] rounded-full px-3 py-1 self-start">
                {exp.timeline}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="rounded-3xl border border-[#C7BFFF]/40 bg-[#E3DFFF]/40 p-8 sm:p-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#5954A8] text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
            <span>Connect &amp; Collaborate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1B20] tracking-tight font-sans">
            Get in touch with Sumukha
          </h2>
          <p className="text-sm text-[#49454F] leading-relaxed">
            I am always interested in discussing systems programming, distributed infrastructure, open-source projects, and new opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-mono bg-[#5954A8] text-white hover:bg-[#4B4699] transition-colors shadow-xs"
          >
            <span>Email me ({personalInfo.email})</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2.5 rounded-full text-xs font-mono bg-white border border-[#C8C5D0]/60 text-[#1D1B20] hover:bg-[#F4F2F8] transition-colors"
          >
            <span>GitHub</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2.5 rounded-full text-xs font-mono bg-white border border-[#C8C5D0]/60 text-[#1D1B20] hover:bg-[#F4F2F8] transition-colors"
          >
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
}
