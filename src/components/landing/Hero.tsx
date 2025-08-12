import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/Logo";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <header className="relative overflow-hidden rounded-2xl border shadow-sm bg-[hsl(var(--surface))]">
      {/* Ambient animated blobs */}
      <div className="pointer-events-none absolute inset-0 pp-ambient" aria-hidden />
      <div className="pointer-events-none absolute inset-0 pp-hero-bg opacity-70" aria-hidden />

      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="hidden md:flex items-center gap-3">
            <Link to="#features" className="story-link text-sm">Features</Link>
            <Link to="#how" className="story-link text-sm">How it works</Link>
            <Link to="/interview">
              <Button variant="soft" size="sm">Open App</Button>
            </Link>
          </div>
        </div>

        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            Real‑time AI Voice Interviews, Done Right
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-muted-foreground max-w-2xl"
          >
            Prep Piper helps you run lifelike AI interviews with animated polish, smooth transcripts, and accessible controls — built for speed, clarity, and confidence.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/interview">
              <Button variant="hero" size="lg" className="pp-focus">Start an Interview</Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg">Explore Features</Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Signature microinteraction: subtle parallax gradient */}
      <motion.div
        className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.45), transparent 60%)" }}
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        aria-hidden
      />
    </header>
  );
};

export default Hero;
