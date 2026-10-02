import { GardenClientView } from "@/components/garden-client-view";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5954A8] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <span>Digital Garden &amp; Engineering Notes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1B20] font-sans">
          Engineering Notes
        </h1>
        <p className="text-base text-[#49454F] leading-relaxed font-normal">
          An evolving collection of technical research, systems analysis, and architectural writeups. Categorized by growth stage from early hypotheses to verified patterns.
        </p>
      </div>

      {/* Interactive Garden Notes Stream */}
      <GardenClientView />
    </div>
  );
}
