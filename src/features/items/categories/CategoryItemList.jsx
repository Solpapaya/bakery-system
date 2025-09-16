import styled, { css } from "styled-components";
import { LuCroissant } from "react-icons/lu";
import { HiOutlineCheck } from "react-icons/hi2";
import { mqHeight } from "../../../utils/mediaQueryHelpers";
import { MessageTypes } from "../../../constants/messageTypes";
import MessageSvg from "../../../ui/MessageSvg";

const List = styled.ul`
  margin-top: 1rem;
  height: 66dvh;
  overflow-y: auto;

  @media ${mqHeight.iphone15ProMax} {
    height: 77dvh;
  }
`;

const Item = styled.li`
  padding: 1rem 1rem;
  border-radius: var(--border-radius-md) 7px;
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  margin-bottom: 0.8rem;
  background-color: var(--color-gray-0);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
`;

const ItemImage = styled.img`
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

const Checkbox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  outline: 3px solid var(--color-gray-500);
  outline-offset: -3px;
  background-color: transparent;

  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-brand-1000);
      color: var(--color-gray-0);
      outline: none;
    `}
`;

const IconWrapper = styled.div`
  & svg {
    display: block;
    stroke-width: 2.5;
    width: 2rem;
    height: 2rem;
  }
`;

function CategoryItemList({ filteredItems, localItems, setLocalItems }) {
  function handleSelectItem(itemName) {
    setLocalItems((prev) => {
      if (Object.keys(prev).includes(itemName)) {
        const copy = { ...prev };
        delete copy[itemName];
        return copy;
      } else {
        const newItem = filteredItems.filter(
          (item) => item.name === itemName
        )[0];
        return { ...prev, [newItem.name]: { img: newItem.img } };
      }
    });
  }

  return (
    <List>
      {filteredItems.length === 0 && (
        <MessageSvg
          type={MessageTypes.NOT_FOUND}
          message="Ups... No se encontraron productos."
        />
      )}
      {filteredItems.length > 0 &&
        filteredItems.map((item) => (
          <Item key={item.name} onClick={() => handleSelectItem(item.name)}>
            {item.img ? (
              <ItemImage src={item.img} />
            ) : (
              <ItemDefaultImg>
                <LuCroissant />
              </ItemDefaultImg>
            )}
            <span>{item.name}</span>
            <Checkbox
              $selected={
                localItems && Object.keys(localItems).includes(item.name)
              }
            >
              {localItems && Object.keys(localItems).includes(item.name) && (
                <IconWrapper>
                  <HiOutlineCheck />
                </IconWrapper>
              )}
            </Checkbox>
          </Item>
        ))}
    </List>
  );
}

export default CategoryItemList;
