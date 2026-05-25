const STATS = [
  ["5+", "Years Experience"],
  ["50+", "Systems Secured"],
  ["3", "Security Certifications"],
  ["10+", "Technologies Mastered"],
  ["3", "Countries Worked In"],
  ["100%", "Client Satisfaction"],
];

export function TrustBar() {
  const items = [...STATS, ...STATS, ...STATS];
  return (
    <div className="h-16 overflow-hidden border-y border-[--border-soft] bg-[--bg-secondary] marquee-mask">
      <div className="flex h-full items-center gap-10 animate-marquee whitespace-nowrap">
        {items.map(([num, label], i) => (
          <div key={i} className="flex items-center gap-4 px-2">
            <span className="font-display text-lg font-bold text-cyan">{num}</span>
            <span className="text-sm text-[--text-secondary]">{label}</span>
            <span className="text-[--text-muted]">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
