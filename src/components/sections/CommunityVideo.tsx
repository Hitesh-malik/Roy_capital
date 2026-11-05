"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { communityVideo } from "@/content/impact";
import { durations, ease } from "@/config/motion";
import { cn } from "@/lib/utils/cn";
import { CoreFallback } from "@/components/visuals/CoreFallback";

const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/**
 * Cinematic portrait player for the community film. The video only
 * downloads once the visitor presses play.
 */
export function CommunityVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  // Activity keeps hidden routes in the DOM — pause playback when this page is hidden.
  useLayoutEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, []);

  const start = () => {
    setPlaying(true);
    void videoRef.current?.play().catch(() => setPlaying(false));
  };

  return (
    <figure className={cn("relative mx-auto w-full max-w-[400px]", className)}>
      <div className="relative">
      {/* Architectural frame ticks */}
      <span aria-hidden className="absolute -top-3 -left-3 size-6 border-t border-l border-accent-soft/50" />
      <span aria-hidden className="absolute -right-3 -bottom-3 size-6 border-r border-b border-accent-soft/50" />

      <div
        className="relative overflow-hidden rounded-media border border-line bg-bg-2 shadow-lift"
        style={{ aspectRatio: `${communityVideo.width} / ${communityVideo.height}` }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={communityVideo.src}
          preload="none"
          playsInline
          controls={playing}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setPlaying(false)}
          aria-label={`${communityVideo.title} — community film`}
        >
          Your browser does not support the video tag.
        </video>

        <AnimatePresence>
          {!playing && (
            <motion.button
              type="button"
              onClick={start}
              className="group absolute inset-0 flex flex-col justify-between p-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: durations.medium, ease: ease.premium }}
              aria-label={`Play film: ${communityVideo.title}`}
            >
              <span aria-hidden className="absolute inset-0 -z-0 bg-linear-to-b from-arch via-bg-2 to-bg" />
              <span aria-hidden className="arch-grid absolute inset-0 opacity-50" />
              <span aria-hidden className="absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2 scale-125 opacity-60">
                <CoreFallback />
              </span>

              <span className="relative text-label font-medium uppercase text-accent-soft">{communityVideo.label}</span>

              <span className="relative grid place-items-center">
                <span className="grid size-20 place-items-center rounded-full border border-fg/30 bg-bg/40 backdrop-blur-md transition-[transform,background-color,border-color] duration-(--rc-motion-medium) ease-premium group-hover:scale-110 group-hover:border-accent group-hover:bg-accent">
                  <Play className="ml-1 size-6 fill-current text-fg transition-colors group-hover:text-on-accent" strokeWidth={1.5} />
                </span>
              </span>

              <span className="relative flex items-end justify-between gap-4">
                <span className="font-heading text-h4 font-semibold text-fg">Play film</span>
                {duration !== null && <span className="text-small tabular-nums text-muted">{formatDuration(duration)}</span>}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      </div>
      <figcaption className="mt-5 text-small text-subtle">{communityVideo.body}</figcaption>
    </figure>
  );
}
