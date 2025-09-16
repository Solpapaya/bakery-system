import { useEffect, useRef } from "react";
import { useScroll } from "../context/useScrollContext";

export function useScrollAnimation() {
  const ref = useRef();
  const { topMinScrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    function handleScroll() {
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY <= 0) {
        ref.current.classList.remove("hidden");
      } else if (window.scrollY < topMinScrollY) {
        return;
      } else if (window.scrollY > lastScrollY) {
        // scrolling down
        ref.current.classList.add("hidden");
        lastScrollY = window.scrollY;
      } else {
        // scrolling up
        if (window.scrollY < maxScrollY - 50) {
          ref.current.classList.remove("hidden");
          lastScrollY = window.scrollY;
        }
      }
    }

    if (ref.current !== undefined) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [ref, topMinScrollY]);

  return ref;
}
