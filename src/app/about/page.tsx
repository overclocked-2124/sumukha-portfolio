import type { Metadata } from "next";
import { ResumeModal } from "@/components/resume-modal";
import {
  personalInfo,
  educationList,
  experienceList,
  skillsData,
  leadershipRoles,
  personalHardwareSpecs,
} from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: "Experience & Profile — Sumukha Upadhyaya",
  description:
    "Software engineering internships at Auxia and FindInbox, concurrent B.E. at RVCE (9.69 CGPA) and BS at IIT Madras (9.15 GPA), technical stack, and leadership.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 py-4">
      {/* Page Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#D5D1C5] pb-8 items-end">
        <div className="md:col-span-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] text-balance">
            {personalInfo.name}
          </h1>
          <p className="text-xs font-mono text-[#52514C] mt-1">
            {personalInfo.title}, {personalInfo.location}
          </p>
        </div>
        <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-[#52514C] leading-relaxed">
            RVCE ISE (9.69 CGPA) and IIT Madras Data Science (9.15 GPA).
          </p>
          <div className="shrink-0">
            <ResumeModal />
          </div>
        </div>
      </div>

      {/* Overview & Contact Specification */}
      <section className="te-surface p-6 sm:p-8 flex flex-col gap-6">
        <div className="space-y-4 text-sm sm:text-base text-[#141517] leading-relaxed max-w-[68ch] text-pretty">
          {personalInfo.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-5 border-t border-[#D5D1C5] flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#52514C]">
          <div>
            <span className="text-[#141517] font-semibold">Email:</span>{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-[#B43900] underline underline-offset-4"
            >
              {personalInfo.email}
            </a>
          </div>
          <div>
            <span className="text-[#141517] font-semibold">Phone:</span>{" "}
            {personalInfo.phone}
          </div>
          <div>
            <span className="text-[#141517] font-semibold">GitHub:</span>{" "}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#B43900] underline underline-offset-4"
            >
              github.com/{personalInfo.githubHandle}
            </a>
          </div>
          <div>
            <span className="text-[#141517] font-semibold">LinkedIn:</span>{" "}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#B43900] underline underline-offset-4"
            >
              /in/sumukhaupadhyaya
            </a>
          </div>
          <div>
            <span className="text-[#141517] font-semibold">LeetCode:</span>{" "}
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#B43900] underline underline-offset-4"
            >
              {personalInfo.leetcodeSolved}
            </a>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-[#D5D1C5] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#141517]">
            Work Experience
          </h2>
          <p className="text-sm text-[#52514C] mt-1">
            Software engineering internships across Auxia and FindInbox.
          </p>
        </div>

        <div className="te-surface divide-y divide-[#D5D1C5]">
          {experienceList.map((exp, idx) => (
            <article
              key={`${exp.company}-${idx}`}
              className="p-6 sm:p-8 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#141517]">
                    {exp.company}
                  </h3>
                  <span className="text-xs font-mono text-[#B43900] font-semibold">
                    {exp.role}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#52514C]">
                  {exp.timeline}
                </span>
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm text-[#141517] leading-relaxed max-w-[68ch]">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[#B43900] select-none shrink-0"
                    >
                      –
                    </span>
                    <span className="min-w-0">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.techStack.map((tech) => (
                  <span key={tech} translate="no" className="te-kbd">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-[#D5D1C5] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#141517]">
            Education
          </h2>
          <p className="text-sm text-[#52514C] mt-1">
            Concurrent undergraduate degrees at RVCE Bengaluru and IIT Madras.
          </p>
        </div>

        <div className="te-surface divide-y divide-[#D5D1C5]">
          {educationList.map((edu) => (
            <div
              key={edu.institution}
              className="p-6 sm:p-8 flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#141517]">
                    {edu.institution}
                  </h3>
                  <span className="text-xs font-mono text-[#52514C]">
                    {edu.degree}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs shrink-0">
                  <span className="text-[#B43900] font-bold">{edu.grade}</span>
                  <span className="text-[#52514C]">{edu.timeline}</span>
                </div>
              </div>

              <p className="text-sm text-[#141517] leading-relaxed max-w-[68ch] text-pretty">
                {edu.details}
              </p>

              <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs sm:text-sm text-[#52514C]">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 min-w-0">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[#B43900] select-none shrink-0"
                    >
                      –
                    </span>
                    <span className="min-w-0">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Stack */}
      <section id="stack" className="flex flex-col gap-6 scroll-mt-24">
        <div className="border-b border-[#D5D1C5] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#141517]">
            Technical Stack
          </h2>
          <p className="text-sm text-[#52514C] mt-1">
            Core languages, systems protocols, databases, and verification tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="te-surface p-6 flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#141517]">
              Languages &amp; Runtimes
            </h3>
            <dl className="divide-y divide-[#E4E1D8] text-xs sm:text-sm">
              {skillsData.languages.map((l) => (
                <div
                  key={l.name}
                  className="py-2.5 flex items-baseline justify-between gap-3"
                >
                  <dt className="font-semibold text-[#141517]">{l.name}</dt>
                  <dd className="font-mono text-xs text-[#52514C] text-right">
                    {l.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="te-surface p-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-base font-bold text-[#141517]">
                Systems, Protocols &amp; Security
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...skillsData.systemsAndProtocols,
                  ...skillsData.securityAndTools,
                ].map((item) => (
                  <span key={item} translate="no" className="te-kbd">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-[#E4E1D8]">
              <h3 className="text-base font-bold text-[#141517]">
                Databases, Cloud &amp; Web
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...skillsData.databases,
                  ...skillsData.cloudAndInfra,
                  ...skillsData.frameworksAndLibs.slice(0, 6),
                ].map((item) => (
                  <span key={item} translate="no" className="te-kbd">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Personal */}
      <section id="field-spec" className="flex flex-col gap-6 scroll-mt-24">
        <div className="border-b border-[#D5D1C5] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#141517]">
            Leadership &amp; Personal
          </h2>
          <p className="text-sm text-[#52514C] mt-1">
            Campus technical leadership, Shotokan Karate, and hardware roots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 te-surface divide-y divide-[#D5D1C5]">
            {leadershipRoles.map((role) => (
              <div key={role.title} className="p-5 sm:p-6 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-[#141517]">
                    {role.title}
                  </h3>
                  <span className="text-xs font-mono text-[#B43900] font-semibold shrink-0">
                    {role.roleType}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#52514C]">
                  {role.organization}
                </span>
                <p className="text-xs sm:text-sm text-[#141517] leading-relaxed mt-1">
                  {role.description}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 te-surface divide-y divide-[#D5D1C5]">
            {personalHardwareSpecs.map((spec) => (
              <div key={spec.label} className="p-5 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2 text-xs font-mono">
                  <span className="text-[#52514C]">{spec.label}</span>
                  <span className="text-[#141517] font-semibold text-right">
                    {spec.value}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#52514C] leading-relaxed">
                  {spec.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
