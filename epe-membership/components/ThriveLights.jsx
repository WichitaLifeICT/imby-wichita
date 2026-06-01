"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "./ui";

// Life domains a member reflects on. Each "light" cycles through three states.
const DOMAINS = [
  "Housing",
  "Income & Work",
  "Health",
  "Transportation",
  "Family & Relationships",
  "Money & Savings",
  "Education",
  "Community",
];

const STATES = [
  { key: "support", label: "Needs support", dot: "bg-coral", ring: "ring-coral/30", text: "text-coral" },
  { key: "working", label: "Working on it", dot: "bg-gold", ring: "ring-gold/40", text: "text-gold" },
  { key: "thriving", label: "Thriving", dot: "bg-sage", ring: "ring-sage/40", text: "text-sage" },
];

// start everyone mid-journey so the demo feels alive
const initial = DOMAINS.map((_, i) => (i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2));

export default function ThriveLights() {
  const [states, setStates] = useState(initial);

  const cycle = (i) =>
    setStates((prev) => prev.map((s, idx) => (idx === i ? (s + 1) % 3 : s)));

  const thrivingPct = useMemo(() => {
    const score = states.reduce((sum, s) => sum + s, 0); // 0..2 each
    return Math.round((score / (states.length * 2)) * 100);
  }, [states]);

  return (
    <section id="thrive" className="bg-dots bg-cream-200/50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Thrive Lights"
          title="See your whole life at a glance."
          intro="Thrive Lights is a simple self-check across the areas that matter. Tap a light to mark where you are today — then set goals to move it forward. (Try it.)"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {/* the lights grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DOMAINS.map((domain, i) => {
              const state = STATES[states[i]];
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => cycle(i)}
                  className={`flex flex-col items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 text-left ring-2 transition-all hover:-translate-y-0.5 ${state.ring}`}
                >
                  <span className={`h-4 w-4 rounded-full ${state.dot} shadow-sm`} />
                  <span className="text-sm font-semibold leading-tight text-navy">
                    {domain}
                  </span>
                  <span className={`text-xs font-medium ${state.text}`}>
                    {state.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* progress summary */}
          <div className="rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
              Overall progress
            </p>
            <p className="mt-1 font-display text-5xl font-semibold text-navy">
              {thrivingPct}%
            </p>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-cream-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-sage transition-all duration-500"
                style={{ width: `${thrivingPct}%` }}
              />
            </div>

            <ul className="mt-6 space-y-2">
              {STATES.map((s) => (
                <li key={s.key} className="flex items-center gap-2.5 text-sm text-muted">
                  <span className={`h-3 w-3 rounded-full ${s.dot}`} />
                  {s.label}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-navy-300">
              Prototype demo — progress isn&apos;t saved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
