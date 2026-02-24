import { Label } from "@/components/ui/label";

import { LaunchCarousel } from "./carousel";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const FitBodyLogoSection = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <img src="/logo.svg" alt="Fit Body Logo" className="h-auto w-36" />
    <Label className="text-primary font-sans text-5xl tracking-tighter italic">
      <span className="font-bold">FIT</span>BODY
    </Label>
  </div>
);

const WelcomeSection = () => (
  <div className="mb-12 flex flex-col items-center justify-center gap-4">
    <AnimatePresence mode="wait">
      <motion.div
        key="welcome"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <Label className="text-primary font-serif text-2xl tracking-tighter">
          Bem-vindo ao
        </Label>
      </motion.div>
    </AnimatePresence>
    <FitBodyLogoSection />
  </div>
);

export function LaunchPage() {
  const [showStep, setShowStep] = useState<"logo" | "carousel">("logo");

  useEffect(() => {
    const timers = [setTimeout(() => setShowStep("carousel"), 4000)];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <AnimatePresence mode="wait">
        {showStep === "logo" && (
          <motion.div key="logo">
            <WelcomeSection />
          </motion.div>
        )}
        {showStep === "carousel" && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <LaunchCarousel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
