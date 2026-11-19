"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  personalInfo,
  educationList,
  experienceList,
  projectList,
  leadershipRoles,
} from "@/data/portfolio-data";

export function ResumeModal() {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setStatusMessage(`Copied ${personalInfo.email} to clipboard.`);
    } catch {
      setStatusMessage(`Email address: ${personalInfo.email}`);
    }

    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="te-btn inline-flex items-center gap-2 min-h-9 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium text-[#141517] bg-[#FAF9F5] border border-[#D5D1C5] hover:border-[#141517] cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]"
            />
            <span>Resume</span>
          </button>
        }
      />
      <DialogContent className="sm:max-w-3xl max-h-[88dvh] overflow-y-auto overscroll-contain bg-[#FAF9F5] border border-[#D5D1C5] text-[#141517] p-6 sm:p-8 pr-10 sm:pr-12 rounded-[8px] shadow-none">
        <div role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </div>

        <DialogHeader className="flex flex-col gap-3 border-b border-[#D5D1C5] pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-6">
            <div className="min-w-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-[#141517]">
                {personalInfo.name}
              </DialogTitle>
              <p className="text-xs font-mono text-[#52514C] mt-1">
                {personalInfo.title}, {personalInfo.location} (USN:{" "}
                <span translate="no">{personalInfo.usn}</span>)
              </p>
            </div>

            <div
              data-print-hide="true"
              className="flex flex-wrap items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className="te-btn min-h-9 px-3 py-1.5 rounded-[5px] border border-[#D5D1C5] bg-[#EFEDE6] text-xs font-mono text-[#141517] hover:border-[#141517] cursor-pointer"
              >
                {copied ? "Copied" : "Copy Email"}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="te-btn min-h-9 px-3 py-1.5 rounded-[5px] bg-[#141517] text-[#FAF9F5] text-xs font-mono hover:bg-[#2F3437] cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#52514C] pt-1">
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-[#141517] underline underline-offset-4"
            >
              {personalInfo.email}
            </a>
            <span aria-hidden="true">/</span>
            <span>{personalInfo.phone}</span>
            <span aria-hidden="true">/</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#141517] underline underline-offset-4"
            >
              GitHub ({personalInfo.githubHandle})
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#141517] underline underline-offset-4"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#141517] underline underline-offset-4"
            >
              LeetCode ({personalInfo.leetcodeSolved})
            </a>
          </div>
        </DialogHeader>

        {/* Clean Specification Sections */}
        <div className="divide-y divide-[#D5D1C5] text-xs sm:text-sm">
          {/* Education */}
          <section className="py-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#141517]">Education</h3>
            <div className="divide-y divide-[#E4E1D8]">
              {educationList.map((edu) => (
                <div
                  key={edu.institution}
                  className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                >
                  <div className="min-w-0">
                    <span className="font-semibold text-[#141517]">
                      {edu.institution}
                    </span>
                    <span className="text-xs text-[#52514C] sm:ml-2 block sm:inline">
                      {edu.degree}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs shrink-0">
                    <span className="text-[#B43900] font-bold">{edu.grade}</span>
                    <span className="text-[#52514C]">{edu.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="py-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#141517]">
              Work Experience
            </h3>
            <div className="divide-y divide-[#E4E1D8]">
              {experienceList.map((exp, idx) => (
                <div
                  key={`${exp.company}-${idx}`}
                  className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-[#141517]">
                        {exp.company}
                      </span>
                      <span className="text-xs font-mono text-[#B43900] font-semibold sm:ml-2 block sm:inline">
                        {exp.role}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#52514C]">
                      {exp.timeline}
                    </span>
                  </div>

                  <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs text-[#141517]">
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
                </div>
              ))}
            </div>
          </section>

          {/* Selected Systems */}
          <section className="py-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#141517]">
              Selected Engineered Systems
            </h3>
            <div className="divide-y divide-[#E4E1D8]">
              {projectList.slice(0, 4).map((proj) => (
                <div
                  key={proj.slug}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col gap-1"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-[#141517]">
                      {proj.title}
                    </span>
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[#52514C] hover:text-[#141517] underline shrink-0"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#52514C] leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Leadership */}
          <section className="pt-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#141517]">
              Leadership &amp; Campus Roles
            </h3>
            <div className="divide-y divide-[#E4E1D8]">
              {leadershipRoles.map((role) => (
                <div
                  key={role.title}
                  className="py-2.5 first:pt-0 last:pb-0 flex flex-col gap-0.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-[#141517]">
                      {role.title}
                    </span>
                    <span className="text-xs font-mono text-[#B43900] font-semibold shrink-0">
                      {role.roleType}
                    </span>
                  </div>
                  <span className="text-xs text-[#52514C]">
                    {role.description}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
