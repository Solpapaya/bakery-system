import styled, { css } from "styled-components";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { HEADER_HEIGHT } from "../constants/header";
import { DROPDOWN_SEARCH_BAR_HEIGHT } from "../constants/ui";
import TagWithIcon from "./TagWithIcon";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useRef, useState } from "react";
import { scrollToTop } from "../utils/helpers";

const Wrapper = styled.div`
  ${(props) =>
    props.$fixed &&
    css`
      position: fixed;
      height: calc(${DROPDOWN_SEARCH_BAR_HEIGHT} + 1rem);
      top: ${HEADER_HEIGHT};
      left: 0;
      right: 0;
      padding: 0.5rem 1.5rem;
    `}
  background-color: var(--color-gray-50);
  z-index: 5;
  transition: transform 0.3s ease;

  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;

  ${(props) =>
    props.$clearSearch &&
    css`
      grid-template-columns: 1fr auto;
    `}

  &.hidden {
    transform: translateY(-200%);
  }
`;

const BarButton = styled.button`
  height: 4.4rem;
  width: 4.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--color-gray-0);
  padding: 1rem;
  outline: 1.2px solid var(--color-gray-300);
  outline-offset: -1.2px;
  border-radius: var(--border-radius-md);

  & svg {
    display: block;
    color: var(--color-brand-1000);
  }
`;

function Search({ search, setSearch, placeholder, fixed = true, padding }) {
  const [clearSearch, setClearSearch] = useState(false);
  const searchWrapperRef = useScrollAnimation();
  const searchRef = useRef();

  function handleClearSearch() {
    if (search) {
      setSearch("");
      searchRef.current.focus();
    } else setClearSearch(false);
  }

  function handleFocus() {
    setClearSearch(true);
    if (fixed) {
      setTimeout(() => {
        scrollToTop(0);
      }, 2);
    }
  }

  function handleBlur() {
    if (!search) setClearSearch(false);
    if (fixed) {
      setTimeout(() => {
        if (window.scrollY < 120) scrollToTop(0);
      }, 650);
    }
  }

  return (
    <Wrapper
      ref={fixed && searchWrapperRef}
      $clearSearch={clearSearch}
      $fixed={fixed}
    >
      <TagWithIcon
        as="input"
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        icon={<HiOutlineMagnifyingGlass />}
        padding={padding}
      />
      {clearSearch && (
        <BarButton onClick={handleClearSearch}>
          <HiOutlineXMark />
        </BarButton>
      )}
    </Wrapper>
  );
}

export default Search;
