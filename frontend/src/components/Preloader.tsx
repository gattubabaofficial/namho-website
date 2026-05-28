"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Preloader() {
  const { isDataLoaded, preloaderActive, setPreloaderActive } = useAppContext();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("ESTABLISHING CONNECTIVITY...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Status stages based on percentage
  useEffect(() => {
    if (progress < 25) {
      setStatusText("ESTABLISHING SECURE TUNNELS...");
    } else if (progress < 50) {
      setStatusText("CACHING NEURAL COGNITIVE DATA...");
    } else if (progress < 75) {
      setStatusText("SYNCHRONIZING INTERFACES...");
    } else if (progress < 95) {
      setStatusText("COMPILING COGNITIVE PIPELINES...");
    } else if (progress === 100) {
      setStatusText("SYSTEM ONLINE");
    }
  }, [progress]);

  // Smooth loading increment logic
  useEffect(() => {
    if (!preloaderActive) return;

    let timer: NodeJS.Timeout;
    
    const updateProgress = () => {
      setProgress((prev) => {
        // If data is loaded, we can speed up to 100%
        if (isDataLoaded) {
          if (prev >= 100) {
            clearInterval(timer);
            // Trigger exit transition after a tiny delay for visual satisfaction
            setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => {
                setPreloaderActive(false);
              }, 800); // Wait for transition animation to complete
            }, 400);
            return 100;
          }
          return Math.min(100, prev + Math.floor(Math.random() * 8) + 5);
        }
        
        // If data not loaded yet, hold at max 95%
        if (prev >= 95) {
          return 95;
        }
        
        // Normal simulated progress increment
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    };

    timer = setInterval(updateProgress, 60);
    return () => clearInterval(timer);
  }, [isDataLoaded, preloaderActive, setPreloaderActive]);

  if (!preloaderActive) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 select-none transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut
          ? "opacity-0 scale-[1.03] blur-md pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Background radial gradients for high-fidelity dark glassmorphic atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full w-[60vw] h-[60vw] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.02) 60%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="z-10 flex flex-col items-center gap-8 max-w-sm w-full px-6">
        {/* Inline animated SVG logo */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Glowing aura around logo */}
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="w-full h-full relative z-10"
          >
            {/* Outline Path drawing animation */}
            <path
              d="M 150,260 
                 L 205,260 
                 L 205,170 
                 A 45,45 0 0,1 295,170 
                 L 295,360 
                 L 350,360 
                 L 350,170 
                 A 100,100 0 0,0 150,170 
                 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="logo-path-anim"
            />
            {/* Circle Dot popping in */}
            <circle
              cx="177.5"
              cy="332.5"
              r="27.5"
              fill="#10b981"
              className="logo-circle-anim"
            />
          </svg>
        </div>

        {/* Text and stats */}
        <div className="flex flex-col items-center gap-3 text-center w-full">
          <div className="flex items-center gap-2">
            <span className="font-bricolage text-2xl font-semibold tracking-[0.2em] text-white pl-[0.2em]">
              NAMHO
            </span>
          </div>

          <div className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 font-medium h-4 mt-2">
            {statusText}
          </div>

          {/* Progress bar container */}
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="font-mono text-xs text-white/40 mt-1">
            {progress}%
          </div>
        </div>
      </div>

      {/* Styled JSX for drawing keyframes so we don't pollute global stylesheet */}
      <style jsx global>{`
        .logo-path-anim {
          stroke-dasharray: 1050;
          stroke-dashoffset: 1050;
          animation: traceLogoPath 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .logo-circle-anim {
          opacity: 0;
          transform: scale(0);
          transform-origin: 177.5px 332.5px;
          animation: popCircle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s forwards, glowPulse 3s ease-in-out infinite alternate;
        }

        @keyframes traceLogoPath {
          0% {
            stroke-dashoffset: 1050;
            fill: rgba(255, 255, 255, 0);
          }
          70% {
            stroke-dashoffset: 0;
            fill: rgba(255, 255, 255, 0);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(255, 255, 255, 1);
            stroke-width: 0;
          }
        }

        @keyframes popCircle {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glowPulse {
          0% {
            filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.9));
          }
        }
      `}</style>
    </div>
  );
}
