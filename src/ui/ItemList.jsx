import styled, { css } from "styled-components";
import { HiOutlineMinus } from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import { mqHeight } from "../utils/mediaQueryHelpers";
import { useItems } from "../context/ItemsContext";
import MessageSvg from "./MessageSvg";
import { MessageTypes } from "../constants/messageTypes";

const List = styled.ul`
  margin-top: 1rem;
  height: 66dvh;
  overflow-y: auto;

  @media ${mqHeight.iphone15Pro} {
    height: 77vh;
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

  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-brand-1000);
      color: var(--color-gray-0);
      outline: none;
    `}
`;

const ItemImage = styled.img`
  width: 5rem;
  height: 4rem;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  object-position: center;
`;

const ItemCount = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--color-gray-0);
  color: var(--color-brand-1000);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  background-color: var(--color-gray-500);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    width: 2rem;
    height: 2rem;
    color: var(--color-gray-0);
  }
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

    ${(props) =>
      props.$selected &&
      css`
        color: var(--color-gray-0);
      `}
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrice = styled.div`
  color: var(--color-gray-600);
  font-size: 1.4rem;

  ${(props) =>
    props.$selected &&
    css`
      color: var(--color-gray-400);
    `}
`;

function ItemList({ localItems, setLocalItems }) {
  const { filteredItems } = useItems();

  function handleIncrease(item) {
    setLocalItems((prev) => {
      if (!Object.keys(prev).includes(item.name))
        return {
          ...prev,
          [item.name]: {
            price: item.price,
            quantity: 1,
            img: item.img,
            activeDecrease: false,
          },
        };
      return {
        ...prev,
        [item.name]: {
          price: item.price,
          quantity: prev[item.name].quantity + 1,
          img: item.img,
          activeDecrease: prev[item.name].activeDecrease,
        },
      };
    });
  }

  function handleActiveDecrease(e, item) {
    e?.stopPropagation();

    setLocalItems((prev) => {
      return {
        ...prev,
        [item.name]: {
          price: item.price,
          quantity: prev[item.name].quantity,
          img: item.img,
          activeDecrease: !prev[item.name].activeDecrease,
        },
      };
    });
  }

  function handleDecrease(e, item) {
    e.stopPropagation();

    setLocalItems((prev) => {
      if (prev[item.name].quantity === 1) {
        const copy = { ...prev };
        delete copy[item.name];
        return copy;
      }
      return {
        ...prev,
        [item.name]: {
          price: item.price,
          quantity: prev[item.name].quantity - 1,
          img: item.img,
          activeDecrease: prev[item.name].activeDecrease,
        },
      };
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
        filteredItems?.map((item) => (
          <Item
            key={item.id}
            onClick={() => {
              handleIncrease(item);
            }}
            $selected={localItems[item.name]}
          >
            {item.img ? (
              <ItemImage src={item.img} />
            ) : (
              <ItemDefaultImg $selected={localItems[item.name]}>
                <LuCroissant />
              </ItemDefaultImg>
            )}
            <ItemInfo>
              <span>{item.name}</span>
              <ItemPrice
                $selected={localItems[item.name]}
              >{`$${item.price}`}</ItemPrice>
            </ItemInfo>
            {localItems[item.name] && (
              <CountWrapper>
                {localItems[item.name].activeDecrease && (
                  <IconWrapper
                    onClick={(e) => {
                      handleDecrease(e, item);
                    }}
                  >
                    <HiOutlineMinus />
                  </IconWrapper>
                )}
                <ItemCount
                  onClick={(e) => {
                    handleActiveDecrease(e, item);
                  }}
                >
                  {localItems[item.name].quantity}
                </ItemCount>
              </CountWrapper>
            )}
          </Item>
        ))}
    </List>
  );
}

export default ItemList;
