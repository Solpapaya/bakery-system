import { useEffect } from "react";
import { useScroll } from "../context/useScrollContext";
import CreateButton from "../features/tickets/CreateButton";
import CategoriesTable from "../features/items/categories/CategoriesTable";
import Search from "../ui/Search";
import { useCategories } from "../context/CategoriesContext";

function ItemsCategories() {
  const { setTopMinScrollY } = useScroll();
  const { search, setSearch } = useCategories();

  useEffect(() => {
    setTopMinScrollY(80);
  }, [setTopMinScrollY]);

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Buscar Categorias"
      />
      <CategoriesTable />
      <CreateButton />
    </>
  );
}

export default ItemsCategories;
