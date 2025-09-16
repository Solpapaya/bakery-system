import styled, { css } from "styled-components";
import TagWithIcon from "./TagWithIcon";
import {
  HiOutlineSwatch,
  HiOutlineChevronDown,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useState } from "react";
import DropdownWithIcons from "./DropdownWithIcons";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    display: block;
    color: var(--color-brand-1000);

    ${(props) =>
      props.$selected &&
      css`
        stroke-width: 2.2;
      `}

    ${(props) =>
      props.$open &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

const SelectedOption = styled.li`
  position: relative;
  padding: 0.2rem 0.8rem;
  padding-right: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: inline-block;
  border-radius: var(--border-radius-sm);
  color: var(--color-gray-700);
  font-weight: 500;
  background-color: var(--color-gray-100);
  margin: 0.3rem;
`;

const SelectedOptionIconWrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    display: block;
    color: var(--color-gray-500);
    stroke-width: 2;
  }
`;

function MultiSelectDropDown({ item, setItem, id, options }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const hasOptions = item?.[id]?.length > 0;

  function handleRemoveSelectedOption(e, option) {
    e.stopPropagation();
    setItem((prev) => {
      return { ...prev, [id]: prev[id].filter((item) => item !== option) };
    });
  }

  return (
    <Wrapper>
      <>
        <TagWithIcon
          as="button"
          padding={hasOptions ? "1rem 3rem" : undefined}
          onClick={() => setOpenDropdown((prev) => !prev)}
          icon={hasOptions ? null : <HiOutlineSwatch />}
          paddingTagForIconSpace={hasOptions ? "1rem" : undefined}
          selected={hasOptions}
        >
          {!hasOptions && <span>Categoria</span>}
          {hasOptions && (
            <ul>
              {item[id].map((option) => (
                <SelectedOption key={option}>
                  <span>{option}</span>
                  <SelectedOptionIconWrapper
                    onClick={(e) => handleRemoveSelectedOption(e, option)}
                  >
                    <HiOutlineXMark />
                  </SelectedOptionIconWrapper>
                </SelectedOption>
              ))}
            </ul>
          )}
        </TagWithIcon>
        <IconWrapper $open={openDropdown} $selected={hasOptions}>
          <HiOutlineChevronDown />
        </IconWrapper>
        {openDropdown && (
          <DropdownWithIcons
            options={options}
            item={item}
            setItem={setItem}
            id="categories"
            setOpenDropdown={setOpenDropdown}
          />
        )}
      </>
    </Wrapper>
  );
}

export default MultiSelectDropDown;
