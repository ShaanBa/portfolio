import React from 'react';

export interface HeroProps {
  kicker?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{ label: string; value: string }>;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  kicker = "SHAAN BAWA // SYSTEMS & FULL-STACK 01",
  title = "Building resilient software engines.",
  subtitle = "Full-stack & backend software engineer specializing in dual-database architectures, concurrent Postgres transaction engines, and high-reliability API systems.",
  stats = [
    { label: "EXPERIENCE", value: "3+ YEARS" },
    { label: "PROJECTS DEPLOYED", value: "12 ARCHITECTURES" },
    { label: "CORE FOCUS", value: "CONCURRENCY & DB" },
    { label: "STATUS", value: "AVAILABLE 2026" }
  ],
  primaryCtaText = "INITIALIZE CONTACT",
  primaryCtaUrl = "#contact",
  secondaryCtaText = "VIEW LEDGER",
  secondaryCtaUrl = "#work"
}) => {
  const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

  return (
    <section className="relative w-full bg-[#082c1d] text-[#f5f2eb] border-l border-r border-b border-emerald-900/40 rounded-none overflow-hidden max-w-[1720px] mx-auto">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.045]"
        style={{ backgroundImage: `url("${noiseDataUri}")` }}
      />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-emerald-900/50">
        {/* Left Column: Massive Editorial Display */}
        <div className="col-span-12 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-emerald-900/50 p-8 lg:p-16 flex flex-col justify-between bg-[#082c1d]">
          <div>
            {/* Meta Label */}
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-2 h-2 bg-[#00ff87] rounded-none inline-block animate-pulse" />
              <span className="font-mono text-[11px] lg:text-[12px] tracking-[0.25em] uppercase text-[#d4af37]">
                {kicker}
              </span>
            </div>

            {/* Display Title */}
            <h1 className="font-serif text-[72px] sm:text-[96px] xl:text-[128px] 2xl:text-[144px] leading-[0.88] tracking-tighter font-light text-[#f5f2eb] mb-8 select-none">
              {title}
            </h1>
          </div>

          {/* Subtitle / Body Copy */}
          <div className="pt-8 border-t border-emerald-900/50">
            <p className="font-sans text-base lg:text-lg leading-relaxed text-[#dcd8ce] max-w-xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Column: Architectural Telemetry & CTAs */}
        <div className="col-span-12 lg:col-span-5 p-8 lg:p-16 flex flex-col justify-between bg-[#06140e]">
          <div>
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-emerald-900/50">
              <span className="font-mono text-[11px] lg:text-[12px] tracking-[0.25em] uppercase text-[#d4af37]">
                TELEMETRY // SPEC 1.0.0
              </span>
              <span className="font-mono text-[11px] text-[#00ff87] tracking-widest uppercase">
                [ONLINE]
              </span>
            </div>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-5 bg-[#0b3826] border border-[#d4af37]/20 rounded-none flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[#dcd8ce] mb-2">
                    0{idx + 1} // {stat.label}
                  </span>
                  <span className="font-mono text-lg lg:text-xl font-bold tracking-tight text-[#f5f2eb]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-4 pt-8 border-t border-emerald-900/50">
            <a
              href={primaryCtaUrl}
              className="w-full flex items-center justify-between px-8 py-5 bg-[#082c1d] border border-[#d4af37] text-[#f5f2eb] font-mono text-xs lg:text-sm tracking-[0.2em] uppercase rounded-none transition-all hover:bg-[#d4af37] hover:text-[#06140e] group"
            >
              <span>{primaryCtaText}</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
            
            <a
              href={secondaryCtaUrl}
              className="w-full flex items-center justify-between px-8 py-5 bg-transparent border border-emerald-900/50 text-[#dcd8ce] font-mono text-xs lg:text-sm tracking-[0.2em] uppercase rounded-none transition-all hover:border-[#d4af37]/40 hover:text-[#f5f2eb] group"
            >
              <span>{secondaryCtaText}</span>
              <span className="transition-transform group-hover:translate-x-1">&darr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
