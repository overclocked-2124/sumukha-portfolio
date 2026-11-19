import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gardenNotes, type GardenNote } from "@/data/portfolio-data";
import { NoteContentRenderer } from "@/components/note-content-renderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return gardenNotes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = gardenNotes.find((n) => n.slug === slug);
  if (!note) {
    return { title: "Note Not Found — Sumukha Upadhyaya" };
  }
  return {
    title: `${note.title} — Sumukha Upadhyaya`,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = gardenNotes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  const relatedNotes = gardenNotes
    .filter((n) => n.slug !== note.slug)
    .slice(0, 2);

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
    <article className="flex flex-col gap-10 py-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#D5D1C5] pb-3 text-xs font-mono">
        <Link
          href="/blogs"
          className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
        >
          Back to Engineering Notes
        </Link>
        <span className="text-[#52514C]">{note.category}</span>
      </div>

      <header className="flex flex-col gap-4 border-b border-[#D5D1C5] pb-8">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#52514C]">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageBadgeClass(
              note.stage
            )}`}
          >
            {note.stage}
          </span>
          <span>{note.date}</span>
          <span aria-hidden="true">/</span>
          <span>{note.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] leading-tight text-balance">
          {note.title}
        </h1>

        <p className="text-base sm:text-lg text-[#52514C] leading-relaxed text-pretty">
          {note.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {note.tags.map((t) => (
            <span key={t} translate="no" className="te-kbd">
              {t}
            </span>
          ))}
        </div>
      </header>

      <NoteContentRenderer content={note.content} />

      {relatedNotes.length > 0 && (
        <section className="flex flex-col gap-4 pt-8 border-t border-[#D5D1C5]">
          <h2 className="text-base font-bold text-[#141517]">
            More Engineering Notes
          </h2>

          <div className="te-surface divide-y divide-[#D5D1C5]">
            {relatedNotes.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="p-5 flex items-center justify-between gap-4 group hover:bg-[#E4E1D8]/40 transition-colors duration-150 ease-out"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-xs font-mono text-[#B43900] font-semibold">
                    {rel.category} ({rel.readTime})
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#141517] group-hover:text-[#B43900] transition-colors duration-150 ease-out text-balance">
                    {rel.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#141517] font-medium shrink-0">
                  Read Article
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
