import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ExcusesSection from "@/components/ExcusesSection";
import MechanismSection from "@/components/MechanismSection";
import MissionsGrid from "@/components/MissionsGrid";
import ProgressSection from "@/components/ProgressSection";
import PrivacySection from "@/components/PrivacySection";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ExcusesSection />
      <MechanismSection />
      <MissionsGrid />
      <ProgressSection />
      <PrivacySection />
      <HowItWorks />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </>
  );
}
