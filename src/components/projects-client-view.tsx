"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectList } from "@/data/portfolio-data";
import { 
  GitBranch, 
  ArrowUpRight, 
  Search 
} from "lucide-react";

export function ProjectsClientView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Low-Level & Security", "Distributed Systems", "AI & Interfaces", "Web & Frontend"];

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Category Control Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-sm">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search systems & stack..."
            className="pl-9 h-8 text-xs font-mono bg-slate-900/80 border-slate-800 text-slate-200 rounded-full focus-visible:ring-indigo-500/30"
          />
        </div>
      </div>

      {/* Results Telemetry */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <span>SHOWING {filteredProjects.length} OF {projectList.length} ARTIFACTS</span>
        <span>STATUS: PRODUCTION &amp; RESEARCH</span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.slug}
            className="flex flex-col justify-between rounded-2xl border-slate-800/80 bg-slate-950/75 p-6 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm group"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400/90 leading-tight">
                    {project.tagline}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge
                    variant="outline"
                    className="rounded-full text-[10px] font-mono border-slate-800 bg-slate-900/90 text-slate-400 px-2.5 py-0.5"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300/85 leading-relaxed">
                {project.description}
              </p>

              {/* Architectural Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 mt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Architectural Invariants
                  </span>
                  <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs text-slate-400">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Links */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-500">
                {project.category}
              </span>

              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 hover:text-white transition-colors px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-500/60"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Preview</span>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
