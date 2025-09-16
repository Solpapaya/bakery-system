import styled from "styled-components";
import { LuCroissant } from "react-icons/lu";
import { useItems } from "../../context/ItemsContext";
import { NavLink } from "react-router-dom";
import { DROPDOWN_SEARCH_BAR_HEIGHT } from "../../constants/ui";
import MessageSvg from "../../ui/MessageSvg";
import { MessageTypes } from "../../constants/messageTypes";

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: calc(${DROPDOWN_SEARCH_BAR_HEIGHT} + 1rem);
`;

const Item = styled(NavLink)`
  padding: 1rem;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 2rem;
  cursor: pointer;
`;

const ItemImg = styled.img`
  width: 5rem;
  height: 4rem;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  object-position: center;
`;

const ItemDefaultImg = styled.div`
  width: 5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    color: var(--color-brand-1000);
    width: 3rem;
    height: 3rem;
    stroke-width: 1.4;
  }
`;

const ItemName = styled.div``;

const ItemPrice = styled.div`
  color: var(--color-gray-700);
  font-size: 1.5rem;
`;

function ItemsTable() {
  const { filteredItems } = useItems();

  return (
    <ItemList>
      {filteredItems.length === 0 && (
        <MessageSvg
          type={MessageTypes.NOT_FOUND}
          message="Ups... No se encontraron productos."
        />
      )}
      {filteredItems.length > 0 &&
        filteredItems.map((item) => (
          <li key={item.id}>
            <Item to={`${item.id}/edit`}>
              {item.img ? (
                <ItemImg src={item.img} />
              ) : (
                <ItemDefaultImg>
                  <LuCroissant />
                </ItemDefaultImg>
              )}
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price}</ItemPrice>
            </Item>
          </li>
        ))}
    </ItemList>
  );
}

export default ItemsTable;
