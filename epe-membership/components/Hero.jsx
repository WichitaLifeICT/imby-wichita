import { Button } from "./ui";
import MembershipCard from "./MembershipCard";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="bg-dots absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-light px-4 py-1.5 text-xs font-semibold text-sage">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Every Person Empowered · Wichita
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Wichita EPE Membership
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A simple way for people, partners, and neighbors to take the next
            step toward stability, progress, and contribution.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#join">
              <Button variant="gold">Become a Member</Button>
            </a>
            <a href="#benefits">
              <Button variant="outline">Explore Member Benefits</Button>
            </a>
          </div>

          <p className="mt-8 max-w-md text-sm italic text-navy-300">
            “Every person empowered to transform their life — and help others
            do the same.”
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <MembershipCard className="rotate-[-3deg]" />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cream">
              Membership Card · placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
