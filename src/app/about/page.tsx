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
      description: "Deconstructing systems to CPU instruction behavior, memory models, protocol invariants, and mathematical fundamentals before layering abstractions.",
    },
    {
      title: "Zero-Allocation Discipline",
      description: "In critical execution paths, eliminating heap allocations and garbage collection jitter through buffer reuse and memory-mapped state caches.",
    },
    {
      title: "Tactile Ergonomics",
      description: "Creating software interfaces that feel predictable, readable, and responsive. Thoughtful spatial cadence and calibrated design tokens turn tools into seamless workflows.",
    },
  ];

  return (
    <div className="flex flex-col gap-14 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5954A8] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
            <span>Profile &amp; Engineering Focus</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1B20] font-sans">
            Sumukha Upadhyaya
          </h1>
          <p className="text-base text-[#49454F] leading-relaxed font-normal">
            Software Engineer • Information Science at RVCE &amp; Data Science at IIT Madras
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <ResumeModal />
        </div>
      </div>

      {/* Operator Narrative Card in M3 Surface Container */}
      <Card className="rounded-3xl border-[#C8C5D0]/30 bg-white p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E3DFFF] flex items-center justify-center text-sm font-mono text-[#140E62] font-bold">
            SU
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1D1B20] font-sans">{personalInfo.name}</h2>
            <span className="text-xs font-mono text-[#5954A8]">@{personalInfo.githubHandle} • Systems &amp; Web Architectures</span>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-[#49454F] leading-relaxed">
          {personalInfo.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-4 border-t border-[#C8C5D0]/20 flex flex-wrap gap-6 text-xs font-mono text-[#635F6A]">
          <div><span className="text-[#1D1B20] font-semibold">Location:</span> {personalInfo.location}</div>
          <div><span className="text-[#1D1B20] font-semibold">Email:</span> <a href={`mailto:${personalInfo.email}`} className="text-[#5954A8] hover:underline">{personalInfo.email}</a></div>
          <div><span className="text-[#1D1B20] font-semibold">Phone:</span> {personalInfo.phone}</div>
          <div><span className="text-[#1D1B20] font-semibold">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-[#5954A8] hover:underline">github.com/{personalInfo.githubHandle}</a></div>
        </div>
      </Card>

      {/* Education Section */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Academic Foundation</h2>
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
                <h3 className="text-base font-bold text-[#1D1B20] leading-snug">{edu.institution}</h3>
                <span className="text-xs font-mono text-[#5954A8] font-medium">{edu.degree}</span>
                <p className="text-xs text-[#49454F] leading-relaxed mt-1">{edu.details}</p>
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

      {/* Experience History */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Industry Experience</h2>
        </div>

        <div className="flex flex-col gap-5">
          {experienceList.map((exp, idx) => (
            <Card
              key={idx}
              className="p-6 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C8C5D0]/20 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#1D1B20]">{exp.company}</h3>
                  <span className="text-xs font-mono text-[#5954A8] font-semibold">{exp.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#635F6A]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/40">{exp.timeline}</span>
                  <span className="text-[#C8C5D0]">/</span>
                  <span>{exp.type}</span>
                </div>
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm text-[#49454F] leading-relaxed">
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
                    className="text-[11px] font-mono text-[#49454F] bg-[#F4F2F8] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
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
          <span className="w-2 h-2 rounded-full bg-[#7A5368]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Leadership &amp; Community Roles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leadershipRoles.map((role) => (
            <Card
              key={role.title}
              className="p-5 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1D1B20]">{role.title}</h3>
                  <Badge variant="outline" className="text-[10px] font-mono border-[#C8C5D0]/40 bg-[#F4F2F8] text-[#5954A8]">
                    {role.roleType}
                  </Badge>
                </div>
                <span className="text-xs font-mono text-[#635F6A]">{role.organization}</span>
                <p className="text-xs text-[#49454F] leading-relaxed mt-1">{role.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Engineering Tenets */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Engineering Tenets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tenets.map((t) => (
            <Card key={t.title} className="p-6 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-2.5">
              <h3 className="text-sm font-bold text-[#1D1B20]">{t.title}</h3>
              <p className="text-xs text-[#49454F] leading-relaxed">{t.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Competencies Matrix */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1B20] font-sans">Technical Domain Matrix</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Languages */}
          <Card className="p-6 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-3">
            <span className="text-xs font-mono text-[#5954A8] uppercase tracking-widest font-bold">
              Languages &amp; Runtimes
            </span>
            <div className="flex flex-col gap-2">
              {skillsData.languages.map((l) => (
                <div key={l.name} className="flex items-center justify-between text-xs py-1.5 border-b border-[#C8C5D0]/15 last:border-none">
                  <span className="font-semibold text-[#1D1B20]">{l.name}</span>
                  <span className="font-mono text-[#635F6A]">{l.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Frameworks & Databases */}
          <div className="flex flex-col gap-5">
            <Card className="p-5 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-2.5">
              <span className="text-xs font-mono text-[#5954A8] uppercase tracking-widest font-bold">
                Frameworks &amp; Web Architectures
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.frameworksAndLibs.map((f) => (
                  <span key={f} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/30 text-[#49454F]">
                    {f}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-2.5">
              <span className="text-xs font-mono text-[#7A5368] uppercase tracking-widest font-bold">
                Databases &amp; Cloud Infrastructure
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...skillsData.databases, ...skillsData.cloudAndInfra].map((item) => (
                  <span key={item} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/30 text-[#49454F]">
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-3xl border-[#C8C5D0]/30 bg-white shadow-xs flex flex-col gap-2.5">
              <span className="text-xs font-mono text-[#5954A8] uppercase tracking-widest font-bold">
                Systems, Security &amp; Protocols
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...skillsData.systemsAndProtocols, ...skillsData.securityAndTools].map((item) => (
                  <span key={item} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/30 text-[#49454F]">
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
