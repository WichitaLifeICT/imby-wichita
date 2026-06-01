import { SectionHeading } from "./ui";
import Icon from "./Icon";

const points = [
  "Set goals that matter to you",
  "Track your progress over time",
  "Access partner resources",
  "Unlock deeper support as you take action",
];

export default function WhatIsEPE() {
  return (
    <section id="what" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          eyebrow="What is EPE Membership?"
          title="A free pathway to begin your empowerment journey."
          intro="EPE Membership is a free pathway for anyone in Wichita to begin an empowerment journey. Members can set goals, track progress, access partner resources, and unlock deeper support as they take action."
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white/60 p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-light text-sage">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-navy">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
