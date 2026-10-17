"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Scroll-scrubbed product film. Two looks:
//  - "card" (default): warm-graded film in a rounded card that grows as you
//    scroll, on the page's own background so it blends with the photos.
//  - "full" (v1): edge-to-edge pinned film on black. Preview with ?film=v1.
// The mp4s have a keyframe on every frame so seeking backwards stays smooth.

const SOURCES = {
  card: { big: "/video/aiwan-warm.mp4", small: "/video/aiwan-warm-720.mp4", poster: "/video/aiwan-warm-poster.jpg" },
  full: { big: "/video/aiwan-scroll.mp4", small: "/video/aiwan-scroll-720.mp4", poster: "/video/aiwan-scroll-poster.jpg" },
};

type Variant = keyof typeof SOURCES;

export default function ScrollVideo() {
  const variant = useSyncExternalStore<Variant>(
    () => () => {},
    () => (new URLSearchParams(window.location.search).get("film") === "v1" ? "full" : "card"),
    () => "card",
  );
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const card = cardRef.current;
    if (!section || !video) return;

    const src = SOURCES[variant];
    const small = window.matchMedia("(max-width: 768px)").matches;
    video.src = small ? src.small : src.big;
    video.load();

    // iOS Safari won't render seeks until the video has been played once.
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    video.addEventListener("loadedmetadata", unlock, { once: true });

    let current = 0;
    let raf = 0;

    const progress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const tick = () => {
      const p = progress();

      // Card grows from an inset frame to nearly full width over the first 40%.
      if (card) {
        const g = Math.min(1, p / 0.4);
        const e = 1 - Math.pow(1 - g, 3);
        const startW = small ? 88 : 64;
        const endW = small ? 100 : 94;
        card.style.width = `${startW + (endW - startW) * e}vw`;
        card.style.borderRadius = `${(small ? 16 : 28) * (1 - e) + (small ? 0 : 14) * e}px`;
      }

      const duration = video.duration;
      if (duration) {
        const target = p * (duration - 0.05);
        // Ease toward the target so trackpad jumps don't look choppy.
        current += (target - current) * 0.15;
        if (Math.abs(target - current) < 0.001) current = target;
        if (Math.abs(video.currentTime - current) > 0.01) {
          video.currentTime = current;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    // Only run the loop while the section is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", unlock);
    };
  }, [variant]);

  const poster = SOURCES[variant].poster;

  if (variant === "full") {
    return (
      <section ref={sectionRef} className="relative h-[400vh] bg-black" aria-label="Aiwan product film">
        <div className="sticky top-0 h-screen overflow-hidden">
          <video
            ref={videoRef}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh]" aria-label="Aiwan product film">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={cardRef}
          className="relative overflow-hidden shadow-[0_30px_80px_-30px_rgba(60,40,20,0.45)]"
          style={{ width: "64vw", maxHeight: "86vh", aspectRatio: "16 / 9", borderRadius: 28 }}
        >
          <video
            ref={videoRef}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
