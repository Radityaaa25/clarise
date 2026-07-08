"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 25, className }: MarqueeProps) {
  const [pausedRows, setPausedRows] = useState({ top: false, bottom: false });

  const pauseRow = useCallback((row: "top" | "bottom") => {
    setPausedRows((prev) => ({ ...prev, [row]: true }));
  }, []);

  const resumeRow = useCallback((row: "top" | "bottom") => {
    setPausedRows((prev) => ({ ...prev, [row]: false }));
  }, []);

  const toggleRow = useCallback((row: "top" | "bottom") => {
    setPausedRows((prev) => ({ ...prev, [row]: !prev[row] }));
  }, []);

  const renderRow = (dir: "right" | "left", rowKey: "top" | "bottom") => (
    <div
      className="overflow-hidden"
      onMouseEnter={() => pauseRow(rowKey)}
      onMouseLeave={() => resumeRow(rowKey)}
      onClick={() => toggleRow(rowKey)}
    >
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          width: "max-content",
          animation: `marquee-${dir} ${speed}s linear infinite`,
          animationPlayState: pausedRows[rowKey] ? "paused" : "running",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="marquee-card w-[320px] shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marquee-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-left {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-card > * {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .marquee-card:hover > * {
          scale: 1.03;
          translate: 0 -4px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
          border-color: rgb(26 127 204 / 0.3);
        }
        .dark .marquee-card:hover > * {
          box-shadow: 0 20px 25px -5px rgba(26,127,204,0.15), 0 8px 10px -6px rgba(26,127,204,0.1);
        }
      `}</style>

      <div className={cn("space-y-6 overflow-hidden", className)}>
        {renderRow("right", "top")}
        {renderRow("left", "bottom")}
      </div>
    </>
  );
}
