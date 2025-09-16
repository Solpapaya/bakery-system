import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineChevronDown } from "react-icons/hi2";
import TagWithIcon from "./TagWithIcon";
import { useItems } from "../context/ItemsContext";

const DropdownWrapper = styled.div`
  position: relative;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  left: 0rem;
  top: calc(100% + 0.5rem);
  background-color: var(--color-gray-0);
  width: 100%;
  border-radius: var(--border-radius-md);
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const DropdownItem = styled.li`
  padding: 1.5rem 1rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;

  ${(props) =>
    props.$selected &&
    css`
      color: var(--color-gray-0);
      background-color: var(--color-brand-1000);
    `}
`;

function Dropdown({ items }) {
  const [open, setOpen] = useState(false);
  const { selectedDropdownItem, setSelectedDropdownItem } = useItems();
  const dropdownRef = useRef();
  const dropdownListRef = useRef();

  useEffect(() => {
    function outsideClick(e) {
      if (dropdownListRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    }

    window.addEventListener("click", outsideClick);

    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <TagWithIcon
        as="button"
        iconPosition="right"
        icon={<HiOutlineChevronDown />}
        iconMargin="2rem"
        activePlaceholder={false}
        onClick={() => {
          setOpen((prevOpen) => !prevOpen);
        }}
      >
        {selectedDropdownItem}
      </TagWithIcon>
      {open && (
        <StyledDropdown ref={dropdownListRef}>
          {items.map((item, i) => (
            <DropdownItem
              key={i}
              onClick={() => {
                setSelectedDropdownItem(item);
                setOpen((prevOpen) => !prevOpen);
              }}
              $selected={selectedDropdownItem === item}
            >
              {item}
            </DropdownItem>
          ))}
        </StyledDropdown>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;
