"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  personalInfo,
  hardwareModules,
  type HardwareModuleSpec,
} from "@/data/portfolio-data";
import { ResumeModal } from "@/components/resume-modal";
import {
  createHardwareRigScene,
  type ModuleId,
  type RigSceneController,
} from "@/components/workbench/rig-scene";
import { ModuleInspector } from "@/components/workbench/module-inspector";
import { WebGLFallback } from "@/components/workbench/webgl-fallback";

const VALID_MODULE_IDS = new Set<HardwareModuleSpec["id"]>(
  hardwareModules.map((m) => m.id)
);

function parseModuleParam(value: string | null): ModuleId {
  if (value && VALID_MODULE_IDS.has(value as HardwareModuleSpec["id"])) {
    return value as HardwareModuleSpec["id"];
  }
  return null;
}

export function Te3DHardwareRig() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<RigSceneController | null>(null);
  const pinRefs = useRef<
    Record<HardwareModuleSpec["id"], HTMLButtonElement | null>
  >({
    cpu: null,
    pcie: null,
    mem: null,
    vrm: null,
    io: null,
  });

  const [selectedId, setSelectedId] = useState<ModuleId>(null);
  const [hoveredId, setHoveredId] = useState<ModuleId>(null);
  const [exploded, setExploded] = useState<boolean>(false);
  const [selectedNoteSlug, setSelectedNoteSlug] = useState<string | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>("");

  const syncUrlModule = useCallback((id: ModuleId) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("module", id);
    } else {
      url.searchParams.delete("module");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const handleSelectModule = useCallback(
    (id: ModuleId) => {
      setSelectedId(id);
      setSelectedNoteSlug(null);
      sceneRef.current?.setSelectedModule(id);
      syncUrlModule(id);

      if (id) {
        const mod = hardwareModules.find((m) => m.id === id);
        if (mod) {
          setAnnouncement(
            `Inspecting ${mod.partName}: ${mod.subsystemLabel}.`
          );
        }
      } else {
        setAnnouncement("Showing full modular hardware board.");
      }
    },
    [syncUrlModule]
  );

  const handleToggleExplode = useCallback(() => {
    setExploded((prev) => {
      const next = !prev;
      sceneRef.current?.setExploded(next);
      setAnnouncement(
        next
          ? "3D hardware rig exploded into subsystem layers."
          : "3D hardware rig assembled on motherboard."
      );
      return next;
    });
  }, []);

  // Initialize from URL query string on mount and keep in sync with browser history
  useEffect(() => {
    const readFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const initial = parseModuleParam(params.get("module"));
      setSelectedId(initial);
      sceneRef.current?.setSelectedModule(initial);
    };

    readFromUrl();
    window.addEventListener("popstate", readFromUrl);
    return () => window.removeEventListener("popstate", readFromUrl);
  }, []);

  // Mount Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const controller = createHardwareRigScene(container, {
      getPinElement: (id) => pinRefs.current[id],
      onHoverModule: (id) => setHoveredId(id),
      onSelectModule: (id) => handleSelectModule(id),
      onWebGLUnavailable: () => setWebglUnavailable(true),
    });

    sceneRef.current = controller;

    // Apply URL module selection if present on initial load
    const initial = parseModuleParam(
      new URLSearchParams(window.location.search).get("module")
    );
    if (initial && controller) {
      controller.setSelectedModule(initial);
    }

    return () => {
      controller?.dispose();
      sceneRef.current = null;
    };
  }, [handleSelectModule]);

  const handleCanvasKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!sceneRef.current) return;
    const step = 0.14;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        sceneRef.current.nudgeCamera(step, 0);
        break;
      case "ArrowRight":
        event.preventDefault();
        sceneRef.current.nudgeCamera(-step, 0);
        break;
      case "ArrowUp":
        event.preventDefault();
        sceneRef.current.nudgeCamera(0, -step * 0.7);
        break;
      case "ArrowDown":
        event.preventDefault();
        sceneRef.current.nudgeCamera(0, step * 0.7);
        break;
      default:
        break;
    }
  };

  const activeSpec = hardwareModules.find((m) => m.id === selectedId) ?? null;

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-[#EFEDE6] text-[#141517]">
      {/* Persistent polite status region for screen reader announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* 1. Interactive 3D WebGL Canvas or Accessible 2D Fallback */}
      {webglUnavailable ? (
        <WebGLFallback
          selectedId={selectedId}
          onSelectModule={(id) => handleSelectModule(id)}
        />
      ) : (
        <>
          <div
            ref={mountRef}
            tabIndex={0}
            role="region"
            aria-label="Interactive 3D PC Hardware Rig — drag to orbit, click a component, or press arrow keys to rotate view"
            onKeyDown={handleCanvasKeyDown}
            className="absolute inset-0 w-full h-full select-none cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[#B43900] focus-visible:-outline-offset-4"
          />

          {/* 2. Projected 3D Hardware Callout Pins */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {hardwareModules.map((mod) => {
              const isSelected = selectedId === mod.id;
              const isHovered = hoveredId === mod.id;

              return (
                <button
                  key={mod.id}
                  ref={(el) => {
                    pinRefs.current[mod.id] = el;
                  }}
                  type="button"
                  aria-label={`Inspect ${mod.partName}: ${mod.subsystemLabel}`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectModule(mod.id)}
                  onMouseEnter={() => {
                    sceneRef.current?.setHoveredModule(mod.id);
                    setHoveredId(mod.id);
                  }}
                  onMouseLeave={() => {
                    sceneRef.current?.setHoveredModule(null);
                    setHoveredId(null);
                  }}
                  className="absolute top-0 left-0 flex flex-col items-center cursor-pointer group"
                  style={{ willChange: "transform" }}
                >
                  <span
                    className={`px-2.5 py-1 rounded-[5px] border text-xs font-mono whitespace-nowrap flex items-center gap-1.5 te-btn ${
                      isSelected
                        ? "bg-[#FF4F00] text-[#141517] border-[#141517] font-semibold"
                        : isHovered
                        ? "bg-[#141517] text-[#FAF9F5] border-[#141517] font-medium"
                        : "bg-[#FAF9F5]/95 text-[#141517] border-[#D5D1C5] group-hover:border-[#141517]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-[#141517]" : "bg-[#FF4F00]"
                      }`}
                    />
                    <span>{mod.partName}</span>
                    <span
                      className={`hidden xl:inline text-xs ${
                        isSelected
                          ? "text-[#141517]"
                          : isHovered
                          ? "text-[#FAF9F5]/85"
                          : "text-[#52514C]"
                      }`}
                    >
                      ({mod.subsystemLabel})
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`w-[1.5px] h-3.5 ${
                      isSelected
                        ? "bg-[#FF4F00]"
                        : isHovered
                        ? "bg-[#141517]"
                        : "bg-[#52514C]/60"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full border ${
                      isSelected
                        ? "bg-[#FF4F00] border-[#141517]"
                        : "bg-[#FAF9F5] border-[#141517]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 3. Top Hardware Bar: Operator Identity + Tactile Rig Controls */}
      <header className="pointer-events-none fixed top-0 inset-x-0 z-20 p-3 sm:p-6 flex flex-wrap items-start justify-between gap-3 sm:gap-4">
        {/* Top-Left Identity Plate */}
        <div className="pointer-events-auto te-surface p-3.5 sm:p-4 max-w-md w-full sm:w-auto bg-[#FAF9F5]/95 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-[#FF4F00] shrink-0"
              />
              <h1 className="text-base font-bold tracking-tight text-[#141517] truncate">
                {personalInfo.name}
              </h1>
            </div>
            <span
              translate="no"
              className="text-xs font-mono text-[#52514C] shrink-0"
            >
              TX-2124
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#52514C] mt-1 leading-relaxed text-pretty">
            Systems and Backend Engineer. Auxia (2x), FindInbox, RVCE (9.69 CGPA), IIT Madras (9.15 GPA).
          </p>

          <nav
            aria-label="Primary Portfolio Routes"
            className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mt-3 pt-2.5 border-t border-[#D5D1C5] text-xs font-mono"
          >
            <Link
              href="/projects"
              className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
            >
              Experience
            </Link>
            <Link
              href="/blogs"
              className="text-[#141517] font-medium hover:text-[#B43900] underline underline-offset-4"
            >
              Notes
            </Link>
            <span aria-hidden="true" className="text-[#D5D1C5]">
              /
            </span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#52514C] hover:text-[#141517] underline underline-offset-4"
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#52514C] hover:text-[#141517] underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-[#52514C] hover:text-[#141517] underline underline-offset-4"
            >
              LeetCode (279)
            </a>
            <a
              href={personalInfo.kaggle}
              target="_blank"
              rel="noreferrer"
              className="text-[#52514C] hover:text-[#141517] underline underline-offset-4"
            >
              Kaggle
            </a>
          </nav>
        </div>

        {/* Top-Right Rig Action Controls */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          {!webglUnavailable && (
            <button
              type="button"
              aria-pressed={exploded}
              onClick={handleToggleExplode}
              className={`te-btn min-h-9 px-3.5 py-1.5 rounded-[6px] text-xs font-mono border cursor-pointer ${
                exploded
                  ? "bg-[#FF4F00] text-[#141517] border-[#141517] font-semibold"
                  : "bg-[#FAF9F5]/95 text-[#141517] border-[#D5D1C5] hover:border-[#141517]"
              }`}
            >
              {exploded ? "Assemble 3D Rig" : "Explode 3D Rig"}
            </button>
          )}

          {selectedId && (
            <button
              type="button"
              onClick={() => handleSelectModule(null)}
              className="te-btn min-h-9 px-3.5 py-1.5 rounded-[6px] text-xs font-mono bg-[#141517] text-[#FAF9F5] hover:bg-[#2F3437] cursor-pointer"
            >
              Reset View
            </button>
          )}

          <ResumeModal />
        </div>
      </header>

      {/* 4. Bottom Tactile Key Selector Dock */}
      <nav
        aria-label="Hardware Subsystem Selector"
        className="pointer-events-auto fixed bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[calc(100vw-2rem)] z-20 flex items-center justify-start lg:justify-center gap-1.5 p-1.5 rounded-[10px] bg-[#FAF9F5]/95 backdrop-blur-md border border-[#D5D1C5] overflow-x-auto"
      >
        <button
          type="button"
          aria-pressed={selectedId === null}
          onClick={() => handleSelectModule(null)}
          className={`te-btn min-h-9 px-3 py-1.5 rounded-[6px] text-xs font-mono shrink-0 cursor-pointer ${
            selectedId === null
              ? "bg-[#141517] text-[#FAF9F5] font-medium"
              : "bg-transparent text-[#52514C] hover:text-[#141517] hover:bg-[#E4E1D8]"
          }`}
        >
          Full Board
        </button>

        {hardwareModules.map((mod) => {
          const isActive = selectedId === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelectModule(mod.id)}
              className={`te-btn min-h-9 px-3 py-1.5 rounded-[6px] text-xs font-mono shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#FF4F00] text-[#141517] border border-[#141517] font-semibold"
                  : "bg-transparent text-[#141517] hover:bg-[#E4E1D8]"
              }`}
            >
              {mod.partName}
            </button>
          );
        })}
      </nav>

      {/* 5. Slide-Over Hardware Specification Sheet */}
      {activeSpec && (
        <ModuleInspector
          activeSpec={activeSpec}
          selectedNoteSlug={selectedNoteSlug}
          onSelectNote={setSelectedNoteSlug}
          onClose={() => handleSelectModule(null)}
        />
      )}
    </div>
  );
}
