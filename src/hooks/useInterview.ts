import { useCallback, useMemo, useRef, useState } from "react";

// Types describing backend events we expect to handle
export type InterviewStatus = "idle" | "connecting" | "running" | "completed" | "error";

export interface UseInterviewOptions {
  onStart?: () => void;
  onStop?: () => void;
}

export interface TranscriptEntry {
  role: "ai" | "candidate";
  text: string;
  ts: number; // unix ms
}

/**
 * useInterview — UI-first state container with typed callbacks to connect a WebSocket later.
 * Pass incoming WS events to the exposed handlers (pushInterim, pushFinal, pushAudioChunk, etc.).
 */
export const useInterview = (opts: UseInterviewOptions = {}) => {
  const [status, setStatus] = useState<InterviewStatus>("idle");
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  // Audio assembly from chunked binary payloads
  const audioChunksRef = useRef<BlobPart[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | undefined>();

  // UI actions
  const startInterview = useCallback(() => {
    setStatus("connecting");
    opts.onStart?.();
  }, [opts]);

  const markRunning = useCallback(() => setStatus("running"), []);
  const stopInterview = useCallback(() => {
    opts.onStop?.();
    setStatus("completed");
  }, [opts]);

  // Handlers to be wired to backend messages
  const setQuestion = useCallback((q: string) => setCurrentQuestion(q), []);
  const pushInterim = useCallback((text: string) => setInterimTranscript(text), []);
  const pushFinal = useCallback((role: "ai" | "candidate", text: string) => {
    setTranscript((t) => [...t, { role, text, ts: Date.now() }]);
    setInterimTranscript("");
  }, []);

  const pushAudioChunk = useCallback((chunk: ArrayBuffer | Uint8Array) => {
    audioChunksRef.current.push(new Blob([chunk]));
  }, []);

  const finalizeAudio = useCallback(() => {
    if (!audioChunksRef.current.length) return;
    const url = URL.createObjectURL(new Blob(audioChunksRef.current, { type: "audio/mpeg" }));
    setAudioUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
    audioChunksRef.current = [];
  }, []);

  const api = useMemo(() => ({
    // Outgoing intents
    startInterview,
    stopInterview,

    // Status helpers
    markRunning,

    // Incoming event handlers to plug to your WS client
    setQuestion,
    pushInterim, // interimTranscript
    pushFinal,   // transcript
    pushAudioChunk, // audioChunk
    finalizeAudio,  // audioGenerated

    // State for UI
    status,
    currentQuestion,
    interimTranscript,
    transcript,
    audioUrl,
  }), [startInterview, stopInterview, markRunning, setQuestion, pushInterim, pushFinal, pushAudioChunk, finalizeAudio, status, currentQuestion, interimTranscript, transcript, audioUrl]);

  return api;
};
