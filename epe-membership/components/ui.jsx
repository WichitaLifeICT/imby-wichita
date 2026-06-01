// Small shared UI primitives used across sections.

const variants = {
  gold: "bg-gold text-navy hover:bg-gold-light",
  navy: "bg-navy text-cream hover:bg-navy-700",
  outline:
    "bg-transparent text-navy ring-1 ring-navy/20 hover:ring-navy/50 hover:text-navy",
  "outline-light":
    "bg-transparent text-cream ring-1 ring-cream/30 hover:ring-cream/70",
};

export function Button({ children, variant = "gold", className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionHeading({ eyebrow, title, intro, light = false, center = false }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold-light" : "text-sage"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold leading-tight sm:text-4xl ${
          light ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-cream/80" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
