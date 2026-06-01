// Mock EPE Membership Card — purely visual placeholder for the prototype.
export default function MembershipCard({ className = "" }) {
  return (
    <div
      className={`relative aspect-[1.6/1] w-full max-w-md overflow-hidden rounded-2xl bg-navy p-6 text-cream shadow-2xl ring-1 ring-white/10 ${className}`}
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-sage/20 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Every Person Empowered
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">
              EPE Membership
            </p>
          </div>
          {/* chip */}
          <div className="mt-1 h-8 w-11 rounded-md bg-gradient-to-br from-gold-light to-gold" />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-navy-300">
            Member
          </p>
          <p className="font-display text-lg font-medium tracking-wide">
            Your Name Here
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-navy-300">
                Level
              </p>
              <p className="text-sm font-medium text-gold-light">
                Starter Member
              </p>
            </div>
            <p className="font-mono text-xs tracking-widest text-cream/70">
              WICHITA · 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
