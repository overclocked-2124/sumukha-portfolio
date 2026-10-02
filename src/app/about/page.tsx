import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeModal } from "@/components/resume-modal";
import { 
  personalInfo, 
  educationList, 
  experienceList, 
  skillsData, 
  leadershipRoles 
} from "@/data/portfolio-data";

export default function AboutPage() {
  const tenets = [
    {
      title: "First-Principles Rigor",
      description: "Deconstructing problems to memory models, CPU cycle timings, protocol invariants, and mathematical fundamentals before writing code.",
    },
    {
      title: "Zero-Allocation Discipline",
      description: "In performance-critical pathways, minimizing or eliminating heap allocations and GC pause jitter through buffer pooling and memory-mapped structures.",
    },
    {
      title: "Tactile Ergonomics",
      description: "Crafting interfaces that feel fast, predictable, and responsive. Spatial cadence and deliberate design tokens elevate utilities into natural extensions of human thought.",
    },
  ];

  return (
    <div className="flex flex-col gap-14 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Operator Dossier // Bio &amp; Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Sumukha Upadhyaya
          </h1>
          <p className="text-base text-slate-400 leading-relaxed font-normal">
            Systems Engineer &amp; Full-Stack Architect • Bangalore, India
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <ResumeModal />
        </div>
      </div>

      {/* Operator Narrative Card */}
      <Card className="rounded-2xl border-slate-800/80 bg-slate-950/75 p-6 sm:p-8 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-indigo-500/30 bg-indigo-950/60 flex items-center justify-center text-xs font-mono text-indigo-300 font-bold">
            SU
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-sans">{personalInfo.name}</h2>
            <span className="text-xs font-mono text-cyan-400">@{personalInfo.githubHandle} • Systems &amp; Low-Level Runtimes</span>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          {personalInfo.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-6 text-xs font-mono text-slate-400">
          <div><span className="text-slate-500">Location:</span> {personalInfo.location}</div>
          <div><span className="text-slate-500">Email:</span> <a href={`mailto:${personalInfo.email}`} className="text-indigo-400 hover:underline">{personalInfo.email}</a></div>
          <div><span className="text-slate-500">Phone:</span> {personalInfo.phone}</div>
          <div><span className="text-slate-500">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">github.com/{personalInfo.githubHandle}</a></div>
        </div>
      </Card>

      {/* Education Section */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Academic Foundation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {educationList.map((edu) => (
            <Card
              key={edu.institution}
              className="flex flex-col justify-between p-6 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{edu.timeline}</span>
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 text-[10px]">
                    {edu.grade}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{edu.institution}</h3>
                <span className="text-xs font-mono text-cyan-400">{edu.degree}</span>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{edu.details}</p>
              </div>

              <ul className="mt-4 pt-4 border-t border-slate-900 list-none p-0 flex flex-col gap-1.5 text-xs text-slate-400">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience History */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Industry Experience</h2>
        </div>

        <div className="flex flex-col gap-5">
          {experienceList.map((exp, idx) => (
            <Card
              key={idx}
              className="p-6 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                  <span className="text-xs font-mono text-indigo-400 font-medium">{exp.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800">{exp.timeline}</span>
                  <span className="text-slate-600">/</span>
                  <span>{exp.type}</span>
                </div>
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Leadership & Organization Roles */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Leadership &amp; Community Roles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leadershipRoles.map((role) => (
            <Card
              key={role.title}
              className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col justify-between gap-3"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{role.title}</h3>
                  <Badge variant="outline" className="text-[10px] font-mono border-indigo-500/30 text-indigo-300">
                    {role.roleType}
                  </Badge>
                </div>
                <span className="text-xs font-mono text-slate-400">{role.organization}</span>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{role.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Engineering Tenets */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Engineering Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tenets.map((t) => (
            <Card key={t.title} className="p-6 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-2.5">
              <h3 className="text-sm font-bold text-white">{t.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Competencies Matrix */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Technical Domain Matrix</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Languages */}
          <Card className="p-6 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-3">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
              Languages &amp; Runtimes
            </span>
            <div className="flex flex-col gap-2">
              {skillsData.languages.map((l) => (
                <div key={l.name} className="flex items-center justify-between text-xs py-1 border-b border-slate-900 last:border-none">
                  <span className="font-semibold text-slate-200">{l.name}</span>
                  <span className="font-mono text-slate-400">{l.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Frameworks & Databases */}
          <div className="flex flex-col gap-5">
            <Card className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-2.5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                Frameworks &amp; Web Architectures
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.frameworksAndLibs.map((f) => (
                  <span key={f} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-2.5">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                Databases &amp; Cloud Infrastructure
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...skillsData.databases, ...skillsData.cloudAndInfra].map((item) => (
                  <span key={item} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-2xl border-slate-800/80 bg-slate-950/75 backdrop-blur-sm flex flex-col gap-2.5">
              <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold">
                Systems, Security &amp; Protocols
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...skillsData.systemsAndProtocols, ...skillsData.securityAndTools].map((item) => (
                  <span key={item} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
