// shadcn/ui風 Alert
import * as React from "react";

export interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}

export function Alert({ children, variant = "default", className = "" }: AlertProps) {
  const base = "w-full flex items-start gap-2 rounded-lg p-4 border text-sm shadow-sm";
  const color =
    variant === "destructive"
      ? "bg-red-50 border-red-200 text-red-800"
      : "bg-gray-50 border-gray-200 text-gray-800";
  return <div className={`${base} ${color} ${className}`}>{children}</div>;
}
