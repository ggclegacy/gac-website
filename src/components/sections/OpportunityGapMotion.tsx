"use client";

import { gsap } from "gsap";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

type OpportunityGapMotionProps = Readonly<{
  children: ReactNode;
}>;

export function OpportunityGapMotion({ children }: OpportunityGapMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const foundation = gsap.utils.toArray<HTMLElement>(
          "[data-opportunity-foundation-item]",
          section,
        );
        const expansion = gsap.utils.toArray<HTMLElement>(
          "[data-opportunity-expansion-item]",
          section,
        );
        const pathways = gsap.utils.toArray<SVGPathElement>(
          "[data-opportunity-path]",
          section,
        );
        let hasEntered = false;

        pathways.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        const timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
        timeline
          .fromTo(
            "[data-opportunity-copy]",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
          )
          .fromTo(
            foundation,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 },
            0.12,
          )
          .to(
            pathways,
            { strokeDashoffset: 0, duration: 0.6, stagger: 0.06, ease: "power1.inOut" },
            0.42,
          )
          .fromTo(
            expansion,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08 },
            0.66,
          )
          .fromTo(
            "[data-opportunity-closing]",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0.96,
          );

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasEntered) {
              hasEntered = true;
              timeline.play();
              observer.disconnect();
            }
          },
          { threshold: 0.18 },
        );

        observer.observe(section);

        return () => {
          observer.disconnect();
          timeline.kill();
        };
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="opportunity-gap"
      id="opportunity-gap"
      aria-labelledby="opportunity-gap-title"
    >
      {children}
    </section>
  );
}
