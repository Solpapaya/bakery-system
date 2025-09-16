import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import {
  addDays,
  convertStrToDate,
  getCalendarMatrix,
  getMonthStr,
  getNextMonth,
  getPrevMonth,
  subtractDays,
} from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import FooterActions from "./FooterActions";
import { AcceptButton, ResetButton } from "./FilterActionButtons";
import { mqHeight } from "../utils/mediaQueryHelpers";

const CalendarDate = styled.div`
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarChangeDate = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  & svg {
    stroke-width: 2;
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-1000);

    &:hover {
      cursor: pointer;
    }
  }
`;

const Table = styled.div`
  font-size: 1.4rem;
  width: 100%;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid var(--color-brand-1000);
  padding: 0rem 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  margin-bottom: 0.8rem;
`;

const TableRow = styled(TableHeader)`
  border-bottom: none;
  padding: 0;
  margin-bottom: 0.1rem;
`;

const Day = styled.span`
  position: relative;
  display: block;
  z-index: 4;
  width: 100%;
  border-radius: 50%;
  padding: 0.8rem 0.2rem;
  transition: none;
`;

const DayWrapper = styled.div`
  position: relative;
  display: inline-block;
  transition: none;

  ${(props) =>
    props.$betweenDates &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-gray-0);
    `}

  &::after {
    ${(props) =>
      (props.$activeLeft || props.$activeRight) &&
      css`
        transition: none;
        content: "";
        position: absolute;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: var(--color-brand-600);
        z-index: 3;
      `}

    ${(props) =>
      props.$activeLeft &&
      css`
        left: 0;
      `}

      ${(props) =>
      props.$activeRight &&
      css`
        left: 50%;
      `}
  }

  &:hover {
    cursor: pointer;

    & span {
      outline: 2px solid var(--color-brand-1000);
      outline-offset: -2px;
      transition: none;

      ${(props) =>
        (props.$startDate || props.$endDate) &&
        css`
          outline: 2px solid var(--color-brand-800);
        `}

      ${(props) =>
        props.$hoverDate &&
        !props.$today &&
        css`
          background-color: var(--color-brand-1000);
          color: var(--color-gray-0);
          outline: 2px solid var(--color-brand-800);
        `}

        ${(props) =>
        props.$today &&
        css`
          outline: 2px solid var(--color-brand-800);
        `}
    }
  }

  & span {
    ${(props) =>
      (props.$startDate || props.$endDate) &&
      css`
        background-color: var(--color-brand-1000);
        color: var(--color-gray-0);
        transition: none;
      `}

    ${(props) =>
      props.$today &&
      css`
        color: var(--color-brand-1000);
        background-color: var(--color-gray-300);
        transition: none;
      `}

    ${(props) =>
      props.$today &&
      (props.$startDate || props.$endDate) &&
      css`
        outline: 2px solid var(--color-brand-800);
        outline-offset: -2px;
      `}

    ${(props) =>
      props.$notActualMonth &&
      css`
        color: var(--color-gray-400);
      `}
  }
`;

const Shortcuts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 22rem;
  @media ${mqHeight.iphone15ProMax} {
    height: 25rem;
    gap: 1.2rem;
  }
  overflow: scroll;
`;

const Shortcut = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: left;
  padding: 0.2rem 1rem;
  @media ${mqHeight.iphone15ProMax} {
    padding: 0.5rem 1rem;
  }
  font-weight: 500;
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  border-radius: var(--border-radius-md);

  &:hover {
    cursor: pointer;
    outline: 1.5px solid var(--color-brand-1000);
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.$active &&
    css`
      color: var(--color-brand-1000);
      background-color: var(--color-gray-300);
      outline: none;
    `}
`;

const calendarShortcuts = [
  { key: "today", label: "Hoy" },
  { key: "nextWeek", label: "Próxima semana" },
  { key: "lastWeek", label: "Semana pasada" },
  { key: "lastMonth", label: "Mes pasado" },
];

function Calendar({ setOpenModal }) {
  // console.log("CALENDAR");
  // console.log(openCalendar);
  // const [localDate, setLocalDate] = useState("2025-01-08");
  const [searchParams, setSearchParams] = useSearchParams();
  const filterStartDate = searchParams.get("start");
  const filterEndDate = searchParams.get("end");
  const filterShortcutDate = searchParams.get("dateShortcut");

  const [shortcutButton, setShortcutButton] = useState("");
  const [localTodayDate, setLocalTodayDate] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // Apply useMemo for matrix creation, with calendarDate inside dependency array
  const calendarMatrix = getCalendarMatrix(calendarDate);
  const calendarMonthStr = getMonthStr(calendarDate);
  const calendarYear = calendarDate?.getFullYear();

  // Pass to React Query
  useEffect(() => {
    function extractDateFilters(localDate) {
      if (filterShortcutDate) setShortcutButton(filterShortcutDate);
      if (!filterStartDate && !filterEndDate) {
        setCalendarDate(localDate);
        return;
      }
      const newFilterStartDate = convertStrToDate(filterStartDate);
      setStartDate(newFilterStartDate);
      setCalendarDate(newFilterStartDate);
      if (filterStartDate && filterEndDate) {
        const newFilterEndDate = convertStrToDate(filterEndDate);
        setEndDate(newFilterEndDate);
      }
    }

    async function getLocalTodayDate(pos) {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://timeapi.io/api/TimeZone/coordinate?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await res.json();

      const formatted = new Date().toLocaleString("en-CA", {
        timeZone: data.timeZone,
      });
      const localDate = convertStrToDate(formatted.split(",")[0]);

      console.log("Geolocation obtained succesfully.");
      setLocalTodayDate(localDate);
      extractDateFilters(localDate);
    }

    navigator.geolocation.getCurrentPosition(getLocalTodayDate, (err) => {
      console.error("Geolocation error:", err);
      let defaultLocalDate = new Date().toLocaleString("en-CA", {
        timeZone: "America/Mexico_City",
      });
      defaultLocalDate = convertStrToDate(defaultLocalDate.split(",")[0]);
      setLocalTodayDate(defaultLocalDate);
      extractDateFilters(defaultLocalDate);
    });
  }, [filterStartDate, filterEndDate, filterShortcutDate]);

  function handleDate(date) {
    let newStart = startDate;
    let newEnd = endDate;
    if (!startDate && !endDate) {
      newStart = date;
      setStartDate(date);
    } else if (startDate && date > startDate) {
      newEnd = date;
      setEndDate(date);
    } else if (date < startDate) {
      newStart = date;
      newEnd = null;
      setStartDate(date);
      setEndDate(null);
    }
    activateMatchingShortcut(newStart, newEnd);
  }

  function activateMatchingShortcut(newStart, newEnd) {
    const today = localTodayDate.getTime();
    const start = newStart.getTime();
    const end = newEnd?.getTime?.();
    const nextWeek = addDays(localTodayDate, 7).getTime();
    const lastWeek = subtractDays(localTodayDate, 7).getTime();

    setShortcutButton("");
    if (start === today) {
      if (!end) setShortcutButton("today");
      else if (end === nextWeek) setShortcutButton("nextWeek");
    } else if (end === today) {
      const lastMonth = subtractDays(newEnd, 31).getTime();
      if (start === lastWeek) setShortcutButton("lastWeek");
      else if (start === lastMonth) setShortcutButton("lastMonth");
    }
  }

  function handleHover(date) {
    if (!startDate) return;

    if (date > startDate) setHoverDate(date);
    else setHoverDate(null);
  }

  function handleLeave() {
    setHoverDate(null);
  }

  function handleShortcut(value) {
    setShortcutButton(value);
    switch (value) {
      case "today": {
        setStartDate(localTodayDate);
        setEndDate(null);
        setCalendarDate(localTodayDate);
        break;
      }
      case "nextWeek": {
        const nextWeek = addDays(localTodayDate, 7);
        setStartDate(localTodayDate);
        setEndDate(nextWeek);
        setCalendarDate(localTodayDate);
        break;
      }
      case "lastWeek": {
        const lastWeek = subtractDays(localTodayDate, 7);
        setStartDate(lastWeek);
        setEndDate(localTodayDate);
        setCalendarDate(localTodayDate);
        break;
      }
      case "lastMonth": {
        const lastMonth = subtractDays(localTodayDate, 31);
        setStartDate(lastMonth);
        setEndDate(localTodayDate);
        setCalendarDate(localTodayDate);
        break;
      }
      default:
        console.error("No match for the calendar shortcut");
    }
  }

  function handleChangeMonth(value) {
    const calendarMonth = calendarDate.getMonth() + 1;
    switch (value) {
      case "prevMonth": {
        const [prevMonthYear, prevMonth] = getPrevMonth(
          calendarYear,
          calendarMonth
        );
        setCalendarDate(new Date(prevMonthYear, prevMonth - 1, 1));
        break;
      }
      case "nextMonth": {
        const [nextMonthYear, nextMonth] = getNextMonth(
          calendarYear,
          calendarMonth
        );
        setCalendarDate(new Date(nextMonthYear, nextMonth - 1, 1));
        break;
      }
      default:
        console.error("No match for the calendar change date");
        break;
    }
  }

  function handleSetDates() {
    const urlSearchParam = new URLSearchParams(searchParams);
    const params = Object.fromEntries(urlSearchParam.entries()); // convert params to obj
    ["dateShortcut", "start", "end"].forEach((key) => delete params[key]);

    if (shortcutButton) params.dateShortcut = shortcutButton;
    if (startDate) params.start = startDate.toISOString().split("T")[0];
    if (endDate) params.end = endDate.toISOString().split("T")[0];

    setSearchParams(params);
    setOpenModal("");
  }

  function handleReset() {
    setStartDate(null);
    setEndDate(null);
    setShortcutButton("");
  }

  return (
    <>
      <CalendarDate>
        <span>
          {calendarMonthStr}, {calendarYear}
        </span>
        <CalendarChangeDate>
          <span onClick={() => handleChangeMonth("prevMonth")}>
            <HiOutlineChevronLeft />
          </span>
          <span>
            <HiOutlineChevronRight
              onClick={() => handleChangeMonth("nextMonth")}
            />
          </span>
        </CalendarChangeDate>
      </CalendarDate>

      <Table role="table">
        <TableHeader role="row">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mié</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sáb</span>
          <span>Dom</span>
        </TableHeader>

        {calendarMatrix?.map((week, weekNum) => {
          return (
            <TableRow role="row" key={`week${weekNum}`}>
              {week.map((date) => {
                return (
                  <DayWrapper
                    key={date}
                    onClick={() => handleDate(date)}
                    onMouseEnter={() => handleHover(date)}
                    onMouseLeave={() => handleLeave()}
                    $today={date.getTime() === localTodayDate.getTime()}
                    $startDate={date.getTime() === startDate?.getTime?.()}
                    $endDate={date.getTime() === endDate?.getTime?.()}
                    $hoverDate={
                      !endDate && date.getTime() === hoverDate?.getTime?.()
                    }
                    $betweenDates={
                      (!endDate && date > startDate && date < hoverDate) ||
                      (endDate && date > startDate && date < endDate)
                    }
                    $activeLeft={
                      (!endDate && date.getTime() === hoverDate?.getTime?.()) ||
                      (endDate && date.getTime() === endDate?.getTime?.())
                    }
                    $activeRight={
                      date.getTime() === startDate?.getTime?.() &&
                      (endDate || hoverDate)
                    }
                    $notActualMonth={
                      date.getMonth() !== calendarDate.getMonth()
                    }
                  >
                    <Day>{date.getDate()}</Day>
                  </DayWrapper>
                );
              })}
            </TableRow>
          );
        })}
      </Table>
      <Shortcuts>
        {calendarShortcuts.map(({ key, label }) => {
          return (
            <li key={key}>
              <Shortcut
                onClick={() => handleShortcut(key)}
                $active={shortcutButton === key}
              >
                {label}
              </Shortcut>
            </li>
          );
        })}
      </Shortcuts>
      <FooterActions>
        <AcceptButton onClick={handleSetDates}>Aplicar</AcceptButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </FooterActions>
    </>
  );
}

export default Calendar;
