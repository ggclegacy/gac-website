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
            reduced: "(prefers-reduced-motion: reduce)",
            touch: "(hover: none), (pointer: coarse)",
          },
          (mediaContext) => {
            const { desktop, reduced, touch } = mediaContext.conditions as {
              desktop: boolean;
              reduced: boolean;
              touch: boolean;
            };
            const chamber = root.querySelector<HTMLElement>("[data-ascend-chamber]");
            const emblem = root.querySelector<HTMLElement>("[data-chamber-emblem]");
            const identity = root.querySelector<HTMLElement>("[data-chamber-identity]");
            const message = root.querySelector<HTMLElement>("[data-chamber-message]");
            const actions = root.querySelector<HTMLElement>("[data-chamber-actions]");
            const reflection = root.querySelector<HTMLElement>("[data-chamber-reflection]");
            const planes = gsap.utils.toArray<HTMLElement>("[data-chamber-plane]", root);
            const modules = gsap.utils.toArray<HTMLButtonElement>("[data-pillar-module]", root);
            const paths = gsap.utils.toArray<SVGPathElement>("[data-chamber-path]", root);
            const idleAnimations: gsap.core.Animation[] = [];
            const cleanups: Array<() => void> = [];
            const compact = touch || navigator.hardwareConcurrency <= 4;

            if (reduced) {
              root.dataset.motionState = "reduced";
              return () => delete root.dataset.motionState;
            }

            paths.forEach((path) => {
              const length = path.getTotalLength();
              gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            });

            root.dataset.motionState = "opening";
            const timeline = gsap.timeline({
              defaults: { ease: "power2.out" },
              onComplete: () => {
                root.dataset.motionState = "idle";
              },
            });

            timeline.fromTo(
              chamber,
              { autoAlpha: 0.3 },
              { autoAlpha: 1, duration: compact ? 0.36 : 0.62 },
            );

            if (!compact) {
              timeline.fromTo(
                planes,
                { autoAlpha: 0, x: (index) => (index ? 12 : -12) },
                { autoAlpha: 0.76, x: 0, duration: 0.58, stagger: 0.06 },
                0.08,
              );
            }

            timeline
              .fromTo(
                emblem,
                { autoAlpha: 0, scale: 0.96, y: 6 },
                { autoAlpha: 1, scale: 1, y: 0, duration: compact ? 0.5 : 0.72 },
                0.12,
              )
              .fromTo(
                identity,
                { autoAlpha: 0, y: -7 },
                { autoAlpha: 1, y: 0, duration: 0.38 },
                0.18,
              )
              .fromTo(
                message,
                { autoAlpha: 0, y: 12 },
                { autoAlpha: 1, y: 0, duration: compact ? 0.42 : 0.55 },
                compact ? 0.28 : 0.36,
              )
              .fromTo(
                actions,
                { autoAlpha: 0, y: 8 },
                { autoAlpha: 1, y: 0, duration: 0.34 },
                compact ? 0.42 : 0.5,
              )
              .fromTo(
                modules,
                { autoAlpha: 0.25, scale: 0.97 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: compact ? 0.22 : 0.3,
                  stagger: compact ? 0.07 : 0.1,
                },
                compact ? 0.24 : 0.32,
              );

            paths.forEach((path, index) => {
              timeline.to(
                path,
                { strokeDashoffset: 0, duration: compact ? 0.22 : 0.34, ease: "power1.inOut" },
                (compact ? 0.31 : 0.42) + index * (compact ? 0.07 : 0.1),
              );
            });

            timeline.to(
              emblem,
              { scale: compact ? 1.004 : 1.009, duration: 0.2, yoyo: true, repeat: 1 },
              compact ? 0.68 : 0.86,
            );

            if (emblem) {
              idleAnimations.push(
                gsap.to(emblem, {
                  scale: compact ? 1.002 : 1.005,
                  duration: compact ? 6 : 5,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                  delay: 1.3,
                }),
              );
            }

            if (reflection && !compact) {
              idleAnimations.push(
                gsap.to(reflection, {
                  rotation: 360,
                  duration: 18,
                  ease: "none",
                  repeat: -1,
                }),
              );
            }

            if (!compact) {
              const moduleIdle = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2.4 });
              modules.forEach((module) => {
                moduleIdle.to(module, { opacity: 0.88, duration: 0.45, yoyo: true, repeat: 1 }, ">+=1");
              });
              idleAnimations.push(moduleIdle);
            }

            const setActive = (id: PillarId | null, pressed = false) => {
              modules.forEach((module) => {
                const active = module.dataset.pillarModule === id;
                module.toggleAttribute("data-active", active);
                if (pressed || !active) module.setAttribute("aria-pressed", String(active && pressed));
              });
              paths.forEach((path) => {
                path.toggleAttribute("data-active", path.dataset.chamberPath === id);
              });
            };

            modules.forEach((module) => {
              const id = module.dataset.pillarModule as PillarId;
              const enter = () => setActive(id);
              const leave = () => {
                if (module.getAttribute("aria-pressed") !== "true" && document.activeElement !== module) {
                  setActive(null);
                }
              };
              const click = () => {
                const willActivate = module.getAttribute("aria-pressed") !== "true";
                setActive(willActivate ? id : null, willActivate);
              };
              module.addEventListener("pointerenter", enter);
              module.addEventListener("pointerleave", leave);
              module.addEventListener("focus", enter);
              module.addEventListener("blur", leave);
              module.addEventListener("click", click);
              cleanups.push(() => {
                module.removeEventListener("pointerenter", enter);
                module.removeEventListener("pointerleave", leave);
                module.removeEventListener("focus", enter);
                module.removeEventListener("blur", leave);
                module.removeEventListener("click", click);
              });
            });

            if (desktop && chamber && emblem) {
              const chamberX = gsap.quickTo(chamber, "x", { duration: 0.8, ease: "power3.out" });
              const chamberY = gsap.quickTo(chamber, "y", { duration: 0.8, ease: "power3.out" });
              const emblemX = gsap.quickTo(emblem, "x", { duration: 1, ease: "power3.out" });
              const emblemY = gsap.quickTo(emblem, "y", { duration: 1, ease: "power3.out" });
              const pointerMove = (event: PointerEvent) => {
                const bounds = root.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                chamberX(x * 5);
                chamberY(y * 4);
                emblemX(x * 1.8);
                emblemY(y * 1.3);
              };
              const pointerLeave = () => {
                chamberX(0);
                chamberY(0);
                emblemX(0);
                emblemY(0);
              };
              root.addEventListener("pointermove", pointerMove);
              root.addEventListener("pointerleave", pointerLeave);
              cleanups.push(() => {
                root.removeEventListener("pointermove", pointerMove);
                root.removeEventListener("pointerleave", pointerLeave);
              });
            }

            const back = root.querySelector<HTMLElement>("[data-chamber-depth='back']");
            const front = root.querySelector<HTMLElement>("[data-chamber-depth='front']");
            const storyTransition = root.querySelector<HTMLElement>("[data-chamber-transition]");
            const moveBack = back ? gsap.quickTo(back, "y", { duration: 0.35, ease: "none" }) : null;
            const moveFront = front ? gsap.quickTo(front, "y", { duration: 0.35, ease: "none" }) : null;
            const fadeChamber = chamber
              ? gsap.quickTo(chamber, "opacity", { duration: 0.35, ease: "none" })
              : null;
            const openStory = storyTransition
              ? gsap.quickTo(storyTransition, "scaleY", { duration: 0.45, ease: "power1.out" })
              : null;
            const revealStory = storyTransition
              ? gsap.quickTo(storyTransition, "opacity", { duration: 0.4, ease: "none" })
              : null;
            const scroll = () => {
              const bounds = root.getBoundingClientRect();
              const progress = gsap.utils.clamp(0, 1, -bounds.top / Math.max(bounds.height, 1));
              moveBack?.(progress * 12);
              moveFront?.(progress * 28);
              fadeChamber?.(1 - progress * 0.2);
              openStory?.(0.84 + progress * 0.16);
              revealStory?.(0.58 + progress * 0.42);
            };
            window.addEventListener("scroll", scroll, { passive: true });
            cleanups.push(() => window.removeEventListener("scroll", scroll));

            const observer = new IntersectionObserver(
              ([entry]) => {
                idleAnimations.forEach((animation) => animation.paused(!entry.isIntersecting));
              },
              { threshold: 0.06 },
            );
            observer.observe(root);
            cleanups.push(() => observer.disconnect());

            return () => {
              cleanups.forEach((cleanup) => cleanup());
              delete root.dataset.motionState;
            };
          },
        );
      }, root);
    } catch {
      root.dataset.motionState = "static";
      const animated = root.querySelectorAll<HTMLElement | SVGElement>(
        "[data-ascend-chamber], [data-chamber-emblem], [data-chamber-identity], [data-chamber-message], [data-chamber-actions], [data-pillar-module], [data-chamber-path]",
      );
      gsap.killTweensOf(animated);
      gsap.set(animated, { clearProps: "all" });
    }

    return () => {
      media.revert();
      context?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="ascend-hero" aria-labelledby="hero-title">
      {children}
    </section>
  );
}
