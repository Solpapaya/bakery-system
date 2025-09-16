import styled from "styled-components";
import { HiOutlineArrowLongUp, HiOutlineArrowLongDown } from "react-icons/hi2";

import ButtonWithIconInside from "./ButtonWithIconInside";
import { mqHeight } from "../utils/mediaQueryHelpers";
import { LANG } from "../constants/language";

const StyledSortField = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 1rem; */
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-md);
  /* outline: 2px solid var(--color-gray-300); */
  padding: 0.2rem 1rem 0.6rem 1rem;

  @media ${mqHeight.iphone15ProMax} {
    padding: 0.6rem 1rem 0.6rem 1rem;
    /* padding: 1rem 1rem; */
    /* margin-bottom: 2rem; */
  }
`;

const SortLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* gap: 3rem; */
  width: 100%;

  & svg {
    color: var(--color-brand-1000);
    width: 2rem;
    height: 2rem;

    @media ${mqHeight.iphone15ProMax} {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const SortLabel = styled.span`
  font-weight: 500;
`;

const SortButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* column-gap: 2rem; */
  column-gap: 2rem;
  margin-top: 0.4rem;
`;

const SortButton = styled.button``;

function SortField({ option, sort, setSort, sortOrder, setSortOrder }) {
  function handleSort(sortDirection, sortKey) {
    if (sort[sortKey] === sortDirection) {
      setSort((prevSort) => ({ ...prevSort, [sortKey]: "" }));
      setSortOrder((prevSortOrder) =>
        prevSortOrder.filter((key) => key !== sortKey)
      );
    } else {
      setSort((prevSort) => ({ ...prevSort, [sortKey]: sortDirection }));
      if (!sortOrder.includes(sortKey))
        setSortOrder((prevSort) => [...prevSort, sortKey]);
    }
  }

  return (
    <li>
      <StyledSortField>
        <SortLabelWrapper>
          {<option.icon />}
          <SortLabel>{option.label[LANG]}</SortLabel>
        </SortLabelWrapper>

        <SortButtons>
          <ButtonWithIconInside
            icon={<HiOutlineArrowLongDown />}
            onClick={() => handleSort("asc", option.key)}
            active={sort[option.key] === "asc"}
          >
            Asc
          </ButtonWithIconInside>
          <ButtonWithIconInside
            icon={<HiOutlineArrowLongUp />}
            onClick={() => handleSort("desc", option.key)}
            active={sort[option.key] === "desc"}
          >
            Desc
          </ButtonWithIconInside>
        </SortButtons>
      </StyledSortField>
    </li>
  );
}

export default SortField;
