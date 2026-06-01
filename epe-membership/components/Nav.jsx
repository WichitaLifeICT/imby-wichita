"use client";

import { useState } from "react";
import { Button } from "./ui";

const links = [
  { href: "#what", label: "What is EPE" },
  { href: "#how", label: "How It Works" },
  { href: "#thrive", label: "Thrive Lights" },
  { href: "#levels", label: "Levels" },
  { href: "#partners", label: "Partners" },
  { href: "#benefits", label: "Benefits" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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

        <div className="flex items-center gap-2">
          <a href="#join" className="hidden sm:block">
            <Button variant="navy" className="px-5 py-2.5">
              Become a Member
            </Button>
          </a>

          {/* mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-navy/10 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-cream-200"
              >
                {l.label}
              </a>
            ))}
            <a href="#join" onClick={() => setOpen(false)} className="mt-2">
              <Button variant="navy" className="w-full">
                Become a Member
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
