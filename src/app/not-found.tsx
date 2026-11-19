import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="te-surface p-8 sm:p-12 max-w-md w-full flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#B43900] font-semibold">
          HTTP 404 — Unmapped Module
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] text-balance">
          Hardware slot not populated
        </h1>
        <p className="text-sm text-[#52514C] leading-relaxed text-pretty">
          The requested route does not match an installed module or page on this board.
        </p>
        <Link
          href="/"
          className="te-btn mt-2 inline-flex items-center px-4 py-2 rounded-[5px] bg-[#141517] text-[#FAF9F5] text-xs font-mono hover:bg-[#2F3437]"
        >
          Return to 3D Hardware Rig
        </Link>
      </div>
    </div>
  );
}
