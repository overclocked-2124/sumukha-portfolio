"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  personalInfo,
  experienceList,
  educationList,
  projectList,
  gardenNotes,
  skillsData,
  leadershipRoles,
  personalHardwareSpecs,
  type HardwareModuleSpec,
} from "@/data/portfolio-data";
import { NoteContentRenderer } from "@/components/note-content-renderer";

interface ModuleInspectorProps {
  activeSpec: HardwareModuleSpec;
  selectedNoteSlug: string | null;
  onSelectNote: (slug: string | null) => void;
  onClose: () => void;
}

export function ModuleInspector({
  activeSpec,
  selectedNoteSlug,
  onSelectNote,
  onClose,
}: ModuleInspectorProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const selectedNote =
    gardenNotes.find((n) => n.slug === selectedNoteSlug) ?? null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <aside
      key={activeSpec.id}
      role="region"
      aria-label={`${activeSpec.subsystemLabel} specification sheet`}
      className="pointer-events-auto fixed top-20 bottom-20 right-4 sm:right-6 z-30 w-[calc(100vw-2rem)] sm:w-[440px] max-w-full te-surface te-sheet-enter bg-[#FAF9F5]/98 backdrop-blur-md flex flex-col justify-between overflow-hidden"
    >
      {/* Sheet Header */}
      <div className="px-5 py-4 bg-[#E4E1D8] border-b border-[#D5D1C5] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-[#141517] text-balance">
            {activeSpec.subsystemLabel}
          </h2>
          <p className="text-xs font-mono text-[#52514C] mt-0.5">
            {activeSpec.partName} ({activeSpec.socketSpec})
          </p>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${activeSpec.subsystemLabel} panel`}
          className="te-btn min-h-9 px-3 py-1.5 rounded-[5px] bg-[#FAF9F5] border border-[#D5D1C5] text-xs font-mono text-[#141517] hover:border-[#141517] cursor-pointer shrink-0"
        >
          Close
        </button>
      </div>

      {/* Scrollable Specification Ledger */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 divide-y divide-[#D5D1C5]">
        <p className="text-sm text-[#141517] leading-relaxed pb-4 text-pretty">
          {activeSpec.summary}
        </p>

        {activeSpec.id === "cpu" && (
          <>
            {experienceList.map((exp, idx) => (
              <div
                key={`${exp.company}-${idx}`}
                className="py-4 flex flex-col gap-2"
              >
                <div className="flex items-baseline justify-between gap-2 min-w-0">
                  <h3 className="text-base font-bold text-[#141517]">
                    {exp.company}
                  </h3>
                  <span className="text-xs font-mono text-[#52514C] shrink-0">
                    {exp.timeline}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#B43900] font-semibold">
                  {exp.role}
                </div>
                <ul className="list-none p-0 m-0 flex flex-col gap-1.5 text-xs sm:text-sm text-[#141517] mt-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 min-w-0">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[#B43900] select-none shrink-0"
                      >
                        –
                      </span>
                      <span className="leading-relaxed min-w-0">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.techStack.map((t) => (
                    <span key={t} translate="no" className="te-kbd">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="py-4 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#141517]">
                Concurrent Education
              </h3>
              {educationList.map((edu) => (
                <div
                  key={edu.institution}
                  className="flex flex-col gap-1 text-xs sm:text-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-semibold text-[#141517]">
                      {edu.institution}
                    </div>
                    <span className="font-mono font-bold text-[#B43900] shrink-0">
                      {edu.grade}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 text-xs text-[#52514C]">
                    <span>{edu.degree}</span>
                    <span className="font-mono shrink-0">{edu.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSpec.id === "pcie" &&
          projectList.map((proj) => (
            <div key={proj.slug} className="py-4 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2 min-w-0">
                <h3 className="text-base font-bold text-[#141517] min-w-0">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
                    >
                      GitHub
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#B43900] font-semibold hover:underline underline-offset-4"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs font-mono text-[#52514C]">{proj.tagline}</p>
              <p className="text-xs sm:text-sm text-[#141517] leading-relaxed text-pretty">
                {proj.description}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs text-[#52514C] mt-0.5">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 min-w-0">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[#B43900] select-none shrink-0"
                    >
                      –
                    </span>
                    <span className="leading-relaxed min-w-0">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.techStack.map((t) => (
                  <span key={t} translate="no" className="te-kbd">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {activeSpec.id === "mem" &&
          (selectedNote ? (
            <div className="py-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onSelectNote(null)}
                className="te-btn self-start px-2.5 py-1 rounded-[5px] bg-[#EFEDE6] border border-[#D5D1C5] text-xs font-mono text-[#B43900] font-semibold hover:border-[#141517] cursor-pointer"
              >
                Back to all notes
              </button>
              <h3 className="text-base font-bold text-[#141517] leading-snug text-balance">
                {selectedNote.title}
              </h3>
              <div className="text-xs font-mono text-[#52514C]">
                {selectedNote.date} ({selectedNote.readTime})
              </div>
              <NoteContentRenderer content={selectedNote.content} compact />
            </div>
          ) : (
            gardenNotes.map((note) => (
              <button
                key={note.slug}
                type="button"
                onClick={() => onSelectNote(note.slug)}
                className="w-full text-left py-4 px-1 flex flex-col gap-1.5 hover:bg-[#E4E1D8]/50 transition-colors duration-150 ease-out cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#52514C]">
                  <span className="text-[#B43900] font-semibold">
                    {note.category}
                  </span>
                  <span>{note.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#141517] leading-snug text-balance">
                  {note.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52514C] leading-relaxed text-pretty">
                  {note.excerpt}
                </p>
              </button>
            ))
          ))}

        {activeSpec.id === "vrm" && (
          <>
            <div className="py-4 flex flex-col gap-2.5">
              <h3 className="text-sm font-bold text-[#141517]">
                Core Languages
              </h3>
              <dl className="divide-y divide-[#E4E1D8] text-xs sm:text-sm">
                {skillsData.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="py-2 flex items-baseline justify-between gap-3"
                  >
                    <dt className="font-semibold text-[#141517]">
                      {lang.name}
                    </dt>
                    <dd className="font-mono text-xs text-[#52514C] text-right">
                      {lang.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="py-4 flex flex-col gap-2">
              <h3 className="text-sm font-bold text-[#141517]">
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

            <div className="py-4 flex flex-col gap-2">
              <h3 className="text-sm font-bold text-[#141517]">
                Databases, Cloud &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...skillsData.databases,
                  ...skillsData.cloudAndInfra,
                  ...skillsData.frameworksAndLibs,
                ].map((item) => (
                  <span key={item} translate="no" className="te-kbd">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeSpec.id === "io" && (
          <>
            <div className="py-4 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#141517]">
                Hardware Roots &amp; Off-Clock
              </h3>
              {personalHardwareSpecs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-2 text-xs font-mono">
                    <span className="text-[#52514C]">{spec.label}</span>
                    <span className="text-[#B43900] font-semibold text-right">
                      {spec.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#141517] leading-relaxed">
                    {spec.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="py-4 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#141517]">
                Campus Leadership
              </h3>
              {leadershipRoles.map((role) => (
                <div key={role.title} className="flex flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-[#141517]">
                      {role.title}
                    </span>
                    <span className="text-xs font-mono text-[#B43900] font-semibold shrink-0">
                      {role.roleType}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#52514C] leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="py-4 flex flex-col gap-2.5">
              <h3 className="text-sm font-bold text-[#141517]">
                Direct Contact &amp; Verification
              </h3>
              <dl className="divide-y divide-[#E4E1D8] text-xs font-mono">
                <div className="py-1.5 flex items-baseline justify-between gap-2">
                  <dt className="text-[#52514C]">Email</dt>
                  <dd className="min-w-0 truncate">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
                    >
                      {personalInfo.email}
                    </a>
                  </dd>
                </div>
                <div className="py-1.5 flex items-baseline justify-between gap-2">
                  <dt className="text-[#52514C]">Phone</dt>
                  <dd className="text-[#141517]">{personalInfo.phone}</dd>
                </div>
                <div className="py-1.5 flex items-baseline justify-between gap-2">
                  <dt className="text-[#52514C]">Location</dt>
                  <dd className="text-[#141517]">{personalInfo.location}</dd>
                </div>
                <div className="py-1.5 flex items-baseline justify-between gap-2">
                  <dt className="text-[#52514C]">RVCE USN</dt>
                  <dd className="text-[#141517]">{personalInfo.usn}</dd>
                </div>
                <div className="py-1.5 flex items-baseline justify-between gap-2">
                  <dt className="text-[#52514C]">LeetCode</dt>
                  <dd className="text-[#B43900] font-semibold">
                    {personalInfo.leetcodeSolved}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </div>

      {/* Sheet Footer */}
      <div className="px-5 py-3 bg-[#E4E1D8] border-t border-[#D5D1C5] flex items-center justify-between text-xs font-mono">
        <span className="text-[#52514C]">{activeSpec.partName}</span>
        <Link
          href={activeSpec.route}
          className="text-[#141517] font-semibold hover:text-[#B43900] underline underline-offset-4"
        >
          {activeSpec.routeLabel}
        </Link>
      </div>
    </aside>
  );
}
