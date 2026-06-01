export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-center sm:flex-row sm:px-8 sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-display text-sm font-bold text-gold">
            E
          </span>
          <span className="text-sm text-muted">
            Wichita EPE Membership — Every Person Empowered.
          </span>
        </div>
        <p className="text-xs text-navy-300">
          Prototype · For demonstration only · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
