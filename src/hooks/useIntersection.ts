import { useEffect, useRef } from "react";

export const useIntersection = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [ref.current, callback]);

  return { ref };
};
