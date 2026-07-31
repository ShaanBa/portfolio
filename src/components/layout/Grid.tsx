import React from 'react';

export interface GridItem {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics?: string[];
  techStack?: string[];
  linkUrl?: string;
  colSpan?: 'full' | 'half' | 'third' | 'two-thirds';
}

export interface GridProps {
  sectionNumber?: string;
  sectionTitle?: string;
  metaLabel?: string;
  items?: GridItem[];
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  sectionNumber = "03",
  sectionTitle = "ARCHITECTURAL PROJECTS",
  metaLabel = "INDEX // SYSTEM ARCHITECTURE LEDGER",
  items = [],
  children
}) => {
  const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

  const getColSpanClass = (span?: string) => {
    switch (span) {
      case 'full':
        return 'col-span-12';
      case 'half':
        return 'col-span-12 lg:col-span-6';
      case 'third':
        return 'col-span-12 lg:col-span-4';
      case 'two-thirds':
        return 'col-span-12 lg:col-span-8';
      default:
        return 'col-span-12 lg:col-span-6';
    }
  };

  return (
    <section className="relative w-full bg-[#082c1d] text-[#f5f2eb] border-l border-r border-b border-emerald-900/40 rounded-none py-16 lg:py-24 max-w-[1720px] mx-auto overflow-hidden">
      {/* Background Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.045]"
        style={{ backgroundImage: `url("${noiseDataUri}")` }}
      />

      <div className="relative z-20 px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-900/50 pb-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="font-mono text-[11px] lg:text-[12px] bg-[#06140e] text-[#00ff87] border border-emerald-900/50 px-2 py-0.5 rounded-none">
                {sectionNumber}
              </span>
              <span className="font-mono text-[11px] lg:text-[12px] tracking-[0.25em] uppercase text-[#d4af37]">
                {metaLabel}
              </span>
            </div>
            <h2 className="font-serif text-[42px] lg:text-[56px] leading-[0.95] tracking-tight text-[#f5f2eb]">
              {sectionTitle}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-[11px] tracking-[0.2em] uppercase text-[#dcd8ce]">
            ASYMMETRIC GRID // EDITORIAL EMBED
          </div>
        </div>

        {/* Children pass-through or default grid items */}
        {children ? (
          <div className="w-full">
            {children}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-0 border-t border-l border-emerald-900/50">
            {items.map((item, idx) => (
              <article
                key={item.id || idx}
                className={`${getColSpanClass(item.colSpan)} border-r border-b border-emerald-900/50 p-8 lg:p-12 bg-[#0b3826] hover:bg-[#06140e] transition-colors rounded-none flex flex-col justify-between group relative`}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#d4af37]">
                      0{idx + 1} // {item.category}
                    </span>
                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        className="font-mono text-xs text-[#00ff87] hover:text-[#d4af37] transition-colors"
                      >
                        [EXPLORE &rarr;]
                      </a>
                    )}
                  </div>

                  <h3 className="font-serif text-[32px] lg:text-[40px] leading-tight text-[#f5f2eb] mb-4 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-base leading-relaxed text-[#dcd8ce] mb-8">
                    {item.description}
                  </p>
                </div>

                <div>
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="mb-6 p-4 bg-[#06140e] border border-[#d4af37]/20 rounded-none space-y-1">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="font-mono text-xs text-[#00ff87] tracking-wider">
                          &gt; {m}
                        </div>
                      ))}
                    </div>
                  )}

                  {item.techStack && item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-900/50">
                      {item.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[10px] uppercase tracking-wider text-[#dcd8ce] bg-[#082c1d] border border-emerald-900/50 px-2 py-1 rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Grid;
