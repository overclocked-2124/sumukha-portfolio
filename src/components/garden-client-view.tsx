"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { gardenNotes, type GardenNote } from "@/data/portfolio-data";

const CATEGORIES = ["All", "Systems", "Security", "Architecture"] as const;

export function GardenClientView() {
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

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return gardenNotes.filter((note) => {
      const matchesCategory =
        selectedCategory === "All" || note.category === selectedCategory;

      const matchesSearch =
        q === "" ||
        note.title.toLowerCase().includes(q) ||
        note.excerpt.toLowerCase().includes(q) ||
        note.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getStageBadgeClass = (stage: GardenNote["stage"]) => {
    switch (stage) {
      case "Evergreen":
        return "badge-pastel-green";
      case "Budding":
        return "badge-pastel-yellow";
      default:
        return "badge-pastel-blue";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar */}
      <div className="te-surface p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter notes by category"
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

        <div className="w-full sm:w-64">
          <label htmlFor="notes-filter-input" className="sr-only">
            Search engineering notes and tags
          </label>
          <Input
            id="notes-filter-input"
            name="notesQuery"
            type="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search notes & tags…"
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
        Showing {filteredNotes.length} of {gardenNotes.length} engineering notes
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 ? (
        <div className="te-surface p-12 text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#B43900] font-semibold">
            No matching note
          </span>
          <p className="text-sm text-[#52514C] max-w-md text-pretty">
            No engineering notes matched your filter criteria.
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
          {filteredNotes.map((note) => (
            <Link
              key={note.slug}
              href={`/blogs/${note.slug}`}
              className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:bg-[#E4E1D8]/40 transition-colors duration-150 ease-out"
            >
              <div className="flex flex-col gap-2.5 max-w-2xl min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#52514C]">
                  <span className="text-[#B43900] font-semibold">
                    {note.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStageBadgeClass(
                      note.stage
                    )}`}
                  >
                    {note.stage}
                  </span>
                  <span>{note.date}</span>
                  <span aria-hidden="true">/</span>
                  <span>{note.readTime}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#141517] group-hover:text-[#B43900] transition-colors duration-150 ease-out leading-snug text-balance">
                  {note.title}
                </h2>

                <p className="text-sm sm:text-base text-[#141517] leading-relaxed text-pretty">
                  {note.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((t) => (
                    <span key={t} translate="no" className="te-kbd">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <span className="te-btn inline-flex items-center px-3.5 py-1.5 rounded-[5px] bg-[#EFEDE6] border border-[#D5D1C5] group-hover:border-[#141517] text-xs font-mono text-[#141517] font-medium">
                  Read Article
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
