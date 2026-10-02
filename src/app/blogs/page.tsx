import { GardenClientView } from "@/components/garden-client-view";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Garden Logbook &amp; Essays</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Digital Garden Notes
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          An evolving locus of technical research, architectural notes, and essays. Organized by growth stage rather than publication chronology.
        </p>
      </div>

      {/* Interactive Garden Notes Stream */}
      <GardenClientView />
    </div>
  );
}
