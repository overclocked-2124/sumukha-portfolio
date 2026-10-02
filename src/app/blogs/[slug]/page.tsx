import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { gardenNotes, GardenNote } from "@/data/portfolio-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return gardenNotes.map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = gardenNotes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  const relatedNotes = gardenNotes
    .filter((n) => n.slug !== note.slug && (n.category === note.category || n.stage === note.stage))
    .slice(0, 2);

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
    <article className="flex flex-col gap-10 py-8 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/blogs"
          className="inline-flex items-center text-xs font-mono text-[#5954A8] hover:underline"
        >
          <span>&larr; Return to Notes</span>
        </Link>

        <span className="text-xs font-mono text-[#635F6A]">
          NOTE ID: {note.slug}
        </span>
      </div>

      {/* Note Header Banner */}
      <header className="flex flex-col gap-4 border-b border-[#C8C5D0]/30 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Badge
            variant="outline"
            className={`rounded-full px-3 py-0.5 text-xs font-mono ${getStageColor(
              note.stage
            )}`}
          >
            {note.stage}
          </Badge>
          <span className="text-[#49454F] font-mono text-xs">{note.category}</span>
          <span className="text-[#C8C5D0]">/</span>
          <span className="text-[#635F6A] font-mono text-xs">
            {note.date}
          </span>
          <span className="text-[#C8C5D0]">/</span>
          <span className="text-[#635F6A] font-mono text-xs">
            {note.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1B20] leading-tight font-sans">
          {note.title}
        </h1>

        <p className="text-base sm:text-lg text-[#49454F] leading-relaxed font-normal">
          {note.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {note.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[#635F6A] bg-[#F4F2F8] border border-[#C8C5D0]/30 px-2.5 py-0.5 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Note Editorial Content */}
      <div className="flex flex-col gap-6 text-[#1D1B20] text-sm sm:text-base leading-relaxed font-sans">
        {note.content.trim().split("\n\n").map((block, idx) => {
          if (block.startsWith("### ")) {
            return (
              <h2
                key={idx}
                className="text-xl sm:text-2xl font-bold text-[#1D1B20] tracking-tight mt-6 pt-4 border-t border-[#C8C5D0]/20 font-sans"
              >
                {block.replace("### ", "")}
              </h2>
            );
          }
          if (block.startsWith("```")) {
            const lines = block.split("\n");
            const lang = lines[0].replace("```", "");
            const code = lines.slice(1, -1).join("\n");
            return (
              <div
                key={idx}
                className="my-3 rounded-2xl border border-[#C8C5D0]/30 bg-[#F4F2F8] p-4 font-mono text-xs sm:text-sm text-[#1D1B20] overflow-x-auto shadow-inner"
              >
                {lang && (
                  <div className="text-[10px] text-[#5954A8] font-bold uppercase tracking-widest pb-2 mb-2 border-b border-[#C8C5D0]/20">
                    {lang}
                  </div>
                )}
                <pre className="m-0 leading-relaxed font-mono">{code}</pre>
              </div>
            );
          }
          if (block.startsWith("- ")) {
            const items = block.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={idx} className="list-none p-0 m-0 flex flex-col gap-2 my-2 text-[#49454F]">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8] mt-2 shrink-0" />
                    <span>{item.replace("- ", "")}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-[#333138] leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      {/* Note Provenance Card */}
      <div className="rounded-3xl border border-[#C7BFFF]/40 bg-[#E3DFFF]/40 p-6 flex flex-col gap-2 my-6">
        <div className="flex items-center gap-2 text-[#5954A8] text-xs font-mono uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5954A8]" />
          <span>Note Provenance • Growth Stage: {note.stage}</span>
        </div>
        <p className="text-xs text-[#49454F] leading-relaxed">
          This digital garden note reflects working research and technical implementations. It is revised iteratively as projects evolve.
        </p>
      </div>

      {/* Related Garden Notes */}
      {relatedNotes.length > 0 && (
        <section className="flex flex-col gap-4 pt-8 border-t border-[#C8C5D0]/30">
          <h3 className="text-lg font-bold text-[#1D1B20] tracking-tight">
            Related Notes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNotes.map((rel) => (
              <Link key={rel.slug} href={`/blogs/${rel.slug}`} className="group block h-full">
                <Card className="p-5 rounded-3xl border-[#C8C5D0]/30 bg-white hover:shadow-md transition-all flex flex-col justify-between gap-3 h-full">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#5954A8] font-bold">{rel.stage}</span>
                      <span className="text-[#635F6A]">{rel.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1D1B20] group-hover:text-[#5954A8] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-[#5954A8] self-end group-hover:underline">
                    <span>Read note &rarr;</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
