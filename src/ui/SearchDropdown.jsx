import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { MessageTypes } from "../constants/messageTypes";
import MessageSvg from "./MessageSvg";

const fakeSearchSuggestions = [
  { customerName: "Lionel Messi" },
  { customerName: "Alexis Vega" },
  { customerName: "Cole Palmer" },
];

const fakeUsers = [
  { customerName: "Marcus Rashford" },
  { customerName: "Cole Palmer" },
  { customerName: "Alexis Vega" },
  { customerName: "Romelu Lukaku" },
  { customerName: "Cristiano Ronaldo" },
  { customerName: "Julian Brandt" },
  { customerName: "Justin Bieber" },
  { customerName: "Carlos Oppenheimer" },
  { customerName: "Marcel Ruiz" },
  { customerName: "Jesús Gallardo" },
  { customerName: "Vasco Aguirre" },
  { customerName: "Julion Álvarez" },
  { customerName: "Checo Pérez" },
  { customerName: "Franco Romero" },
  { customerName: "David Batsuayi" },
  { customerName: "Lionel Messi" },
];

const DROPDOWN_ITEMS = 5;

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: -${(props) => props.$paddingLeft};
  background-color: ${(props) => props.$backgroundColor};
  width: calc(100% + (2 * ${(props) => props.$paddingLeft}));
  height: 100vh;
  padding-left: ${(props) => props.$paddingLeft};
  padding-right: ${(props) => props.$paddingLeft};
  z-index: 2;
`;

const StyledSearchDropdown = styled.div`
  padding: 1.2rem 0rem 1rem 0rem;
`;

const DropdownTitle = styled.div`
  color: var(--color-brand-1000);
  font-weight: 500;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

const DropdownList = styled.ul`
  list-style: none;
`;

const DropdownItem = styled.li`
  border-bottom: 1px solid var(--color-brand-500);
  padding: 0.8rem 0.6rem;
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownItemIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    & svg {
      color: var(--color-brand-900);
    }
  }

  & svg {
    display: block;
    color: var(--color-brand-500);
    stroke-width: 2;
  }
`;

function doSearch(search) {
  if (!search) return;
  // Function that performs search in the Database

  // Here I will only filter some fake users
  const normalizedSearch = search.toLowerCase();
  const searchResults = fakeUsers.filter((user) =>
    user.customerName.toLowerCase().includes(normalizedSearch)
  );
  return searchResults;
}

function SearchDropdown({
  search,
  setSearch,
  setOpenSearchDropdown,
  searchWrapperRef,
  updateSearchParams,
  handleCancelSearch,
  activeSearchParams,
  recentSearches,
  removeRecentSearch,
  backgroundColor,
  paddingLeft,
}) {
  const [searchSuggestions, setSearchSuggestions] = useState(
    fakeSearchSuggestions
  );
  const searchDropdownListRef = useRef();
  const searchResults = doSearch(search);

  useEffect(() => {
    // console.log("DROPDOWN USE EFFECT");

    function handleOutsideClick(e) {
      const target = e.target;
      const isInsideCleatBtn = e.target.closest(".clear-wrapper");
      if (
        !isInsideCleatBtn &&
        !searchWrapperRef.current.contains(target) &&
        !searchDropdownListRef.current.contains(target)
      ) {
        // console.log("OUTSIDE CLICK");
        handleCancelSearch();
      }
    }

    // console.log("LISTENER OUTSIDE CLICK");
    window.addEventListener("click", handleOutsideClick);

    // Cleanup function. This function will be called before the effect is re-executed.
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [searchWrapperRef, setOpenSearchDropdown, handleCancelSearch]);

  function handleSelectItem(item) {
    window.scrollTo({
      top: -10,
      behavior: "smooth",
    });
    setSearch(item.customerName);
    if (activeSearchParams) updateSearchParams(item.customerName);
    setOpenSearchDropdown(false);
  }

  function handleDeleteItem(e, item, section) {
    e.stopPropagation();

    switch (section) {
      case "recentSearch":
        removeRecentSearch(item.customerName);
        break;
      case "suggestion":
        setSearchSuggestions((prev) =>
          prev.filter(
            (searchSuggestion) =>
              searchSuggestion.customerName !== item.customerName
          )
        );
        break;
      default:
        console.error(`No '${section}' section specified in Search Dropdown`);
    }
  }
  return (
    <Wrapper $backgroundColor={backgroundColor} $paddingLeft={paddingLeft}>
      <StyledSearchDropdown ref={searchDropdownListRef}>
        {search !== "" && (
          <DropdownList>
            {searchResults.slice(0, DROPDOWN_ITEMS).map((item) => (
              <DropdownItem
                key={item.customerName}
                onClick={() => {
                  handleSelectItem(item);
                }}
              >
                <span>{item.customerName}</span>
              </DropdownItem>
            ))}
          </DropdownList>
        )}

        {/* If no customers match the search */}
        {search !== "" && searchResults.length === 0 && (
          <MessageSvg
            type={MessageTypes.NOT_FOUND}
            message="Ups... No se encontraron clientes."
          />
        )}

        {search === "" && recentSearches.length > 0 && (
          <>
            <DropdownTitle>Búsquedas Recientes</DropdownTitle>
            <DropdownList>
              {recentSearches.map((item) => (
                <DropdownItem
                  key={item.customerName}
                  onClick={() => {
                    handleSelectItem(item);
                  }}
                >
                  <span>{item.customerName}</span>
                  <DropdownItemIcon
                    onClick={(e) => handleDeleteItem(e, item, "recentSearch")}
                  >
                    <HiOutlineXMark />
                  </DropdownItemIcon>
                </DropdownItem>
              ))}
            </DropdownList>
          </>
        )}
        {search === "" &&
          recentSearches.length < DROPDOWN_ITEMS &&
          searchSuggestions.length > 0 && (
            <>
              <DropdownTitle>Sugerencias</DropdownTitle>
              <DropdownList>
                {searchSuggestions
                  .slice(0, DROPDOWN_ITEMS - recentSearches.length)
                  .map((item) => (
                    <DropdownItem
                      key={item.customerName}
                      onClick={() => {
                        handleSelectItem(item);
                      }}
                    >
                      <span>{item.customerName}</span>
                    </DropdownItem>
                  ))}
              </DropdownList>
            </>
          )}
      </StyledSearchDropdown>
    </Wrapper>
  );
}

export default SearchDropdown;
