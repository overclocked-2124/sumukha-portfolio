"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { projectList } from "@/data/portfolio-data";

const CATEGORIES = [
  "All",
  "Low-Level & Security",
  "Distributed Systems",
  "AI & Interfaces",
  "Web & Frontend",
] as const;

export function ProjectsClientView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const syncUrlParams = useCallback((cat: string, query: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (cat && cat !== "All") {
      url.searchParams.set("category", cat);
    } else {
      url.searchParams.delete("category");
    }
    if (query.trim()) {
      url.searchParams.set("q", query.trim());
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, []);

  useEffect(() => {
    const readFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      const qParam = params.get("q") ?? "";
      if (
        catParam &&
        CATEGORIES.includes(catParam as (typeof CATEGORIES)[number])
      ) {
        setSelectedCategory(catParam);
      } else {
        setSelectedCategory("All");
      }
      setSearchQuery(qParam);
    };
    readFromUrl();
    window.addEventListener("popstate", readFromUrl);
    return () => window.removeEventListener("popstate", readFromUrl);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    syncUrlParams(cat, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    syncUrlParams(selectedCategory, value);
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    syncUrlParams("All", "");
  };

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projectList.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Production":
        return "badge-pastel-green";
      case "Active":
        return "badge-pastel-blue";
      default:
        return "badge-pastel-yellow";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter & Search Bar */}
      <div className="te-surface p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
              onClick={() => handleCategoryChange(cat)}
              className={`te-btn min-h-9 px-3 py-1.5 rounded-[5px] text-xs font-mono cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#141517] text-[#FAF9F5] font-medium"
                  : "bg-[#EFEDE6] text-[#52514C] border border-[#D5D1C5] hover:text-[#141517] hover:border-[#141517]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 flex items-center gap-2">
          <label htmlFor="projects-filter-input" className="sr-only">
            Filter projects by stack or name
          </label>
          <Input
            id="projects-filter-input"
            name="projectQuery"
            type="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Filter by stack or name…"
            className="h-9 text-base sm:text-sm font-mono bg-[#EFEDE6] border-[#D5D1C5] text-[#141517] rounded-[5px] focus-visible:ring-[#B43900] px-3"
          />
        </div>
      </div>

      {/* Persistent live count for accessibility */}
      <div
        role="status"
        aria-live="polite"
        className="text-xs font-mono text-[#52514C]"
      >
        Showing {filteredProjects.length} of {projectList.length} engineered systems
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="te-surface p-12 text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#B43900] font-semibold">
            No matching systems found
          </span>
          <p className="text-sm text-[#52514C] max-w-md text-pretty">
            No projects matched your current filter. Reset the query to inspect all repositories.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="te-btn mt-2 min-h-9 px-3.5 py-1.5 rounded-[5px] bg-[#141517] text-[#FAF9F5] text-xs font-mono cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="te-surface divide-y divide-[#D5D1C5]">
          {filteredProjects.map((project) => (
            <article
              key={project.slug}
              className="p-6 sm:p-8 flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                <div className="flex flex-wrap items-baseline gap-3 min-w-0">
                  <h2 className="text-xl font-bold text-[#141517] tracking-tight">
                    {project.title}
                  </h2>
                  <span className="text-xs font-mono text-[#52514C]">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${getStatusBadgeClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#B43900] font-semibold hover:underline underline-offset-4"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#141517] font-semibold hover:text-[#B43900] underline underline-offset-4"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#141517] leading-relaxed max-w-[68ch] text-pretty">
                {project.description}
              </p>

              {project.highlights.length > 0 && (
                <ul className="list-none p-0 m-0 flex flex-col gap-1.5 text-xs sm:text-sm text-[#52514C] max-w-[68ch]">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 min-w-0">
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
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span key={tech} translate="no" className="te-kbd">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
