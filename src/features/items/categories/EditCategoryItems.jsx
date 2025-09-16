import { useEffect, useState } from "react";
import { useCategory } from "../../../context/CategoryContext";
import { useItems } from "../../../context/ItemsContext";
import Search from "../../../ui/Search";
import CategoryItemList from "./CategoryItemList";
import AcceptButton from "../../../ui/AcceptButton";
import { useLocation, useNavigate } from "react-router-dom";
import SlidingWindow from "../../../ui/SlidingWindow";

function EditCategoryItems() {
  const navigate = useNavigate();
  const prevPath = useLocation().pathname.split("/").slice(0, -1).join("/");
  const { search, setSearch, filteredItems } = useItems();
  const { items, setItems } = useCategory();
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    document.body.style.paddingBottom = "0px";
    return () => (document.body.style.paddingBottom = "");
  }, []);

  function handleAccept() {
    setItems(localItems);
    navigate(-1);
  }

  return (
    <SlidingWindow
      previousPage={prevPath}
      headerText="Añadir productos a categoría"
      paddingTop=".5rem"
      paddingBottom="1rem"
      marginLeftHeaderText="3rem"
    >
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Buscar Productos"
        fixed={false}
      />
      <CategoryItemList
        items={items}
        filteredItems={filteredItems}
        localItems={localItems}
        setLocalItems={setLocalItems}
      />
      <AcceptButton marginTop="1.5rem" marginBottom="0" onClick={handleAccept}>
        Aceptar
      </AcceptButton>
    </SlidingWindow>
  );
}

export default EditCategoryItems;
