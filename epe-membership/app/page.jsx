import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIsEPE from "@/components/WhatIsEPE";
import HowItWorks from "@/components/HowItWorks";
import MembershipLevels from "@/components/MembershipLevels";
import PartnerNetwork from "@/components/PartnerNetwork";
import MemberBenefits from "@/components/MemberBenefits";
import WhyThisMatters from "@/components/WhyThisMatters";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIsEPE />
        <HowItWorks />
        <MembershipLevels />
        <PartnerNetwork />
        <MemberBenefits />
        <WhyThisMatters />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
