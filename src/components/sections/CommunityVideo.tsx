"use client";

import { useEffect, useRef } from "react";
import { communityVideo } from "@/content/impact";
import { cn } from "@/lib/utils/cn";

/**
 * Portrait player for the community film. Starts automatically (muted, as
 * browsers require for autoplay) while in view and pauses when scrolled away.
 * Controls stay visible so visitors can unmute.
 */
export function CommunityVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    // Activity keeps hidden routes in the DOM — pause playback when this page is hidden.
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

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
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={`${communityVideo.title} — community film`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <figcaption className="mt-5 text-small text-subtle">{communityVideo.body}</figcaption>
    </figure>
  );
}
