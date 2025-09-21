'use client';
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import React from 'react';

export type IconName = keyof typeof LucideIcons;

interface HexagonBadgeProps {
  iconName: IconName;
  label: string;
  className?: string;
  isUnlocked?: boolean;
}

export const HexagonBadge: React.FC<HexagonBadgeProps> = ({ iconName, label, className, isUnlocked = true }) => {
  const Icon = LucideIcons[iconName] as React.ElementType;

  return (
    <div className={cn("flex flex-col items-center gap-2 group", className)}>
      <div className={cn(
        "relative w-[120px] h-[138px] flex items-center justify-center transition-all duration-300 group-hover:scale-110",
        !isUnlocked && "grayscale opacity-50"
      )}>
        <svg
          className="absolute w-full h-full drop-shadow-md"
          viewBox="0 0 100 115.47"
          >
          <defs>
            <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
            </linearGradient>
             <linearGradient id="hex-gradient-locked" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--border))', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M50 0 L100 28.87 L100 86.6 L50 115.47 L0 86.6 L0 28.87 Z"
            fill={isUnlocked ? "url(#hex-gradient)" : "url(#hex-gradient-locked)"}
          />
        </svg>
        <div className={cn("relative z-10", isUnlocked ? "text-primary-foreground" : "text-muted-foreground")}>
          {Icon ? <Icon className="w-10 h-10" /> : <LucideIcons.HelpCircle className="w-10 h-10" />}
        </div>
      </div>
      <span className={cn("font-semibold text-sm text-center w-[120px]", !isUnlocked && "text-muted-foreground")}>{label}</span>
    </div>
  );
};
