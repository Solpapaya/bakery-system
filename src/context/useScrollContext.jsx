import { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

function ScrollProvider({ children }) {
  const [topMinScrollY, setTopMinScrollY] = useState(50);

  return (
    <ScrollContext.Provider value={{ topMinScrollY, setTopMinScrollY }}>
      {children}
    </ScrollContext.Provider>
  );
}

function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined)
    throw Error("ScrollContext was used outside of ScrollProvider");
  return context;
}

export { ScrollProvider, useScroll };
