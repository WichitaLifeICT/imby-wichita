// ============================================================
// Placeholder data for the Wichita EPE Membership prototype.
// All copy lives here so sections stay easy to edit and iterate.
// ============================================================

export const steps = [
  {
    number: "01",
    title: "Join",
    body: "Get your EPE Membership Card and start your journey. It's free and open to anyone in Wichita.",
    icon: "card",
  },
  {
    number: "02",
    title: "Set Goals",
    body: "Use tools like Thrive Lights to identify what matters most, set goals, and track your progress over time.",
    icon: "target",
  },
  {
    number: "03",
    title: "Unlock Support",
    body: "As members work, set goals, and make progress, they may unlock partner benefits like training, savings support, transportation help, or homeownership pathways.",
    icon: "unlock",
  },
];

export const levels = [
  {
    name: "Starter Member",
    tagline: "For anyone ready to begin.",
    accent: "navy",
    requirements: [],
    benefits: [
      "EPE Membership Card",
      "Access to basic resources",
      "Invitations to community opportunities",
    ],
    featured: false,
  },
  {
    name: "Progress Member",
    tagline: "For members setting goals and tracking progress.",
    accent: "sage",
    requirements: [
      "Set goals",
      "Track progress",
      "Engage with a partner or support tool",
    ],
    benefits: ["Thrive Lights access", "Goal support", "Partner referrals"],
    featured: true,
  },
  {
    name: "Gold Member",
    tagline: "For members actively working, growing, and contributing.",
    accent: "gold",
    requirements: [
      "Working or pursuing work",
      "Setting goals",
      "Tracking progress",
      "Referred or verified by a partner organization",
    ],
    benefits: [
      "Premium partner benefits",
      "Training and education pathways",
      "Matching savings opportunities",
      "Transportation support",
      "Homeownership pathways",
    ],
    featured: false,
  },
];

export const partnerCategories = [
  { label: "Workforce & Training", icon: "briefcase" },
  { label: "Financial Coaching", icon: "wallet" },
  { label: "Transportation", icon: "bus" },
  { label: "Housing & Homeownership", icon: "home" },
  { label: "Family Stability", icon: "family" },
  { label: "Community Contribution", icon: "heart" },
];

// Example Wichita partners — placeholders for the prototype.
export const partners = [
  "WSU Tech",
  "Thrive Lights",
  "Family Promise",
  "Hope CDC",
  "Hope for the Hood",
  "Empower",
  "Create Campaign",
];

// Placeholder member stories for the prototype.
export const stories = [
  {
    quote:
      "I set one goal — get my license back. EPE connected me to a ride program and a coach. Six months later I'm driving to a job I actually like.",
    name: "Marcus T.",
    detail: "Progress Member · North End",
  },
  {
    quote:
      "The card made it feel real. Like someone in Wichita was actually rooting for me to make it.",
    name: "Dana R.",
    detail: "Gold Member · Planeview",
  },
  {
    quote:
      "I started to get help. Now I mentor two new members. That's the part nobody tells you about — you get to give back.",
    name: "Olivia M.",
    detail: "Gold Member · Delano",
  },
];

export const benefits = [
  {
    title: "Set & track personal goals",
    body: "Name where you're headed and watch your progress add up, one step at a time.",
    icon: "target",
  },
  {
    title: "Build financial stability",
    body: "Connect with coaching and matching savings opportunities that grow your foundation.",
    icon: "wallet",
  },
  {
    title: "Access training & career pathways",
    body: "Find education and workforce programs that open doors to better work.",
    icon: "briefcase",
  },
  {
    title: "Get connected to transportation",
    body: "Reliable ways to get to work, school, and appointments without the stress.",
    icon: "bus",
  },
  {
    title: "Explore homeownership pathways",
    body: "Take real steps toward owning a home and putting down roots in Wichita.",
    icon: "home",
  },
  {
    title: "Contribute back to community",
    body: "Once you've grown, help a neighbor take their next step too.",
    icon: "heart",
  },
];
