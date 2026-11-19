import type { Metadata } from "next";
import { GardenClientView } from "@/components/garden-client-view";

export const metadata: Metadata = {
  title: "Engineering Notes — Sumukha Upadhyaya",
  description:
    "Technical writeups on Linux ptrace syscall interception, BigQuery self-serve ingestion RPCs, stateful gRPC streams, and 20kHz edge acoustic ML.",
};

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-[#D5D1C5] pb-8 items-end">
        <div className="md:col-span-5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] text-balance">
            Engineering Notes
          </h1>
        </div>
        <div className="md:col-span-7">
          <p className="text-sm sm:text-base text-[#52514C] leading-relaxed text-pretty">
            Technical writeups on Linux ptrace internals, BigQuery self-serve RPC schemas, stateful gRPC streams, and edge acoustic ML.
          </p>
        </div>
      </div>

      <GardenClientView />
    </div>
  );
}
