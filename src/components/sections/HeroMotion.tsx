"use client";

import { gsap } from "gsap";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

import type { PillarId } from "@/types/hero";

type HeroMotionProps = Readonly<{
  children: ReactNode;
}>;

export function HeroMotion({ children }: HeroMotionProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const media = gsap.matchMedia();
    let context: gsap.Context | undefined;

    try {
      context = gsap.context(() => {
        media.add(
          {
            desktop: "(hover: hover) and (pointer: fine) and (min-width: 768px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
            touch: "(hover: none), (pointer: coarse)",
          },
          (matchContext) => {
          const { desktop, reduceMotion, touch } = matchContext.conditions as {
            desktop: boolean;
            reduceMotion: boolean;
            touch: boolean;
          };
          const compactMotion =
            touch || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);
          const environment = root.querySelector<HTMLElement>("[data-hero-environment]");
          const logo = root.querySelector<HTMLElement>("[data-hero-logo]");
          const stage = root.querySelector<HTMLElement>(".ascend-core__stage");
          const edgeLight = root.querySelector<HTMLElement>("[data-edge-light]");
          const planes = gsap.utils.toArray<HTMLElement>(".ascend-core__plane", root);
          const depthLayers = gsap.utils.toArray<HTMLElement>("[data-depth-layer]", root);
          const nodes = gsap.utils.toArray<HTMLElement>("[data-pillar-node]", root);
          const paths = gsap.utils.toArray<SVGPathElement>("[data-connection-path]", root);
          const idleAnimations: gsap.core.Animation[] = [];
          const cleanups: Array<() => void> = [];

          paths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: reduceMotion ? 0 : length });
          });

          if (reduceMotion) {
            gsap.set(
              [environment, logo, stage, edgeLight, ...planes, ...depthLayers, ...nodes, ...paths],
              { clearProps: "all" },
            );
            root.dataset.motionState = "reduced";
            return () => {
              delete root.dataset.motionState;
            };
          }

          root.dataset.motionState = "running";

          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
              root.dataset.motionState = "idle";
            },
          });

          timeline.fromTo(
            environment,
            { autoAlpha: compactMotion ? 0.55 : 0.28 },
            { autoAlpha: 1, duration: compactMotion ? 0.35 : 0.7 },
          );

          if (!compactMotion) {
            timeline.fromTo(
              planes,
              { autoAlpha: 0, x: (index) => (index === 0 ? -14 : 14) },
              { autoAlpha: 0.82, x: 0, duration: 0.8, stagger: 0.08 },
              0.12,
            );
          }

          timeline
            .fromTo(
              "[data-hero-eyebrow]",
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: compactMotion ? 0.25 : 0.4 },
              compactMotion ? 0.08 : 0.18,
            )
            .fromTo(
              "[data-hero-headline]",
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: compactMotion ? 0.4 : 0.65 },
              compactMotion ? 0.16 : 0.3,
            )
            .fromTo(
              logo,
              { autoAlpha: 0, scale: 0.955, y: 9 },
              { autoAlpha: 1, scale: 1, y: 0, duration: compactMotion ? 0.52 : 0.85, ease: "power3.out" },
              compactMotion ? 0.2 : 0.34,
            )
            .fromTo(
              "[data-hero-supporting-copy]",
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: compactMotion ? 0.3 : 0.5 },
              compactMotion ? 0.28 : 0.52,
            )
            .fromTo(
              "[data-hero-cta-group]",
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: compactMotion ? 0.28 : 0.45 },
              compactMotion ? 0.36 : 0.66,
            )
            .fromTo(
              nodes,
              { autoAlpha: 0, scale: 0.96, y: 7 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: compactMotion ? 0.22 : 0.36,
                stagger: compactMotion ? 0.07 : 0.13,
              },
              compactMotion ? 0.44 : 0.72,
            );

          paths.forEach((path, index) => {
            timeline.to(
              path,
              {
                strokeDashoffset: 0,
                duration: compactMotion ? 0.2 : 0.42,
                ease: "power1.inOut",
              },
              (compactMotion ? 0.5 : 0.82) +
                (index % 4) * (compactMotion ? 0.06 : 0.13),
            );
          });

          timeline.to(
            stage,
            { scale: compactMotion ? 1.005 : 1.012, duration: 0.24, yoyo: true, repeat: 1 },
            compactMotion ? 0.82 : 1.38,
          );

          if (logo) {
            idleAnimations.push(
              gsap.to(logo, {
                scale: compactMotion ? 1.003 : 1.008,
                y: compactMotion ? -0.5 : -1.5,
                duration: compactMotion ? 5.5 : 4.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1.8,
              }),
            );
          }

          if (edgeLight && !compactMotion) {
            idleAnimations.push(
              gsap.to(edgeLight, {
                rotation: 360,
                duration: 16,
                ease: "none",
                repeat: -1,
              }),
            );
          }

          if (!compactMotion) {
            const nodePulse = gsap.timeline({ repeat: -1, repeatDelay: 2.8, delay: 2.4 });
            nodes.forEach((node) => {
              nodePulse.to(node, { scale: 1.008, duration: 0.36, yoyo: true, repeat: 1 }, ">+=0.7");
            });
            idleAnimations.push(nodePulse);
          }

          const setActivePillar = (id: PillarId | null) => {
            nodes.forEach((node) => {
              if (node.dataset.pillarNode === id) node.dataset.active = "true";
              else delete node.dataset.active;
            });

            paths.forEach((path) => {
              const isActive = path.dataset.connectionPath === id;
              if (isActive) path.dataset.active = "true";
              else delete path.dataset.active;
              gsap.to(path, { opacity: id ? (isActive ? 1 : 0.24) : 0.72, duration: 0.22 });
            });
          };

          nodes.forEach((node) => {
            const id = node.dataset.pillarNode as PillarId;
            const activate = () => setActivePillar(id);
            const deactivate = () => {
              if (!node.matches(":hover") && document.activeElement !== node) setActivePillar(null);
            };
            node.addEventListener("pointerenter", activate);
            node.addEventListener("pointerleave", deactivate);
            node.addEventListener("focus", activate);
            node.addEventListener("blur", deactivate);
            cleanups.push(() => {
              node.removeEventListener("pointerenter", activate);
              node.removeEventListener("pointerleave", deactivate);
              node.removeEventListener("focus", activate);
              node.removeEventListener("blur", deactivate);
            });
          });

          if (desktop && environment && logo) {
            const movePlanesX = planes.map((plane) =>
              gsap.quickTo(plane, "x", { duration: 0.7, ease: "power3.out" }),
            );
            const movePlanesY = planes.map((plane) =>
              gsap.quickTo(plane, "y", { duration: 0.7, ease: "power3.out" }),
            );
            const moveLogoX = gsap.quickTo(logo, "x", { duration: 0.9, ease: "power3.out" });
            const moveLogoY = gsap.quickTo(logo, "y", { duration: 0.9, ease: "power3.out" });

            const handlePointerMove = (event: PointerEvent) => {
              const bounds = root.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width - 0.5;
              const y = (event.clientY - bounds.top) / bounds.height - 0.5;
              movePlanesX.forEach((move, index) => move(x * (index === 0 ? 9 : -9)));
              movePlanesY.forEach((move, index) => move(y * (index === 0 ? 6 : -6)));
              moveLogoX(x * 3);
              moveLogoY(y * 2);
              root.style.setProperty("--pointer-x", `${50 + x * 12}%`);
              root.style.setProperty("--pointer-y", `${48 + y * 10}%`);
            };
            const resetPointer = () => {
              movePlanesX.forEach((move) => move(0));
              movePlanesY.forEach((move) => move(0));
              moveLogoX(0);
              moveLogoY(0);
              root.style.removeProperty("--pointer-x");
              root.style.removeProperty("--pointer-y");
            };
            root.addEventListener("pointermove", handlePointerMove);
            root.addEventListener("pointerleave", resetPointer);
            cleanups.push(() => {
              root.removeEventListener("pointermove", handlePointerMove);
              root.removeEventListener("pointerleave", resetPointer);
            });
          }

          const front = root.querySelector<HTMLElement>("[data-depth-layer='front']");
          const moveFront = front ? gsap.quickTo(front, "y", { duration: 0.35, ease: "none" }) : null;
          const fadeEnvironment = environment
            ? gsap.quickTo(environment, "opacity", { duration: 0.35, ease: "none" })
            : null;
          const handleScroll = () => {
            const bounds = root.getBoundingClientRect();
            const progress = gsap.utils.clamp(0, 1, -bounds.top / Math.max(bounds.height, 1));
            moveFront?.(progress * 34);
            fadeEnvironment?.(1 - progress * 0.24);
          };
          window.addEventListener("scroll", handleScroll, { passive: true });
          cleanups.push(() => window.removeEventListener("scroll", handleScroll));

          const observer = new IntersectionObserver(
            ([entry]) => {
              idleAnimations.forEach((animation) => animation.paused(!entry.isIntersecting));
            },
            { threshold: 0.08 },
          );
          observer.observe(root);
          cleanups.push(() => observer.disconnect());

          return () => {
            cleanups.forEach((cleanup) => cleanup());
            delete root.dataset.motionState;
            root.style.removeProperty("--pointer-x");
            root.style.removeProperty("--pointer-y");
          };
          },
        );
      }, root);
    } catch {
      root.dataset.motionState = "static";
      const animatedElements = root.querySelectorAll<HTMLElement | SVGElement>(
        "[data-hero-environment], [data-hero-logo], [data-hero-eyebrow], [data-hero-headline], [data-hero-supporting-copy], [data-hero-cta-group], [data-pillar-node], [data-connection-path], [data-depth-layer], [data-edge-light]",
      );
      gsap.killTweensOf(animatedElements);
      gsap.set(animatedElements, {
        clearProps: "all",
      });
    }

    return () => {
      media.revert();
      context?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero" aria-labelledby="hero-title">
      {children}
    </section>
  );
}
