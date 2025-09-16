import styled, { css } from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi2";

const Item = styled.div`
  position: relative;
  padding: 1rem 1rem;
  padding-left: 3.8rem;
  border-radius: var(--border-radius-md);
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  margin-bottom: 0.8rem;
  background-color: var(--color-gray-0);

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.$selected &&
    css`
      color: var(--color-gray-0);
      background-color: var(--color-brand-1000);
      outline: none;
    `}
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    display: block;
    color: var(--color-brand-1000);
    width: 1.7rem;
    height: 1.7rem;
    stroke-width: 1.3;

    ${(props) =>
      props.$selected &&
      css`
        /* stroke-width: 2; */
        stroke-width: 1.8;
        color: var(--color-gray-0);
      `}
  }
`;

function CustomerItem({ customer, localCustomer, setLocalCustomer }) {
  return (
    <Item
      onClick={() => {
        setLocalCustomer(customer.fullName);
      }}
      $selected={customer.fullName === localCustomer}
    >
      <IconWrapper $selected={customer.fullName === localCustomer}>
        <HiOutlineUserCircle />
      </IconWrapper>
      <span>{customer.fullName}</span>
    </Item>
  );
}

export default CustomerItem;
