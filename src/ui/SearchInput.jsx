import styled, { css } from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

import SearchDropdown from "./SearchDropdown";
import { mqHasTouchInputs, mqWidth } from "../utils/mediaQueryHelpers";
import { useSearchParams } from "react-router-dom";
import { useRecentSearches } from "../hooks/useRecentSearches";

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-md);
  outline: 1.2px solid var(--color-gray-300);
  outline-offset: -1.2px;

  &:hover {
    cursor: pointer;
    // This matches devices without touch inputs (desktop)
    @media not ${mqHasTouchInputs} {
      outline: 1px solid var(--color-brand-600);
    }
  }

  ${(props) =>
    props.$isFocused &&
    css`
      outline: 1px solid var(--color-brand-600);
    `}

  ${(props) =>
    props.$isSearchSetted &&
    css`
      background-color: var(--color-gray-300);
    `}
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  padding: ${(props) => props.$padding};
  width: 100%;

  &::placeholder {
    color: var(--color-gray-500);
  }

  &:focus,
  &:hover {
    outline: none;
  }

  ${(props) =>
    props.$isSearchSetted &&
    css`
      color: var(--color-gray-700);
      font-weight: 500;
    `}
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 1rem;

  & svg {
    display: block;
    color: var(--color-brand-1000);
    stroke-width: ${(props) => props.$iconStrokeWidth};
    width: ${(props) => props.$iconWidth};
    height: ${(props) => props.$iconHeight};

    ${(props) =>
      props.$isSearchSetted &&
      css`
        stroke-width: 2;
      `}
  }
`;

const WrapperClearSearchButton = styled.div.attrs({
  className: "clear-wrapper",
})`
  height: 100%;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus,
  &:hover {
    cursor: pointer;
    & button {
      @media ${mqWidth.tablet} {
        background-color: var(--color-brand-700);
      }
    }
  }
`;

const ClearSearchButton = styled.button`
  border-radius: 50%;
  background-color: var(--color-brand-500);
  border: none;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    stroke-width: 2;
    color: var(--color-gray-200);
  }
`;

const CancelButton = styled.button`
  position: relative;
  color: var(--color-brand-600);
  font-weight: 500;
  background-color: transparent;
  border: none;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1.7px;
    bottom: 0.4rem;
    left: 0;
    background-color: var(--color-brand-600);
  }

  // Other style, but looks similar to clear search button
  /* border-radius: var(--border-radius-md);
  border: none;
  color: var(--color-gray-200);
  background-color: var(--color-brand-500);
  padding: 0.4rem 0.6rem; */
`;

function limitScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    window.scrollTo({
      top: 20,
      // behavior: "smooth",
    });
  }
}

function SearchInput({
  placeholder = "Buscar",
  id = "ticketSearch",
  icon = <HiOutlineMagnifyingGlass />,
  padding = "0.4rem 0.8rem",
  dropdownBackgroundColor = "var(--color-gray-50)",
  dropdownPaddingLeft = "0rem",
  iconWidth = "1.6rem",
  iconHeight = "1.6rem",
  iconStrokeWidth = "1.5",
  activeSearchParams = true,
  inputRef = null,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSearch = searchParams.get("search") || "";
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState(filterSearch);
  const initialSearch = useRef();
  const searchWrapperRef = useRef();
  const searchInputRef = useRef();
  const {
    list: recentSearches,
    add: addRecentSearch,
    remove: removeRecentSearch,
  } = useRecentSearches("ticketCustomer", 5);

  useEffect(() => {
    if (inputRef) inputRef.current = searchInputRef.current;
  }, [inputRef]);

  // It is not required inside enterKeyboard() dependency array because it will never have stale values.
  // setSearch(), setOpenSearchDropdown() and searchInputRef are stable across renders. In other words, they will have the latest value no matter what.
  // Even, if handleCancelSearch() is passed into useCallback(): setSearch(), setOpenSearchDropdown() and searchInputRef will always have the most recent value.
  // NOTE: It is inside a useCallback because it is passed as prop to SearchDropdown in order to cancel de search when there is an outside click. And, if we don't
  // put it inside useCallback(), handleCancelSearch() will be created on every render of the input (like everytime we type in the input). And, as it will be a new
  // function on every render, then in the useEffect of SearchDropdown, it will cause to run the useEffect everytime we type (or every time the input re-renders).
  // In the useEffect of SearchDropdown we add a click listener. So, everytime we type in the input, the click listener will be created and deleted (so unnecessary).
  // NOTE2: And, as you can see, we don't need any variable in the dependency array because as was told previously, all variables are stable across renders
  // despite they are inside a useCallback(), because this variables are useRef() and setters of states.
  const handleCancelSearch = useCallback(() => {
    // console.log("CANCEL");
    // Needs to setSearch to initial search when the input was focused
    setSearch(initialSearch.current);
    setOpenSearchDropdown(false);
    searchInputRef.current.blur();

    // If you add a state variable, then, linting will ask you to add handleCancelSearch() to the dependency array of enterKeyboard. Because state variables are not like useRef(),
    // they become stale. In this case, isFocused will not have the latest value, it will contain the value when the enterKeyboard() was recreated.
    // TEST
    // if (isFocused) console.log("HELLO");
  }, []);

  // We need useCallback() because:
  // - If we don't use it, updateSearchParams() will be recreated on every render. Causing also enterKeyboard() to render everytime (because updateSearchParams() is part of its dependency array). Recap: updateSearchParams() will have the latest value of searchParams, but updateSearchParams() and enterKeyboard() will be recreated on every render.
  // - When we use it, updateSearchParams() will only be recreated when some variable or function in its dependency array changes. In this case, as the only variables and functions we are using are: searchParams and setSearchParams.
  //   And, as searchParams could change (when after setting the search we apply a date, sort or any other filter) we need to put searchParams inside the dependency array. If we don't recreate updateSearchParams() when searchParams changes (not including searchParams in dependency array), then updateSearchParams() won't know the new value (it won't know the new filters in the URL)
  //   Therefore, the function will work with a stale value of searchParams. Recap: apply useCallback() to optimize this function updateSearchParams() and enterKeyboard(), so they will not recreate on every render. AND, DON'T FORGET to include in the dependency array all variables that change over time that could have stale values, like states, functions, derived states. (useRef is safe, it will always have the latest value, no matter what.)
  const updateSearchParams = useCallback(
    (newSearch) => {
      const urlSearchParam = new URLSearchParams(searchParams);
      const params = Object.fromEntries(urlSearchParam.entries()); // convert params to obj
      if (newSearch) params.search = newSearch;
      else delete params.search;
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
    // setSearchParams is included in the dependency array because the linting complains.
    // but it could be omitted, because it is stable across render, just like setState from useState
  );

  // enterKeyboard() needs to be inside the useCallback() because we need this function to be
  // the same when the focus and blur action occur, in order to add an remove it from the event listener.
  // If it is not the same, then we won't be able to delete it from the event listener, causing the
  // keydown listener to always be active. So, when you press the "Enter" key, it will always
  // run the code even though the input is not focused.
  const enterKeyboard = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter": {
          // console.log("ENTER KEY");
          const searchValue = searchInputRef.current.value;

          // updateSearchParams() needs useRef() and not 'search' statefor updating the searchParams
          // Because state is asynchronous and useRef is synchronous.
          // if we use 'state' in updateSearchParams(), we won't get the most recent value.
          // with useRef() we always get the latest value.
          if (activeSearchParams) updateSearchParams(searchValue);
          addRecentSearch(searchValue);
          setOpenSearchDropdown(false);
          searchInputRef.current.blur();
          break;
        }
        case "Escape":
          // console.log("ESCAPE KEY");
          handleCancelSearch();
          break;
      }
    },
    // [] // This won't take the last value of searchParams inside the updateSearchParams() function. Because, this enterKeyboard() will be freezed. So, the first time (and the only time) it is created, it will also take the first version of updateSearchParams(), and therefore, also use the first version of searchParams. When searchParams changes, updateSearchParams() will have that new value but updateSearchParams() will be a new version, and updateSearchParams() won't have it. That's why with this option you work with stale values of the variables used inside updateSearchParams()
    [
      updateSearchParams,
      handleCancelSearch,
      activeSearchParams,
      addRecentSearch,
    ] // This takes most recent value of variables inside updateSearchParams() like searchParams. Because, as updateSearchParams() is recreated every render, it will have most recent values of all the variables that are inside of it. And, as it is considered in the dependency array of this enterKeyboard() function, then, this function will be recreated everytime updateSearchParams() is recreated. In other words, enterKeyboard() will be recreated on every render. NOTE: That is the case if we don't wrap updateSearchParams() inside useCallback(). On the other hand, if we wrap updateSearchParams() inside useCallback(), and set the dependency array to [searchParams, setSearchParams], then, updateSearchParams() will be created only when searchParams changes. So, when searchParams changes, updateSearchParams() is recreated and therefore enterKeyboard() is also recreated. And vouila! enterKeyboard() is no longer recreated on every render.
  );

  function handleClearSearch() {
    if (openSearchDropdown) searchInputRef.current.focus();
    else {
      if (activeSearchParams) updateSearchParams("");
    }
    setSearch("");
  }

  function handleSearchFocus() {
    // console.log("FOCUS");
    setIsFocused(true);
    // initialSearch.current = search;
    if (!openSearchDropdown) initialSearch.current = search;
    setOpenSearchDropdown(true);
    window.addEventListener("scroll", limitScroll);
    window.addEventListener("keydown", enterKeyboard);
  }

  function handleSearchBlur() {
    // console.log("BLUR");
    setIsFocused(false);
    window.scrollTo({
      top: -10,
      behavior: "smooth",
    });
    window.removeEventListener("scroll", limitScroll);
    window.removeEventListener("keydown", enterKeyboard);
  }

  return (
    <SearchWrapper ref={searchWrapperRef}>
      <SearchInputWrapper
        $isSearchSetted={search !== ""}
        $isFocused={isFocused}
      >
        <IconContainer
          $isSearchSetted={search !== ""}
          $iconWidth={iconWidth}
          $iconHeight={iconHeight}
          $iconStrokeWidth={iconStrokeWidth}
        >
          {icon}
        </IconContainer>
        <Input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
          $isSearchSetted={search !== ""}
          $padding={padding}
        />
        {search && (
          <WrapperClearSearchButton onClick={handleClearSearch}>
            <ClearSearchButton>
              <HiOutlineXMark />
            </ClearSearchButton>
          </WrapperClearSearchButton>
        )}
      </SearchInputWrapper>
      {openSearchDropdown && (
        <>
          <CancelButton onClick={handleCancelSearch}>Cancel</CancelButton>
          <SearchDropdown
            search={search}
            setSearch={setSearch}
            setOpenSearchDropdown={setOpenSearchDropdown}
            searchWrapperRef={searchWrapperRef}
            updateSearchParams={updateSearchParams}
            handleCancelSearch={handleCancelSearch}
            activeSearchParams={activeSearchParams}
            recentSearches={recentSearches}
            removeRecentSearch={removeRecentSearch}
            backgroundColor={dropdownBackgroundColor}
            paddingLeft={dropdownPaddingLeft}
          />
        </>
      )}
    </SearchWrapper>
  );
}

export default SearchInput;
