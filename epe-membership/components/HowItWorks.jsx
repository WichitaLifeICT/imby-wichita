import { SectionHeading } from "./ui";
import Icon from "./Icon";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how" className="bg-dots bg-cream-200/50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          center
          eyebrow="How It Works"
          title="Three steps to get started."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-navy/10 bg-white p-7 shadow-sm"
            >
              <span className="absolute right-6 top-6 font-display text-4xl font-semibold text-cream-200">
                {step.number}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
