import styled from "styled-components";
import { DROPDOWN_SEARCH_BAR_HEIGHT } from "../../../constants/ui";
import { useCategories } from "../../../context/CategoriesContext";
import { NavLink } from "react-router-dom";
import MessageSvg from "../../../ui/MessageSvg";
import { MessageTypes } from "../../../constants/messageTypes";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: calc(${DROPDOWN_SEARCH_BAR_HEIGHT} + 1rem);
`;

const Item = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  cursor: pointer;
`;

const ItemCount = styled.div`
  background-color: var(--color-gray-300);
  color: var(--color-brand-1000);
  border-radius: var(--border-radius-lg);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CategoriesTable() {
  const { filteredCategories } = useCategories();
  return (
    <List>
      {filteredCategories.length === 0 && (
        <MessageSvg
          type={MessageTypes.NOT_FOUND}
          message="Ups... No se encontraron categorias."
        />
      )}
      {filteredCategories.length > 0 &&
        filteredCategories.map((item, index) => (
          <li key={index}>
            <Item to={`${item.id}/edit`}>
              <span>{item.name}</span>
              <ItemCount>{item.count}</ItemCount>
            </Item>
          </li>
        ))}
    </List>
  );
}

export default CategoriesTable;
