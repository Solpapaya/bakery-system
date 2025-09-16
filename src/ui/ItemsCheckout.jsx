import styled from "styled-components";
import { useItems } from "../context/ItemsContext";
import { LuCroissant } from "react-icons/lu";

const Item = styled.div`
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 500;
  display: grid;
  grid-template-columns: 7.5fr 1fr 1.5fr;
  column-gap: 1rem;
  align-items: center;
  color: var(--color-gray-700);
`;

const ItemDescription = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ItemDefaultImg = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    color: var(--color-gray-1000);
    width: 2.5rem;
    height: 2.5rem;
    stroke-width: 1.4;
  }
`;

const ItemImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  object-position: center;
  flex-shrink: 0; // ⛔ prevents shrinking
`;

const ItemInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  white-space: normal;
  word-break: break-word; // older fallback
  /* overflow-wrap: break-word; // modern standard */
`;

const ItemPrice = styled.div`
  color: var(--color-gray-600);
  font-size: 1.5rem;
`;

const ItemCount = styled.div`
  text-align: center;
`;

const ItemTotalPrice = styled.div`
  text-align: center;
`;

function ItemsCheckout() {
  const { ticketItems } = useItems();

  return (
    <ul>
      {Object.keys(ticketItems).map((key) => (
        <Item key={key}>
          <ItemDescription>
            {ticketItems[key].img === "" ? (
              <ItemDefaultImg $selected={ticketItems[key]}>
                <LuCroissant />
              </ItemDefaultImg>
            ) : (
              <ItemImg src={ticketItems[key].img} />
            )}
            <ItemInfoText>
              <ItemName>{key}</ItemName>
              <ItemPrice>${ticketItems[key].price}</ItemPrice>
            </ItemInfoText>
          </ItemDescription>
          <ItemCount>
            <span>x{ticketItems[key].quantity}</span>
          </ItemCount>
          <ItemTotalPrice>
            <span>${ticketItems[key].quantity * ticketItems[key].price}</span>
          </ItemTotalPrice>
        </Item>
      ))}
    </ul>
  );
}

export default ItemsCheckout;
