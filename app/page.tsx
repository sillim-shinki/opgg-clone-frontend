import SearchBar from "./_components/SearchBar";
import ThemeToggle from "./_components/ThemeToggle";

const TRENDING_SUMMONERS = [
  "Hide on bush",
  "흑잭장",
  "야동공유",
  "김단검 김순보",
  "JustLikeThatKR",
  "우리꽐술연",
];

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--c-bg-page)" }}
    >
      {/* ─── Theme toggle ─── */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      {/* ─── Background atmosphere ─── */}

      {/* Teal orb — top-left */}
      <div
        className="absolute pointer-events-none rounded-full no-theme-transition"
        style={{
          top: "-18%",
          left: "-12%",
          width: "650px",
          height: "650px",
          background: "#0ac8b9",
          opacity: "var(--c-orb-teal-o)",
          filter: "blur(130px)",
          animation: "float-a 22s ease-in-out infinite",
        }}
      />

      {/* Gold orb — bottom-right */}
      <div
        className="absolute pointer-events-none rounded-full no-theme-transition"
        style={{
          bottom: "-22%",
          right: "-14%",
          width: "750px",
          height: "750px",
          background: "#c89b3c",
          opacity: "var(--c-orb-gold-o)",
          filter: "blur(160px)",
          animation: "float-b 28s ease-in-out infinite",
        }}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--c-dot-grid) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* SVG noise grain */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: "var(--c-noise-o)" }}
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Decorative hexagon rings — top-right */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "5%",
          opacity: "var(--c-hex-teal-o)",
        }}
        width="320"
        height="360"
        viewBox="0 0 320 360"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="160,8 308,92 308,268 160,352 12,268 12,92"
          stroke="#0ac8b9"
          strokeWidth="1"
        />
        <polygon
          points="160,40 280,108 280,244 160,312 40,244 40,108"
          stroke="#0ac8b9"
          strokeWidth="0.5"
        />
      </svg>

      {/* Decorative hexagon ring — bottom-left */}
      <svg
        className="absolute pointer-events-none"
        style={{
          bottom: "8%",
          left: "3%",
          opacity: "var(--c-hex-gold-o)",
        }}
        width="240"
        height="280"
        viewBox="0 0 240 280"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="120,8 228,68 228,212 120,272 12,212 12,68"
          stroke="#c89b3c"
          strokeWidth="1"
        />
      </svg>

      {/* ─── Hero content ─── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[620px]">
        {/* Eyebrow label */}
        <div
          className="flex items-center gap-3 mb-8 text-[#0ac8b9] text-[11px] uppercase tracking-[0.38em]"
          style={{
            fontFamily: "var(--font-chakra-petch)",
            animation: "fade-up 0.6s ease 0.1s both",
          }}
        >
          <span className="block h-px w-10 bg-current opacity-40" />
          소환사 전적 검색
          <span className="block h-px w-10 bg-current opacity-40" />
        </div>

        {/* Logo / Brand */}
        <h1
          className="leading-none select-none mb-4 text-center"
          style={{ animation: "fade-up 0.6s ease 0.2s both" }}
        >
          <span
            className="block text-[44px] font-bold"
            style={{
              fontFamily: "var(--font-chakra-petch)",
              letterSpacing: "0.06em",
              color: "var(--c-text)",
            }}
          >
            신림신기
          </span>
          <span
            className="block text-[76px] font-bold leading-none"
            style={{
              fontFamily: "var(--font-chakra-petch)",
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #0ac8b9 0%, #06a89b 50%, #c89b3c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            .GG
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[14px] mb-10 tracking-wide text-center"
          style={{
            fontFamily: "var(--font-jakarta)",
            color: "var(--c-muted)",
            animation: "fade-up 0.6s ease 0.3s both",
          }}
        >
          전적을 분석하고 승리를 설계하세요
        </p>

        {/* Search bar */}
        <div
          className="w-full"
          style={{ animation: "fade-up 0.6s ease 0.4s both" }}
        >
          <SearchBar />
        </div>

        {/* Trending summoners */}
        <div
          className="mt-6 flex flex-wrap items-center gap-2 justify-center"
          style={{ animation: "fade-up 0.6s ease 0.52s both" }}
        >
          <span
            className="text-[11px] mr-1 tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-chakra-petch)",
              color: "var(--c-muted-2)",
            }}
          >
            인기 소환사
          </span>
          {TRENDING_SUMMONERS.map((name) => (
            <button
              key={name}
              className="trend-chip px-3 py-1 rounded-full text-[12px] border cursor-pointer transition-colors duration-200"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{ animation: "fade-up 0.6s ease 0.65s both" }}
        >
          <span
            className="block h-px w-16"
            style={{ backgroundColor: "var(--c-border)" }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--font-chakra-petch)",
              color: "var(--c-muted-3)",
            }}
          >
            League of Legends
          </span>
          <span
            className="block h-px w-16"
            style={{ backgroundColor: "var(--c-border)" }}
          />
        </div>
      </div>
    </main>
  );
}
