"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ExternalLink, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award,
  Terminal
} from "lucide-react";
import { personalInfo, educationList, experienceList, projectList, leadershipRoles } from "@/data/portfolio-data";

export function ResumeModal() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900/90 border border-slate-700/60 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </button>
        }
      />
      <DialogContent className="sm:max-w-3xl max-h-[88vh] overflow-y-auto bg-slate-950 border-slate-800 text-slate-100 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-col gap-2 border-b border-slate-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                {personalInfo.name}
              </DialogTitle>
              <p className="text-xs font-mono text-indigo-400 mt-1">
                {personalInfo.title} • {personalInfo.location}
              </p>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="h-8 rounded-full border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Email"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="h-8 rounded-full border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                Print / Save
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-indigo-400">
              <Mail className="w-3.5 h-3.5" />
              <span>{personalInfo.email}</span>
            </a>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{personalInfo.phone}</span>
            </span>
            <span className="text-slate-700">•</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              GitHub
            </a>
            <span className="text-slate-700">•</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              LinkedIn
            </a>
            <span className="text-slate-700">•</span>
            <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              LeetCode
            </a>
          </div>
        </DialogHeader>

        {/* Resume Body */}
        <div className="flex flex-col gap-8 py-4 text-xs sm:text-sm">
          {/* Education */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h3>

            <div className="flex flex-col gap-4">
              {educationList.map((edu) => (
                <div key={edu.institution} className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-white">{edu.institution}</span>
                    <span className="text-xs font-mono text-slate-400">{edu.timeline}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-300">
                    <span>{edu.degree}</span>
                    <span className="font-mono text-cyan-400 font-medium">{edu.grade}</span>
                  </div>
                  <ul className="mt-2 list-none p-0 flex flex-col gap-1 text-xs text-slate-400">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </h3>

            <div className="flex flex-col gap-4">
              {experienceList.map((exp, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-white">{exp.company}</span>
                    <span className="text-xs font-mono text-slate-400">{exp.timeline}</span>
                  </div>
                  <span className="text-xs text-indigo-300 font-medium">{exp.role}</span>
                  <ul className="mt-1 list-none p-0 flex flex-col gap-1.5 text-xs text-slate-300 leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>Featured Technical Projects</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectList.slice(0, 4).map((proj) => (
                <div key={proj.slug} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{proj.title}</span>
                      {proj.repoUrl && (
                        <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              <span>Skills Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-medium text-slate-300">Languages &amp; Core</span>
                <p className="text-xs text-slate-400">Java, Kotlin, Python, C/C++, JavaScript, TypeScript, Go, Rust, Bash, SQL, HTML/CSS</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-medium text-slate-300">Frameworks &amp; Runtimes</span>
                <p className="text-xs text-slate-400">React.js, Next.js (App Router), Node.js, Express, Flask, Spring Boot, Supabase, Tailwind CSS v4, Google Material 3</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-medium text-slate-300">Databases &amp; Cloud</span>
                <p className="text-xs text-slate-400">PostgreSQL, Google BigQuery, Firebase Firestore, MongoDB, MySQL, Redis, GCP, Kubernetes, Docker, Terraform</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-medium text-slate-300">Systems, Protocols &amp; Security</span>
                <p className="text-xs text-slate-400">Linux ptrace, System V ABI, gRPC, Protobuf, Wireshark, Burp Suite, Metasploit, Postman, WebXR, WebSockets</p>
              </div>
            </div>
          </section>

          {/* Organizational Leadership */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Leadership &amp; Community Roles</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {leadershipRoles.map((role) => (
                <div key={role.title} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{role.title}</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-slate-800 text-indigo-300">
                      {role.roleType}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{role.organization}</span>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{role.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
