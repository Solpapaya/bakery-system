import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [name, setName] = useState("");
  const [items, setItems] = useState(null);
  return (
    <CategoryContext.Provider value={{ name, setName, items, setItems }}>
      {children}
    </CategoryContext.Provider>
  );
}

function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined)
    throw Error("CategoryContext was used outside of CategoryProvider");
  return context;
}

export { CategoryProvider, useCategory };
