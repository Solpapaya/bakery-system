import { createContext, useContext, useState } from "react";
import { getCategories } from "../features/items/categories/useCategoriesData";

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  const [search, setSearch] = useState("");
  const filteredCategories = getCategories(search);
  return (
    <CategoriesContext.Provider
      value={{ search, setSearch, filteredCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined)
    throw Error("CategoriesContext was used outside of CategoriesProvider");
  return context;
}

export { CategoriesProvider, useCategories };
