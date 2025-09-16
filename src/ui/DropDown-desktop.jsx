import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const fakeFrequentCustomers = [
  { id: 35445, fullName: "Lionel Messi" },
  { id: 35446, fullName: "Cristiano Ronaldo" },
  { id: 35447, fullName: "Alexis Vega" },
  { id: 35448, fullName: "Brad Pitt" },
];

const StyledDropDown = styled.ul`
  position: absolute;
  top: ${(props) => props.$top};
  left: 0;
  z-index: 1;
  border-radius: var(--border-radius-lg);
  outline: 1px solid transparent;

  background-color: var(--color-gray-0);
  max-height: 0rem;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  width: 100%;

  transition: all 0.3s;

  /* ${(props) =>
    props.$open &&
    css`
      max-height: 20rem;
      padding: 1.2rem;
      outline: 1px solid var(--color-brand-600);
    `}; */

  &.open {
    max-height: 20rem;
    padding: 1.2rem;
    outline: 1px solid var(--color-brand-600);
  }
`;

const Item = styled.li`
  padding: 0.8rem 0.8rem;
  border-radius: var(--border-radius-lg);
  user-select: none;

  &:hover {
    background-color: var(--color-brand-800);
    color: var(--color-gray-50);
  }
`;

const ItemSectionHeader = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

function DropDown({
  type,
  dropDownParentRef,
  setOpenDropDown,
  setValue,
  itemKey,
  top = "3.7rem",
}) {
  //   console.log(dropDownParentRef.current.querySelector("label").innerText);
  //   console.log(`DROPDOWN${dropDownParentRef.current} RENDERED`);

  //   const [open, setOpen] = useState(true);
  const dropDownRef = useRef();

  useEffect(() => {
    requestAnimationFrame(() => {
      // setOpen(true);

      dropDownRef.current.classList.add("open");
    });
  }, [dropDownRef]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!dropDownParentRef.current.contains(e.target)) {
        setOpenDropDown("");
      }
    }

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [dropDownParentRef, setOpenDropDown]);

  function selectItem(item) {
    const newValue = item[itemKey];

    if (type !== "array") {
      setOpenDropDown("");
      setValue(newValue);
    } else {
      setValue((value) => [...value, newValue]);
    }
  }

  return (
    // <StyledDropDown ref={dropDownRef} $open={open}>
    <StyledDropDown $top={top} ref={dropDownRef}>
      <ItemSectionHeader>Clientes Frecuentes</ItemSectionHeader>
      {fakeFrequentCustomers.map((customer) => (
        <Item key={customer.id} onClick={() => selectItem(customer)}>
          {customer.fullName}
        </Item>
      ))}
    </StyledDropDown>
  );
}

export default DropDown;
