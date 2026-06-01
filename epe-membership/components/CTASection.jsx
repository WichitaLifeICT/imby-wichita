"use client";

import { Button } from "./ui";
import MembershipCard from "./MembershipCard";

export default function CTASection() {
  return (
    <section id="join" className="bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              Start your empowerment journey.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/80">
              Join free, refer a neighbor, or bring your organization into the
              network. Every path starts with one step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="gold">Become a Member</Button>
              <Button variant="outline-light">Refer Someone</Button>
              <Button variant="outline-light">Partner With Us</Button>
            </div>
          </div>

          {/* Placeholder sign-up form — intentionally non-functional. */}
          <div className="rounded-2xl border border-cream/10 bg-white/5 p-7">
            <p className="font-display text-xl font-semibold text-cream">
              Get your EPE Membership Card
            </p>
            <p className="mt-1 text-sm text-navy-300">
              Prototype form — not yet connected.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Field label="Full name" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="ZIP code" placeholder="67202" />
              <Button variant="gold" className="w-full" type="submit">
                Join — it&apos;s free
              </Button>
              <p className="text-center text-xs text-navy-300">
                We&apos;ll never share your information.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:hidden">
          <MembershipCard />
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-cream/90">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-cream/15 bg-navy-700/60 px-4 py-3 text-sm text-cream placeholder:text-navy-300 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </label>
  );
}
