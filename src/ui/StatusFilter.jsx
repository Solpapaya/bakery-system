import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import LiWithIcon from "./LiWithIcon";

const StyledStatusFilter = styled.ul`
  position: relative;
  display: flex;
  border-top: 1px solid var(--color-gray-300);
  overflow-x: auto; /* 🧭 enables horizontal scroll if needed */
  overflow-y: hidden; /* 🙈 blocks vertical overflow */
  white-space: nowrap; /* 🔒 keeps content in a single line */

  font-size: 1.6rem;
  color: var(--color-gray-600);
`;

const ScrollContent = styled.div`
  position: relative;
  display: flex;
  gap: 1.5rem;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px; /* offset downward */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-gray-300);
  }
`;

const FilterNumber = styled.span`
  border-radius: var(--border-radius-sm);
  padding: 0.1rem 0.2rem;
  font-weight: 500;
  color: var(--color-gray-600);
  background-color: var(--color-gray-300);
  transition: color 0.3s;

  ${(props) =>
    props.$active &&
    css`
      color: var(--color-brand-1000);
      background-color: transparent;
      font-weight: 600;
    `}
`;

function StatusFilter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].key;

  function handleClick(value) {
    searchParams.set(filterField, value);
    // if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledStatusFilter>
      <ScrollContent>
        {options.map((option) => (
          <LiWithIcon
            key={option.key}
            icon={<option.icon />}
            onClick={() => handleClick(option.key)}
            active={currentFilter === option.key}
          >
            <span>{option.label}</span>{" "}
            <FilterNumber $active={currentFilter === option.key}>
              {option.count}
            </FilterNumber>
          </LiWithIcon>
        ))}
      </ScrollContent>
    </StyledStatusFilter>
  );
}

export default StatusFilter;
