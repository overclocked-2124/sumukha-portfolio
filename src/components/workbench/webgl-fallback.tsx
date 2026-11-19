import { hardwareModules, type HardwareModuleSpec } from "@/data/portfolio-data";

interface WebGLFallbackProps {
  selectedId: HardwareModuleSpec["id"] | null;
  onSelectModule: (id: HardwareModuleSpec["id"]) => void;
}

export function WebGLFallback({
  selectedId,
  onSelectModule,
}: WebGLFallbackProps) {
  return (
    <div
      role="region"
      aria-label="2D Hardware Module Selector (WebGL Fallback)"
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-36 pb-24 overflow-y-auto"
    >
      <div className="te-surface max-w-2xl w-full p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3 border-b border-[#D5D1C5] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#141517]">
              TX-2124 Hardware Schematic
            </h2>
            <p className="text-xs text-[#52514C] mt-0.5">
              2D workbench mode active. Select any hardware subsystem to inspect its specification sheet.
            </p>
          </div>
          <span className="text-xs font-mono text-[#B43900] font-semibold shrink-0">
            2D Mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hardwareModules.map((mod) => {
            const isSelected = selectedId === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectModule(mod.id)}
                className={`te-btn text-left p-4 rounded-[8px] border cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? "bg-[#FF4F00] border-[#141517] text-[#141517]"
                    : "bg-[#EFEDE6] border-[#D5D1C5] text-[#141517] hover:border-[#141517]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="font-semibold">{mod.partName}</span>
                  <span
                    className={
                      isSelected ? "text-[#141517]" : "text-[#52514C]"
                    }
                  >
                    {mod.socketSpec}
                  </span>
                </div>
                <div className="text-sm font-bold">{mod.subsystemLabel}</div>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? "text-[#141517]" : "text-[#52514C]"
                  }`}
                >
                  {mod.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
