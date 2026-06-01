import { Button } from "./ui";

const links = [
  { href: "#what", label: "What is EPE" },
  { href: "#how", label: "How It Works" },
  { href: "#levels", label: "Levels" },
  { href: "#partners", label: "Partners" },
  { href: "#benefits", label: "Benefits" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-base font-bold text-gold">
            E
          </span>
          <span className="font-display text-lg font-semibold text-navy">
            Wichita EPE
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-navy"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#join">
          <Button variant="navy" className="px-5 py-2.5">
            Become a Member
          </Button>
        </a>
      </nav>
    </header>
  );
}
