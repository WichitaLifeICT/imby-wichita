import { SectionHeading } from "./ui";
import Icon from "./Icon";
import { levels } from "@/lib/data";

const accents = {
  navy: { bar: "bg-navy", chip: "bg-navy/10 text-navy", dot: "text-navy" },
  sage: { bar: "bg-sage", chip: "bg-sage-light text-sage", dot: "text-sage" },
  gold: { bar: "bg-gold", chip: "bg-gold-soft text-navy", dot: "text-gold" },
};

export default function MembershipLevels() {
  return (
    <section id="levels" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading
        center
        eyebrow="Membership Levels"
        title="Start where you are. Grow as you go."
        intro="Prototype tiers — every member begins as a Starter and unlocks more as they set goals and take action."
      />

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {levels.map((level) => {
          const a = accents[level.accent];
          return (
            <div
              key={level.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${
                level.featured
                  ? "border-sage/40 ring-2 ring-sage/30 lg:-translate-y-3"
                  : "border-navy/10"
              }`}
            >
              <div className={`h-1.5 w-full ${a.bar}`} />
              {level.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-sage px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most common
                </span>
              )}

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-semibold text-navy">
                  {level.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{level.tagline}</p>

                {level.requirements.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                      Requirements
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {level.requirements.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/30" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                    Benefits
                  </p>
                  <ul className="mt-2 space-y-2">
                    {level.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-navy">
                        <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${a.dot}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#join" className="mt-7">
                  <button
                    type="button"
                    className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors ${a.chip} hover:opacity-90`}
                  >
                    Choose {level.name.split(" ")[0]}
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
