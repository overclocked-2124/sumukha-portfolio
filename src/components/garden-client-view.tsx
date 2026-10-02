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
        return "border-[#85D49B]/40 bg-[#D2E7D6] text-[#0F381E]";
      case "Budding":
        return "border-[#FFB77D]/40 bg-[#FFDCC1] text-[#2E1500]";
      case "Evergreen":
        return "border-[#C7BFFF]/40 bg-[#E3DFFF] text-[#140E62]";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Filter and Search Bar in M3 Surface Container */}
      <div className="flex flex-col gap-4 p-5 rounded-3xl border border-[#C8C5D0]/30 bg-white shadow-xs">
        {/* Stage Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#635F6A] mr-1">
              GROWTH STAGE:
            </span>
            {stages.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setSelectedStage(stage)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedStage === stage
                    ? "bg-[#E3DFFF] text-[#140E62] border border-[#C7BFFF]/60 font-semibold shadow-xs"
                    : "bg-[#F4F2F8] text-[#49454F] border border-[#C8C5D0]/30 hover:bg-[#EEEBF2] hover:text-[#1D1B20]"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-64">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes & tags..."
              className="h-9 text-xs font-mono bg-[#FAF8FD] border-[#C8C5D0]/40 text-[#1D1B20] rounded-full focus-visible:ring-[#5954A8] px-4"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C8C5D0]/20 text-xs font-mono">
          <span className="text-[#635F6A] mr-1">TOPIC:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E3DFFF] text-[#140E62] font-semibold"
                  : "text-[#635F6A] hover:bg-[#F4F2F8] hover:text-[#1D1B20]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[#635F6A] px-1">
        <span>SHOWING {filteredNotes.length} OF {gardenNotes.length} NOTES</span>
        <span>CATEGORIZED BY MATURITY &amp; TOPIC</span>
      </div>

      {/* Notes Stream */}
      <div className="flex flex-col gap-5">
        {filteredNotes.map((note) => (
          <Link
            key={note.slug}
            href={`/blogs/${note.slug}`}
            className="group block"
          >
            <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border-[#C8C5D0]/30 bg-white p-6 hover:shadow-md transition-all duration-200">
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
                  <span className="text-[#49454F] font-mono text-[11px]">
                    {note.category}
                  </span>
                  <span className="text-[#C8C5D0]">/</span>
                  <span className="text-[#635F6A] font-mono text-[11px]">
                    {note.date}
                  </span>
                  <span className="text-[#C8C5D0]">/</span>
                  <span className="text-[#635F6A] font-mono text-[11px]">
                    {note.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#1D1B20] group-hover:text-[#5954A8] transition-colors leading-snug font-sans">
                  {note.title}
                </h2>

                <p className="text-sm text-[#49454F] leading-relaxed">
                  {note.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-[#635F6A] bg-[#F4F2F8] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:self-center shrink-0">
                <div className="inline-flex items-center text-xs font-mono text-[#5954A8] group-hover:underline px-3.5 py-1.5 rounded-full bg-[#F4F2F8]">
                  <span>Read note &rarr;</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
