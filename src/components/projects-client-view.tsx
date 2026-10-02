"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectList } from "@/data/portfolio-data";

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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl border border-[#C8C5D0]/30 bg-white shadow-xs">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E3DFFF] text-[#140E62] border border-[#C7BFFF]/60 font-semibold shadow-xs"
                  : "bg-[#F4F2F8] text-[#49454F] border border-[#C8C5D0]/30 hover:bg-[#EEEBF2] hover:text-[#1D1B20]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-64">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects & stack..."
            className="h-9 text-xs font-mono bg-[#FAF8FD] border-[#C8C5D0]/40 text-[#1D1B20] rounded-full focus-visible:ring-[#5954A8] px-4"
          />
        </div>
      </div>

      {/* Projects Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[#635F6A] px-1">
        <span>SHOWING {filteredProjects.length} OF {projectList.length} PROJECTS</span>
        <span>PRODUCTION CODEBASES &amp; RESEARCH</span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.slug}
            className="flex flex-col justify-between rounded-3xl border-[#C8C5D0]/30 bg-white p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#1D1B20] tracking-tight group-hover:text-[#5954A8] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-[#5954A8] leading-tight">
                    {project.tagline}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="rounded-full text-[10px] font-mono border-[#C8C5D0]/40 bg-[#F4F2F8] text-[#49454F] px-2.5 py-0.5 shrink-0"
                >
                  {project.status}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-[#49454F] leading-relaxed">
                {project.description}
              </p>

              {/* Architectural Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#F4F2F8] border border-[#C8C5D0]/20 mt-1">
                  <span className="text-[10px] font-mono text-[#635F6A] uppercase tracking-widest font-semibold">
                    Key Features &amp; Architecture
                  </span>
                  <ul className="list-none p-0 m-0 flex flex-col gap-1 text-xs text-[#49454F]">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8] mt-1.5 shrink-0" />
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
                    className="text-[11px] font-mono text-[#49454F] bg-[#F4F2F8] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Links */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#C8C5D0]/20">
              <span className="text-xs font-mono text-[#635F6A]">
                {project.category}
              </span>

              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-mono text-[#49454F] hover:text-[#1D1B20] transition-colors px-3 py-1 rounded-full bg-[#F4F2F8] border border-[#C8C5D0]/40 hover:bg-[#EEEBF2]"
                  >
                    Source Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center text-xs font-mono text-[#140E62] hover:text-[#5954A8] transition-colors px-3 py-1 rounded-full bg-[#E3DFFF] border border-[#C7BFFF]/40 hover:bg-[#D5CEFF]"
                  >
                    Live Demo
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
