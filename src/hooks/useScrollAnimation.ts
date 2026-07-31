import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('#hero h1, #hero .body-text, #hero .field-label, #hero a', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('main > section:not(#hero)').forEach((section) => {
        const header = section.querySelector('.section-header-row');
        const rule = section.querySelector('.gold-rule');
        const content = section.querySelectorAll(
          '.chronicle-card, .timeline-entry-grid, .body-text, h3, .btn-primary, .btn-secondary',
        );

        if (header) {
          gsap.from(header, {
            opacity: 0,
            y: 18,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 82%', once: true },
          });
        }

        if (rule) {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: 'center',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: rule, start: 'top 88%', once: true },
          });
        }

        if (content.length) {
          gsap.from(content, {
            opacity: 0,
            y: 24,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: content[0], start: 'top 88%', once: true },
          });
        }
      });
    });

    return () => context.revert();
  }, []);
}
