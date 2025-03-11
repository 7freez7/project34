import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Outlet, Navigate} from "react-router-dom"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | null): string {
  if (!date) {
    return "Unknown date"; // Or any fallback string
  }

  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}