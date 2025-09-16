import { useLocation, useNavigate } from "react-router-dom";
import { useItems } from "../../context/ItemsContext";
import AcceptButton from "../../ui/AcceptButton";
import DropdownSearchBar from "../../ui/DropdownSearchBar";
import ItemList from "../../ui/ItemList";
import SlidingWindow from "../../ui/SlidingWindow";
import { useEffect, useState } from "react";

function ItemsNewTicket() {
  const prevPath = useLocation().pathname.split("/").slice(0, -1).join("/");
  const { ticketItems, setTicketItems } = useItems();
  const [localItems, setLocalItems] = useState(ticketItems);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.paddingBottom = "0px";
    return () => (document.body.style.paddingBottom = "");
  }, []);

  function handleAccept() {
    let copy = localItems;
    for (const key of Object.keys(copy)) {
      copy[key].activeDecrease = false;
    }

    setTicketItems(copy);
    navigate(prevPath);
  }

  return (
    <SlidingWindow
      previousPage={prevPath}
      headerText="Añadir productos a ticket"
      paddingTop=".5rem"
      paddingBottom="1rem"
      marginLeftHeaderText="3rem"
    >
      <DropdownSearchBar fixed={false} />
      <ItemList localItems={localItems} setLocalItems={setLocalItems} />
      <AcceptButton
        marginTop="1.5rem"
        marginBottom="0"
        disabled={Object.keys(localItems).length === 0}
        onClick={handleAccept}
      >
        Aceptar
      </AcceptButton>
    </SlidingWindow>
  );
}

export default ItemsNewTicket;
