import styled from "styled-components";
import ButtonWithIcon from "./ButtonWithIcon";
import {
  HiOutlineCalendarDays,
  HiOutlineArrowsUpDown,
  HiOutlineArrowLongRight,
  HiOutlineArrowLongUp,
  HiOutlineArrowLongDown,
} from "react-icons/hi2";
import { useState } from "react";
import Calendar from "./Calendar";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamToArray, formatDate } from "../utils/helpers";
import Modal from "./Modal";
import Sort from "./Sort";
import { SORT_OPTIONS } from "../constants/sort";
import { LANG } from "../constants/language";
import { CALENDAR_SHORTCUTS } from "../constants/calendar";

const MODAL_TITLES = {
  calendar: "Rango de Fechas",
  sort: "Campos para Ordenar",
};

const DateFilterButtonIconContainer = styled.span`
  margin: 0 1rem;

  & svg {
    position: static;
    transform: none;
    display: block;
  }
`;

const FilterButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

const SortFilterButtonIconContainer = styled(DateFilterButtonIconContainer)`
  margin: 0;
  margin-left: 0.3rem;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-md);
  padding: 0.2rem 0.2rem;

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    stroke-width: 2;
  }
`;

const SortValue = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  &:last-of-type {
    margin-right: 0;
  }
`;

const ResetButton = styled.button`
  border-radius: var(--border-radius-md);
  border: none;
  padding: 0.4rem 0.6rem;
  font-size: 1.6rem;
  color: var(--color-gray-200);
  background-color: var(--color-brand-500);

  &:focus,
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const StyledScrollFiltersMobile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto; // 🧭 enables horizontal scroll if needed
  overflow-y: hidden; // 🙈 blocks vertical overflow
  white-space: nowrap; // 🔒 keeps content in a single line
`;

function ScrollFiltersMobile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = formatDate(searchParams.get("start"));
  const endDate = formatDate(searchParams.get("end"));
  const dateShortcut = searchParams.get("dateShortcut");
  const sort = convertQueryParamToArray(searchParams.get("sort"), ",", ".");

  const [openModal, setOpenModal] = useState("");

  function handleReset() {
    const urlSearchParam = new URLSearchParams(searchParams);
    const params = Object.fromEntries(urlSearchParam.entries()); // convert params to obj
    ["dateShortcut", "start", "end", "sort"].forEach(
      (key) => delete params[key]
    );
    setSearchParams(params);
  }

  return (
    <>
      <StyledScrollFiltersMobile>
        {(dateShortcut || startDate || endDate || sort) && (
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        )}
        <ButtonWithIcon
          width={startDate || endDate || dateShortcut ? "fit-content" : "16rem"}
          placeholder={startDate || endDate || dateShortcut}
          icon={<HiOutlineCalendarDays />}
          onClick={() => {
            setOpenModal("calendar");
          }}
        >
          <FilterButtonContent>
            <span>
              {dateShortcut
                ? CALENDAR_SHORTCUTS.filter(
                    (option) => option.key === dateShortcut
                  )[0].label[LANG]
                : startDate || "Fechas"}
            </span>
            {!dateShortcut && endDate && (
              <>
                <DateFilterButtonIconContainer>
                  <HiOutlineArrowLongRight />
                </DateFilterButtonIconContainer>
                <span>{endDate}</span>
              </>
            )}
          </FilterButtonContent>
        </ButtonWithIcon>
        <ButtonWithIcon
          width={sort ? "fit-content" : "15rem"}
          placeholder={sort}
          icon={<HiOutlineArrowsUpDown />}
          onClick={() => {
            setOpenModal("sort");
          }}
        >
          <FilterButtonContent>
            {sort ? (
              sort.map((sortKey) => (
                <SortValue key={sortKey[0]}>
                  <span>
                    {
                      SORT_OPTIONS.filter(
                        (option) => option.key === sortKey[0]
                      )[0].label[LANG]
                    }
                  </span>
                  <SortFilterButtonIconContainer>
                    {sortKey[1] === "asc" ? (
                      <HiOutlineArrowLongDown />
                    ) : (
                      <HiOutlineArrowLongUp />
                    )}
                  </SortFilterButtonIconContainer>
                </SortValue>
              ))
            ) : (
              <span>Ordenar</span>
            )}
          </FilterButtonContent>
        </ButtonWithIcon>
      </StyledScrollFiltersMobile>
      {openModal !== "" && (
        <Modal setOpenModal={setOpenModal} title={MODAL_TITLES[openModal]}>
          {openModal === "calendar" && <Calendar setOpenModal={setOpenModal} />}
          {openModal === "sort" && (
            <Sort setOpenModal={setOpenModal} options={SORT_OPTIONS} />
          )}
        </Modal>
      )}
    </>
  );
}

export default ScrollFiltersMobile;
