"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  nodeCount?: number;
}

export function NeuralBackground({
  className,
  nodeCount = 35,
}: NeuralBackgroundProps) {
  const nodes = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodeCount; i++) {
      result.push({
        id: i,
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: 1.5 + Math.random() * 1.5,
        delay: Math.random() * 4,
      });
    }
    return result;
  }, [nodeCount]);

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].cx - nodes[j].cx;
        const dy = nodes[i].cy - nodes[j].cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 18) {
          result.push({
            id: `${i}-${j}`,
            x1: nodes[i].cx,
            y1: nodes[i].cy,
            x2: nodes[j].cx,
            y2: nodes[j].cy,
            opacity: Math.max(0.02, 0.08 - distance * 0.004),
          });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Connection lines */}
        {lines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.15"
            opacity={line.opacity}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.cx}%`}
            cy={`${node.cy}%`}
            r={node.r}
            fill="rgba(255,255,255,0.08)"
            className="animate-neural-pulse"
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
