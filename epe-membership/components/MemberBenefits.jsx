import { SectionHeading } from "./ui";
import Icon from "./Icon";
import { benefits } from "@/lib/data";

export default function MemberBenefits() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading
        center
        eyebrow="Member Benefits"
        title="What you can do as a member."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-navy transition-colors group-hover:bg-gold group-hover:text-navy">
              <Icon name={b.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy">
              {b.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
