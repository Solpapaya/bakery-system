import styled from "styled-components";
import { HiOutlineCheck } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const List = styled.ul`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  border-radius: var(--border-radius-md);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 1rem;
  background-color: ${(props) => props.$backgroundColor};
  z-index: 2;
`;

const Item = styled.div`
  position: relative;
  padding: 1rem 0rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    display: block;
    color: var(--color-brand-1000);
    stroke-width: 3;
  }
`;

const OptionText = styled.div`
  padding-left: 3.8rem;
`;

function DropdownWithIcons({
  options,
  item,
  setItem,
  id,
  setOpenDropdown,
  backgroundColor = "var(--color-gray-0)",
}) {
  const dropdownRef = useOutsideClick(setOpenDropdown, 0);

  function handleSelectItem(option) {
    setItem((prev) => {
      if (prev[id].includes(option))
        return { ...prev, [id]: prev[id].filter((item) => item !== option) };
      else return { ...prev, [id]: [...prev[id], option] };
    });
  }

  return (
    <List ref={dropdownRef} $backgroundColor={backgroundColor}>
      {options.map((option) => (
        <Item key={option} onClick={() => handleSelectItem(option)}>
          {item[id].includes(option) && (
            <IconWrapper>
              <HiOutlineCheck />
            </IconWrapper>
          )}
          <OptionText>{option}</OptionText>
        </Item>
      ))}
    </List>
  );
}

export default DropdownWithIcons;
