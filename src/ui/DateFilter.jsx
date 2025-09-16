import styled from "styled-components";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import ButtonWithIcon from "./ButtonWithIcon";

const StyledDateFilter = styled.div`
  display: flex;
  align-items: center;
  /* gap: var(--flex-gap-tiny); */
  justify-content: space-between;

  & svg {
    /* color: var(--color-gray-700); */
    color: var(--color-brand-1000);
  }
`;

// const InputWrapper = styled.div`
//   position: relative;
//   /* display: inline-block; */
//   width: 11.5rem;

//   & svg {
//     color: var(--color-gray-700);
//     width: 1.6rem;
//     height: 1.6rem;
//     position: absolute;
//     right: 0.8rem;
//     top: 50%;
//     transform: translateY(-50%);
//     pointer-events: none; /* so clicking the icon doesn’t block input focus */
//   }
// `;

// const DateButton = styled.button`
//   width: 100%;
//   font-size: 1.2rem;
//   font-weight: 400;
//   border-radius: var(--border-radius-sm);
//   /* border: 1px solid var(--color-gray-300); */
//   border: none;
//   outline: 1px solid var(--color-gray-300);
//   /* outline-offset: -1px; */
//   text-align: left;
//   padding: 0.4rem 0.8rem;
//   color: var(--color-gray-500);
//   background-color: var(--color-gray-0);
//   transition: all 0.3s;

//   &:hover,
//   &:focus {
//     outline: 1px solid var(--color-brand-600);
//     /* color: var(--color-brand-600); */
//   }
// `;

function DateFilter() {
  return (
    <StyledDateFilter>
      <ButtonWithIcon width="auto" icon={<HiOutlineCalendarDays />}>
        Fecha Inicial
      </ButtonWithIcon>
      {/* <HiOutlineArrowsRightLeft /> */}
      <ButtonWithIcon width="auto" icon={<HiOutlineCalendarDays />}>
        Fecha Final
      </ButtonWithIcon>
    </StyledDateFilter>
  );
}

export default DateFilter;
