import { useCallback, useState } from "react";

function read(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function write(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function useRecentSearches(key, max) {
  const [list, setList] = useState(() => read(key));

  const add = useCallback(
    (item) => {
      setList((prev) => {
        const normalizedItem = item.toLowerCase().trim();
        let newList = prev.filter(
          (listObj) => listObj.customerName !== normalizedItem
        );
        if (newList.length >= max)
          newList = [
            { customerName: normalizedItem },
            ...newList.slice(0, max - 1),
          ];
        else newList = [{ customerName: normalizedItem }, ...newList];
        write(key, newList);
        return newList;
      });
    },
    [max, key]
  );

  const remove = useCallback(
    (item) => {
      setList((prev) => {
        if (prev.length === 0) return prev;
        const normalizedItem = item.toLowerCase().trim();
        const itemExist = prev.find(
          (listObj) => listObj.customerName === normalizedItem
        );
        if (!itemExist) return prev;
        const newList = prev.filter(
          (listObj) => listObj.customerName !== normalizedItem
        );
        write(key, newList);
        return newList;
      });
    },
    [key]
  );

  return { add, remove, list };
}
