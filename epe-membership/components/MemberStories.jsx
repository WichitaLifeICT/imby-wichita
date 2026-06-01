import { SectionHeading } from "./ui";
import { stories } from "@/lib/data";

export default function MemberStories() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading
        center
        eyebrow="Member Stories"
        title="Real next steps, taken one at a time."
        intro="Illustrative stories for the prototype — the kind of progress EPE is built to support."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {stories.map((s) => (
          <figure
            key={s.name}
            className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-7 shadow-sm"
          >
            <span className="font-display text-5xl leading-none text-gold">&ldquo;</span>
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-navy">
              {s.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-navy/10 pt-4">
              <p className="text-sm font-semibold text-navy">{s.name}</p>
              <p className="text-xs text-muted">{s.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
