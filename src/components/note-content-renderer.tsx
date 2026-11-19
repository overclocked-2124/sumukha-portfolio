import * as React from "react";

interface NoteContentRendererProps {
  content: string;
  compact?: boolean;
}

type ParsedBlock =
  | { type: "heading"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

function parseNoteBlocks(content: string): ParsedBlock[] {
  const lines = content.trim().split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i += 1;
      }
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "heading", text: trimmed.slice(4) });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("### ") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("- ")
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code
          key={idx}
          translate="no"
          className="px-1.5 py-0.5 rounded-[4px] bg-[#E4E1D8] border border-[#D5D1C5] font-mono text-[0.875em] text-[#141517]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-[#141517]">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      return (
        <em key={idx} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

export function NoteContentRenderer({
  content,
  compact = false,
}: NoteContentRendererProps) {
  const blocks = parseNoteBlocks(content);

  return (
    <div
      className={
        compact
          ? "flex flex-col gap-3.5 text-sm text-[#141517] leading-relaxed"
          : "flex flex-col gap-6 text-base text-[#141517] leading-relaxed max-w-[68ch]"
      }
    >
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          return (
            <h2
              key={idx}
              className={
                compact
                  ? "text-base font-bold text-[#141517] tracking-tight mt-2 pt-3 border-t border-[#D5D1C5]"
                  : "text-xl font-bold text-[#141517] tracking-tight mt-6 pt-6 border-t border-[#D5D1C5] scroll-mt-24"
              }
            >
              {renderInlineMarkdown(block.text)}
            </h2>
          );
        }

        if (block.type === "code") {
          return (
            <div
              key={idx}
              translate="no"
              className="my-1 rounded-[6px] border border-[#D5D1C5] bg-[#FAF9F5] overflow-hidden"
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#E4E1D8] border-b border-[#D5D1C5] text-xs font-mono text-[#52514C]">
                <span>{block.lang || "source"}</span>
              </div>
              <pre className="p-3.5 m-0 leading-relaxed font-mono text-xs sm:text-sm text-[#141517] overflow-x-auto">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={idx}
              className="list-none p-0 m-0 flex flex-col gap-2 text-[#141517]"
            >
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[#B43900] select-none shrink-0"
                  >
                    –
                  </span>
                  <span className="min-w-0 leading-relaxed text-pretty">
                    {renderInlineMarkdown(item)}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="leading-relaxed text-pretty">
            {renderInlineMarkdown(block.text)}
          </p>
        );
      })}
    </div>
  );
}
