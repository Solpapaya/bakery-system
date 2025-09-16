import { useEffect, useRef } from "react";

export function useOutsideClick(setOpen, waitingTime) {
  const ref = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        // console.log("OUTSIDE CLICK");

        if (waitingTime > 0) {
          ref.current.classList.remove("open");
          setTimeout(() => {
            setOpen(false);
          }, 301);
        } else setOpen(false);
      }
    }

    requestAnimationFrame(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setOpen, waitingTime]);

  return ref;
}
