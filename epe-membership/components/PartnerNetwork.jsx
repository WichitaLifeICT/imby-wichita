import { SectionHeading } from "./ui";
import Icon from "./Icon";
import { partnerCategories, partners } from "@/lib/data";

export default function PartnerNetwork() {
  return (
    <section id="partners" className="bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          light
          eyebrow="Partner Network"
          title="One front door to a whole ecosystem of support."
          intro="EPE connects members to trusted Wichita organizations across the areas that matter most."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-4 rounded-xl border border-cream/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-light">
                <Icon name={cat.icon} className="h-6 w-6" />
              </span>
              <span className="font-medium text-cream">{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-cream/10 bg-white/5 p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            Example Wichita partners
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="rounded-full bg-cream/10 px-4 py-2 text-sm font-medium text-cream"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-navy-300">
            Placeholder partners shown for the prototype.
          </p>
        </div>
      </div>
    </section>
  );
}
