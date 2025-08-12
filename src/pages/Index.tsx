import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { SEO } from "@/components/shared/SEO";

const Index = () => {
  return (
    <main className="min-h-screen py-10">
      <SEO title="Prep Piper — AI Voice Interviews" description="Prep Piper is a modern, animated, and accessible AI voice interview platform." canonical="/" />
      <div className="container space-y-16">
        <Hero />
        <Features />
      </div>
    </main>
  );
};

export default Index;
