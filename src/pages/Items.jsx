import { useEffect } from "react";
import ItemsTable from "../features/items/ItemsTable";
import DropdownSearchBar from "../ui/DropdownSearchBar";
import { useScroll } from "../context/useScrollContext";
import CreateButton from "../features/tickets/CreateButton";

function Items() {
  const { setTopMinScrollY } = useScroll();

  useEffect(() => {
    setTopMinScrollY(80);
  }, [setTopMinScrollY]);

  return (
    <>
      <DropdownSearchBar />
      <ItemsTable />
      <CreateButton />
    </>
  );
}

export default Items;
