import { useEffect, useRef, useState } from 'react';

export default function useInView(options = {}) {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);

  return [elementRef, isInView];
}

