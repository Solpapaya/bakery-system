// NOTE: Until DB is not added, this ItemContext will be needed.
// When we include ReactQuery, this context will no longer be needed.
// Because when the item image is changed, it will be updated in the DB
// and React Query will take it from the DB, instead of the item state

import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

function ItemProvider({ children }) {
  const [item, setItem] = useState(null);
  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
}

function useItem() {
  const context = useContext(ItemContext);
  if (context === undefined)
    throw Error("ItemContext was used outside of the ItemProvider");
  return context;
}

export { ItemProvider, useItem };
