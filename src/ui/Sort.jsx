import styled from "styled-components";

import SortField from "./SortField";
import FooterActions from "./FooterActions";
import { AcceptButton, ResetButton } from "./FilterActionButtons";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineArrowLongUp, HiOutlineArrowLongDown } from "react-icons/hi2";
import { convertQueryParamToDict } from "../utils/helpers";
import { mqHeight } from "../utils/mediaQueryHelpers";
import { LANG } from "../constants/language";

const StyledSort = styled.section`
  display: flex;
  flex-direction: column;
  @media ${mqHeight.iphone15ProMax} {
    margin-top: -2rem;
  }
`;

const SortOrder = styled.div`
  margin-top: 2.8rem;
  height: 12rem;

  @media ${mqHeight.iphone15ProMax} {
    height: 13rem;
  }
`;

const SortOrderHeading = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const SortOrderList = styled.ol`
  list-style: none;
`;

const SortFields = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${mqHeight.iphone15ProMax} {
    gap: 2rem;
  }
`;

const SortOrderField = styled.li`
  display: flex;
  padding-left: 1rem;
  align-items: center;
  gap: 1rem;
`;

const WrapperNumberAndLabel = styled.div`
  display: flex;
  gap: 2rem;
`;

const SortOrderNumber = styled.span`
  color: var(--color-brand-1000);
  font-weight: 600;
  width: 1rem;
`;

const SortOrderIcon = styled.div`
  background-color: var(--color-gray-400);
  color: var(--color-brand-1000);
  border-radius: var(--border-radius-sm);
  padding: 0.3rem;

  & svg {
    display: block;
    stroke-width: 2;
  }
`;

function Sort({ setOpenModal, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortFilter = searchParams.get("sort");

  const sortOrderFilter = sortFilter
    ?.split(",")
    .map((sortKey) => sortKey.split(".")[0]);
  const sortDirectionFilter =
    sortFilter && convertQueryParamToDict(sortFilter, ",", ".");

  const [sort, setSort] = useState(sortDirectionFilter || {});
  const [sortOrder, setSortOrder] = useState(sortOrderFilter || []);

  function handleApply() {
    const urlSearchParam = new URLSearchParams(searchParams);
    const params = Object.fromEntries(urlSearchParam.entries()); // convert params to obj
    delete params["sort"];

    if (sortOrder.length > 0) {
      const sortQueryParam = sortOrder
        .map((sortKey) => `${sortKey}.${sort[sortKey]}`)
        .join(",");
      params.sort = sortQueryParam;
    }

    setSearchParams(params);
    setOpenModal("");
  }

  function handleReset() {
    setSort({});
    setSortOrder([]);
  }
  return (
    <>
      <StyledSort>
        <SortFields>
          {options.map((option) => {
            return (
              <SortField
                key={option.key}
                option={option}
                sort={sort}
                setSort={setSort}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            );
          })}
        </SortFields>

        <SortOrder>
          {sortOrder.length > 0 && (
            <>
              <SortOrderHeading>Prioridad de campos</SortOrderHeading>
              <SortOrderList>
                {sortOrder.map((sortKey, i) => (
                  <SortOrderField key={sortKey}>
                    <WrapperNumberAndLabel>
                      <SortOrderNumber>{i + 1}</SortOrderNumber>
                      <span>
                        {
                          options.filter((option) => option.key === sortKey)[0]
                            .label[LANG]
                        }
                      </span>
                    </WrapperNumberAndLabel>
                    <SortOrderIcon>
                      {sort[sortKey] === "asc" ? (
                        <HiOutlineArrowLongDown />
                      ) : (
                        <HiOutlineArrowLongUp />
                      )}
                    </SortOrderIcon>
                  </SortOrderField>
                ))}
              </SortOrderList>
            </>
          )}
        </SortOrder>
      </StyledSort>

      <FooterActions>
        <AcceptButton onClick={handleApply}>Aplicar</AcceptButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </FooterActions>
    </>
  );
}

export default Sort;
