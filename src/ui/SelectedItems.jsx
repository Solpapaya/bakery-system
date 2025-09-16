import styled from "styled-components";
import { HiOutlineChevronRight, HiOutlineXMark } from "react-icons/hi2";

const StyledSelectedItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectedItem = styled.li`
  /* display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.8rem 0.8rem;
  color: var(--color-grey-700);
  /* font-weight: 400; */

  /* & svg {
    color: var(--color-brand-600);
    stroke-width: 5;
  }  */
`;

const ItemImage = styled.img``;

function SelectedItems({ items }) {
  // const newItems =

  return (
    <StyledSelectedItems>
      {items.map((item) => (
        <SelectedItem>
          <ItemImage />
          <span>{item}</span>
        </SelectedItem>
      ))}
    </StyledSelectedItems>
  );
}

export default SelectedItems;
