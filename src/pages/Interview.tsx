import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, StopCircle, Loader2, Play, Pause } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { useInterview } from "@/hooks/useInterview";
import { motion } from "framer-motion";

const Bubble = ({ role, text }: { role: "ai" | "candidate"; text: string }) => (
  <div className={`flex ${role === "ai" ? "justify-start" : "justify-end"}`}>
    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${role === "ai" ? "bg-primary/15" : "bg-muted"}`}>
      {text}
    </div>
  </div>
);

const AudioPlayer = ({ src }: { src?: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play(); else a.pause();
  };
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={toggle} aria-label="Play or pause audio">
        <Play className="hidden group-aria-[pressed=true]:block" />
        <Pause className="block group-aria-[pressed=true]:hidden" />
      </Button>
      <audio ref={audioRef} src={src} className="w-full" controls />
    </div>
  );
};

const Interview = () => {
  const iv = useInterview();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [iv.transcript, iv.interimTranscript]);

  return (
    <main className="min-h-screen py-8">
      <SEO title="Prep Piper — Interview" description="Run a live AI voice interview with Prep Piper." canonical="/interview" />
      <div className="container">
        <div className="mb-6">
          <h1 className="mb-1">Interview</h1>
          <p className="text-muted-foreground">Controls, live transcripts, and audio playback for synthesized speech.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: video placeholders / waveform spaces */}
          <Card className="lg:col-span-2 pp-card">
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="rounded-xl h-40 md:h-56 bg-primary/20 border relative">
                  <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded bg-background/80 border">AI</span>
                </div>
                <div className="rounded-xl h-40 md:h-56 bg-accent/20 border relative">
                  <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded bg-background/80 border">Candidate</span>
                </div>
              </div>
              <div className="mt-4">
                <AudioPlayer src={iv.audioUrl} />
              </div>
            </CardContent>
          </Card>

          {/* Right: transcript */}
          <Card className="pp-card">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2" aria-live="polite" aria-atomic="false">
                {iv.currentQuestion && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    <Bubble role="ai" text={iv.currentQuestion} />
                  </motion.div>
                )}
                {iv.transcript.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    <Bubble role={t.role} text={t.text} />
                  </motion.div>
                ))}
                {iv.interimTranscript && (
                  <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="opacity-70">
                    <Bubble role="candidate" text={iv.interimTranscript} />
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {iv.status === "idle" || iv.status === "completed" ? (
            <Button onClick={iv.startInterview} variant="hero" className="hover-scale">
              <Mic className="mr-1" /> Start Interview
            </Button>
          ) : iv.status === "connecting" ? (
            <Button disabled variant="glow">
              <Loader2 className="mr-2 animate-spin" /> Connecting
            </Button>
          ) : (
            <Button onClick={iv.stopInterview} variant="destructive">
              <StopCircle className="mr-1" /> End Interview
            </Button>
          )}

          <Button variant="secondary" onClick={iv.finalizeAudio} disabled={!iv.status || iv.status === "idle"}>
            Generate Audio
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Interview;
