"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
    const resolved = stored ?? current;
    setTheme(resolved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  // 마운트 전: 레이아웃 시프트 방지를 위해 동일한 크기의 빈 자리 유지
  if (!mounted) {
    return (
      <div className="w-[80px] h-[36px] rounded-lg" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 h-[36px] rounded-lg text-[12px] font-medium border cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      style={{
        fontFamily: "var(--font-chakra-petch)",
        background: "var(--c-toggle-bg)",
        borderColor: "var(--c-toggle-border)",
        color: "var(--c-toggle-text)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        letterSpacing: "0.05em",
      }}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span
        style={{ color: "var(--c-toggle-hover-text)", transition: "none" }}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
