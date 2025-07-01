// shadcn/ui風 Badge
import * as React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  let base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  let color =
    variant === "destructive"
      ? "bg-red-100 text-red-800 border border-red-200"
      : variant === "secondary"
      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
      : variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white"
      : "bg-blue-100 text-blue-800 border border-blue-200";
  return <span className={`${base} ${color} ${className}`}>{children}</span>;
}
