import { browser } from '$app/environment';

interface RevealOptions {
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  threshold?: number;
}

export function reveal(
  node: HTMLElement,
  { delay = 0, direction = 'up', threshold = 0.1 }: RevealOptions = {}
) {
  node.style.setProperty('--reveal-delay', `${delay}ms`);
  node.classList.add('will-reveal', `reveal-${direction}`);

  if (!browser) return {};

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('revealed');
        observer.disconnect();
      }
    },
    { threshold, rootMargin: '0px 0px -40px 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
