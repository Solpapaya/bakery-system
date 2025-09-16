import { useEffect, useRef } from "react";

export function useAnimation() {
  const ref = useRef();

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ref.current.classList.add("open");
      });
    });
  }, []);

  return ref;
}
