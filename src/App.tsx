import { MotionConfig } from "motion/react";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Notes } from "./components/sections/Notes";
import { WhyUs } from "./components/sections/WhyUs";
import { Teacher } from "./components/sections/Teacher";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Community } from "./components/sections/Community";
import { Faq } from "./components/sections/Faq";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { MobileCTA } from "./components/sections/MobileCTA";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Notes />
        <WhyUs />
        <Teacher />
        <HowItWorks />
        <Community />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </MotionConfig>
  );
}
