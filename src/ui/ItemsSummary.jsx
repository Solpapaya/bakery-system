import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HiOutlineMinusSmall,
  HiOutlinePlusSmall,
  HiOutlineTrash,
} from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";

const ListWrapper = styled.div`
  padding: 1rem;
  background-color: var(--color-gray-300);
  color: var(--color-gray-700);
  font-weight: 500;
  border-radius: var(--border-radius-md);
`;

const Item = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 6.5fr 2.5fr 1fr;
  column-gap: 1rem;
  align-items: center;
  border-bottom: 2px solid var(--color-gray-100);
  padding: 0.5rem 0;

  ${(props) =>
    props.$onlyDeleteIcon &&
    css`
      grid-template-columns: 0.9fr 0.1fr;
    `}

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-of-type {
    padding-top: 0;
  }
`;

const ItemInfo = styled.div`
  display: grid;
  grid-template-columns: 4rem auto;
  column-gap: 1rem;
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
    color: var(--color-brand-1000);
    width: 2rem;
    height: 2rem;
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
  font-size: 1.4rem;
`;

const ItemQuantity = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 2.4rem;
`;

const Button = styled.button`
  border: none;
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
  }
`;

const ItemCount = styled.div`
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
  text-align: center;
`;

const DeleteItemButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    color: var(--color-red-1000);
  }
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: right;
`;

const AddMoreItems = styled(NavLink)`
  width: fit-content;
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
  margin-top: 2rem;
  border-radius: var(--border-radius-lg);
  padding: 0.2rem 0.7rem;
`;

const IconWrapper = styled.div`
  & svg {
    display: block;
  }
`;

function ItemsSummary({ items, setItems, price = true, quantity = true }) {
  function handleDelete(key) {
    setItems((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  function handleIncrease(key, item) {
    setItems((prev) => {
      if (!Object.keys(prev).includes(key))
        return {
          ...prev,
          [key]: {
            price: item.price,
            quantity: 1,
            img: item.img,
            // activeDecrease: false,
          },
        };
      return {
        ...prev,
        [key]: {
          price: item.price,
          quantity: prev[key].quantity + 1,
          img: item.img,
          // activeDecrease: prev[key].activeDecrease,
        },
      };
    });
  }

  function handleDecrease(key, item) {
    setItems((prev) => {
      if (prev[key].quantity === 1) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return {
        ...prev,
        [key]: {
          price: item.price,
          quantity: prev[key].quantity - 1,
          img: item.img,
          // activeDecrease: prev[key].activeDecrease,
        },
      };
    });
  }

  return (
    <>
      <ListWrapper>
        <ul>
          {Object.keys(items).map((key) => (
            <Item key={key} $onlyDeleteIcon={!quantity}>
              <ItemInfo>
                {!Object.keys(items[key]).includes("img") ||
                items[key].img === "" ? (
                  <ItemDefaultImg $selected={items[key]}>
                    <LuCroissant />
                  </ItemDefaultImg>
                ) : (
                  <ItemImg src={items[key].img} />
                )}

                <ItemInfoText>
                  <ItemName>{key}</ItemName>
                  {price && <ItemPrice>${items[key].price}</ItemPrice>}
                </ItemInfoText>
              </ItemInfo>
              {quantity && (
                <ItemQuantity>
                  <Button
                    onClick={() => {
                      handleDecrease(key, items[key]);
                    }}
                  >
                    <HiOutlineMinusSmall />
                  </Button>
                  <ItemCount>{items[key].quantity}</ItemCount>
                  <Button
                    onClick={() => {
                      handleIncrease(key, items[key]);
                    }}
                  >
                    <HiOutlinePlusSmall />
                  </Button>
                </ItemQuantity>
              )}
              <DeleteItemButton
                onClick={() => {
                  handleDelete(key);
                }}
              >
                <HiOutlineTrash />
              </DeleteItemButton>
            </Item>
          ))}
        </ul>
        <FlexEnd>
          <AddMoreItems to="items">
            <IconWrapper>
              <HiOutlinePlusSmall />
            </IconWrapper>
            <span>Añadir productos</span>
          </AddMoreItems>
        </FlexEnd>
      </ListWrapper>
    </>
  );
}

export default ItemsSummary;
