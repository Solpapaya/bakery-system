import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import TagWithIcon from "./TagWithIcon";
import Dropdown from "./Dropdown";
import { useItems } from "../context/ItemsContext";
import { HEADER_HEIGHT } from "../constants/header";
import { DROPDOWN_SEARCH_BAR_HEIGHT } from "../constants/ui";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { scrollToTop } from "../utils/helpers";
import { getCategories } from "../features/items/useItemsData";

const Wrapper = styled.div`
  ${(props) =>
    props.$fixed &&
    css`
      position: fixed;
      background-color: var(--color-gray-50);
      height: calc(${DROPDOWN_SEARCH_BAR_HEIGHT} + 1rem);
      top: ${HEADER_HEIGHT};
      left: 0;
      right: 0;
      padding: 0.5rem 1.5rem;
    `}
  z-index: 5;
  transition: transform 0.3s ease;

  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;

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

// const fakeDropdown = ["Todos los productos", "Favoritos", "Temporada"];

function DropdownSearchBar({ fixed = true }) {
  const [categories, setCategories] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const { search, setSearch } = useItems();
  const searchInputRef = useRef();
  const dropdownSearchBarRef = useScrollAnimation();

  useEffect(() => {
    if (isSearch) searchInputRef.current.focus();
  }, [isSearch, searchInputRef]);

  useEffect(() => {
    setCategories(["Todos los productos", ...getCategories()]);
  }, []);

  function handleSearchButton() {
    if (search !== "") {
      setSearch("");
      searchInputRef.current.focus();
      setIsSearch(true);
    } else setIsSearch((prev) => !prev);
  }

  function handleFocus() {
    setTimeout(() => {
      scrollToTop(0);
    }, 2);
  }

  function handleBlur() {
    setTimeout(() => {
      if (window.scrollY < 120) scrollToTop(0);
    }, 600);
  }

  return (
    <Wrapper ref={dropdownSearchBarRef} $fixed={fixed}>
      {isSearch || search ? (
        <>
          <TagWithIcon
            as="input"
            ref={searchInputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Buscar Productos"
            icon={<HiOutlineMagnifyingGlass />}
          />
          <BarButton onClick={handleSearchButton}>
            <HiOutlineXMark />
          </BarButton>
        </>
      ) : (
        <>
          <Dropdown items={categories} />
          <BarButton
            onClick={() => {
              setIsSearch((prev) => !prev);
            }}
          >
            <HiOutlineMagnifyingGlass />
          </BarButton>
        </>
      )}
    </Wrapper>
  );
}

export default DropdownSearchBar;
