"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { gardenNotes, GardenNote } from "@/data/portfolio-data";

export function GardenClientView() {
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const stages = ["All", "Seedling", "Budding", "Evergreen"];
  const categories = ["All", "Systems", "Security", "Architecture", "Design"];

  const filteredNotes = useMemo(() => {
    return gardenNotes.filter((note) => {
      const matchesStage = selectedStage === "All" || note.stage === selectedStage;
      const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStage && matchesCategory && matchesSearch;
    });
  }, [selectedStage, selectedCategory, searchQuery]);

  const getStageColor = (stage: GardenNote["stage"]) => {
    switch (stage) {
      case "Seedling":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Budding":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "Evergreen":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-950/75 backdrop-blur-sm">
        {/* Stage Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-1">
              GROWTH STAGE:
            </span>
            {stages.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedStage === stage
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-medium"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          {/* Search Box without icon */}
          <div className="w-full sm:w-64">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes & tags..."
              className="h-8 text-xs font-mono bg-slate-900/80 border-slate-800 text-slate-200 rounded-full focus-visible:ring-indigo-500/30 px-3.5"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900 text-xs font-mono">
          <span className="text-slate-500 mr-1">TOPIC DOMAIN:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-800 text-indigo-300 font-medium"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Telemetry Stats */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <span>SHOWING {filteredNotes.length} OF {gardenNotes.length} GARDEN LOGS</span>
        <span>GROWTH METRIC: REPRODUCIBLE &amp; TENDED</span>
      </div>

      {/* Notes Stream */}
      <div className="flex flex-col gap-5">
        {filteredNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/blogs/${note.slug}`}
            className="group block"
          >
            <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border-slate-800/80 bg-slate-950/75 p-6 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <Badge
                    variant="outline"
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono ${getStageColor(
                      note.stage
                    )}`}
                  >
                    {note.stage}
                  </Badge>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {note.category}
                  </span>
                  <span className="text-slate-700">/</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {note.date}
                  </span>
                  <span className="text-slate-700">/</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {note.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {note.title}
                </h2>

                <p className="text-sm text-slate-300/85 leading-relaxed">
                  {note.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <div className="inline-flex items-center text-xs font-mono text-slate-400 group-hover:text-indigo-300 transition-colors border border-slate-800 group-hover:border-indigo-500/40 rounded-full px-3.5 py-1.5 bg-slate-900/80">
                  <span>Inspect note &rarr;</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
