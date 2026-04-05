"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const REGIONS = [
  { value: "kr", label: "KR" },
  { value: "na1", label: "NA" },
  { value: "euw1", label: "EUW" },
  { value: "eune1", label: "EUNE" },
  { value: "jp1", label: "JP" },
  { value: "br1", label: "BR" },
  { value: "la1", label: "LAN" },
  { value: "la2", label: "LAS" },
  { value: "oc1", label: "OCE" },
  { value: "tr1", label: "TR" },
  { value: "ru", label: "RU" },
];

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none shrink-0"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="var(--c-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SearchBar() {
  const [region, setRegion] = useState("kr");
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/summoner/${region}/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex items-center h-[58px] rounded-xl overflow-hidden transition-shadow duration-300"
        style={{
          background: "var(--c-bg-surface)",
          border: `1px solid ${isFocused ? "rgba(10, 200, 185, 0.55)" : "var(--c-border)"}`,
          boxShadow: isFocused
            ? "0 0 0 1px rgba(10,200,185,0.12), 0 0 40px rgba(10,200,185,0.1), inset 0 0 24px rgba(10,200,185,0.025)"
            : "none",
        }}
      >
        {/* Region selector */}
        <div
          className="flex items-center gap-2 px-4 shrink-0 h-full border-r"
          style={{ borderColor: "var(--c-border)" }}
        >
          <div
            className="w-[7px] h-[7px] rounded-full flex-shrink-0"
            style={{ background: "#0ac8b9", opacity: 0.75 }}
          />
          <div className="relative flex items-center">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="appearance-none bg-transparent text-[13px] font-semibold cursor-pointer outline-none pr-4"
              style={{
                fontFamily: "var(--font-chakra-petch)",
                color: "var(--c-muted)",
              }}
            >
              {REGIONS.map((r) => (
                <option
                  key={r.value}
                  value={r.value}
                  style={{
                    background: "var(--c-bg-surface)",
                    color: "var(--c-text)",
                  }}
                >
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="소환사명 + #KR1"
          className="search-input flex-1 h-full px-5 bg-transparent text-[15px] outline-none"
          style={{
            fontFamily: "var(--font-jakarta)",
            color: "var(--c-text)",
          }}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Search button */}
        <button
          type="submit"
          className="h-full px-6 flex items-center gap-2 shrink-0 text-[13px] font-semibold tracking-wider hover:brightness-110 active:scale-95 transition-transform cursor-pointer"
          style={{
            fontFamily: "var(--font-chakra-petch)",
            background: "linear-gradient(135deg, #0ac8b9 0%, #089488 100%)",
            color: "#070b11",
            letterSpacing: "0.06em",
          }}
        >
          <SearchIcon />
          검색
        </button>
      </div>
    </form>
  );
}
