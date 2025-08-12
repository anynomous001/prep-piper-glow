import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mic, Sparkles, AudioLines, MessagesSquare } from "lucide-react";

const items = [
  {
    title: "AI‑generated questions",
    Icon: Sparkles,
    desc: "Thoughtful prompts with smooth animated transitions and context awareness.",
  },
  {
    title: "Live transcripts",
    Icon: MessagesSquare,
    desc: "Interim + final updates with auto‑scroll and accessible reading order.",
  },
  {
    title: "Crystal audio",
    Icon: AudioLines,
    desc: "Responsive playback with graceful loading and chunked audio support.",
  },
  {
    title: "One‑tap controls",
    Icon: Mic,
    desc: "Keyboard‑friendly mic and session actions with clear states.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="mt-16">
      <div className="mb-6">
        <h2>Why Prep Piper</h2>
        <p className="text-muted-foreground max-w-2xl">Built for realistic, low‑latency interviews. Clean, animated, and accessible by design.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, Icon, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="h-full"
          >
            <Card className="pp-card h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-base">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {desc}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
