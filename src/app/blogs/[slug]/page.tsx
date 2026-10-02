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
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Budding":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "Evergreen":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    }
  };

  return (
    <article className="flex flex-col gap-10 py-8 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/blogs"
          className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-white transition-colors group"
        >
          <span>&larr; Return to Digital Garden</span>
        </Link>

        <span className="text-xs font-mono text-slate-500">
          NODE ID: {note.slug}
        </span>
      </div>

      {/* Note Header Banner */}
      <header className="flex flex-col gap-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Badge
            variant="outline"
            className={`rounded-full px-3 py-0.5 text-xs font-mono ${getStageColor(
              note.stage
            )}`}
          >
            {note.stage}
          </Badge>
          <span className="text-slate-400 font-mono text-xs">{note.category}</span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400 font-mono text-xs">
            {note.date}
          </span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400 font-mono text-xs">
            {note.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
          {note.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal">
          {note.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {note.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Note Editorial Content */}
      <div className="flex flex-col gap-6 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
        {note.content.trim().split("\n\n").map((block, idx) => {
          if (block.startsWith("### ")) {
            return (
              <h2
                key={idx}
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-6 pt-4 border-t border-slate-800/60 font-sans"
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
                className="my-3 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto shadow-inner"
              >
                {lang && (
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest pb-2 mb-2 border-b border-slate-900">
                    {lang}
                  </div>
                )}
                <pre className="m-0 leading-relaxed">{code}</pre>
              </div>
            );
          }
          if (block.startsWith("- ")) {
            const items = block.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={idx} className="list-none p-0 m-0 flex flex-col gap-2 my-2 text-slate-300">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{item.replace("- ", "")}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-300 leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      {/* Garden Feedback & Stage Taxonomy Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm flex flex-col gap-2 my-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span>Note Provenance // Growth Stage: {note.stage}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This digital garden note reflects working research and engineering implementations. All ideas are version-controlled and revised as systems evolve.
        </p>
      </div>

      {/* Related Garden Notes */}
      {relatedNotes.length > 0 && (
        <section className="flex flex-col gap-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Interconnected Garden Notes</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNotes.map((rel) => (
              <Link key={rel.slug} href={`/blogs/${rel.slug}`} className="group block">
                <Card className="p-4 rounded-xl border-slate-800 bg-slate-950/60 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all flex flex-col justify-between gap-3 h-full">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-indigo-400">{rel.stage}</span>
                      <span className="text-slate-500">{rel.readTime}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-slate-500 flex items-center gap-1 self-end group-hover:text-white transition-colors">
                    <span>Inspect note &rarr;</span>
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
