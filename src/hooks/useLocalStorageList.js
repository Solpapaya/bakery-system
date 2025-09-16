import { useEffect, useState } from "react";

// End funciton when we use ReactQuery for managing Database
export function useLocalStorageList(key, maxItems = 5) {
  const [list, setList] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [list, key]);

  function addItem(newItem) {}
}
