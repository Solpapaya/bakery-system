import styled, { css } from "styled-components";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import { HiOutlineCalendarDays, HiOutlineChevronDown } from "react-icons/hi2";
import { useRef, useState } from "react";
import DropDown from "../../ui/DropDown";
import SelectedItems from "../../ui/SelectedItems";

const PADDING = "0.5rem 1.2rem";

const Form = styled.form``;

const Box = styled.div`
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: var(--flex-gap-tiny);
  margin-bottom: 2rem;

  ${(props) =>
    props.$type === "date" &&
    css`
      /* margin-left: 1rem; */
    `}
`;

const Label = styled.div`
  width: fit-content;
  font-weight: 400;
`;

const WrapperInput = styled.div`
  position: relative;
  left: 0;
`;

function TicketForm() {
  const [openDropDown, setOpenDropDown] = useState("");

  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const dropDownCustomerParentRef = useRef();
  const dropDownItemsParentRef = useRef();

  function handleSubmit() {
    console.log("Submitting ...");
  }

  console.log(items);
  console.log(items.length);

  return (
    <Form onSubmit={handleSubmit}>
      <Box ref={dropDownCustomerParentRef}>
        <Label as="label" htmlFor="customerName">
          Cliente
        </Label>
        <WrapperInput>
          <ButtonWithIcon
            as="input"
            type="text"
            id="customerName"
            width="100%"
            placeholder="Nombre Cliente"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            padding={PADDING}
            onClick={() => setOpenDropDown("customer")}
            colorText="var(--color-grey-700)"
          />
          {openDropDown === "customer" && (
            <DropDown
              dropDownParentRef={dropDownCustomerParentRef}
              setOpenDropDown={setOpenDropDown}
              setValue={setCustomer}
              itemKey="fullName"
            ></DropDown>
          )}
        </WrapperInput>
      </Box>
      <Box $type="date">
        <Label>Fecha</Label>
        <ButtonWithIcon
          width="17rem"
          padding={PADDING}
          icon={<HiOutlineCalendarDays />}
        >
          Fecha Entrega
        </ButtonWithIcon>
      </Box>
      <Box ref={dropDownItemsParentRef}>
        <Label as="label" htmlFor="items">
          Productos
        </Label>
        {items.length > 0 && <SelectedItems items={items} />}
        <WrapperInput>
          <ButtonWithIcon
            as="input"
            type="text"
            id="items"
            width="100%"
            icon={<HiOutlineChevronDown />}
            placeholder="Nombre Producto"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            padding={PADDING}
            onClick={() => setOpenDropDown("items")}
            colorText="var(--color-grey-700)"
          />
          {openDropDown === "items" && (
            <DropDown
              type="array"
              dropDownParentRef={dropDownItemsParentRef}
              setOpenDropDown={setOpenDropDown}
              setValue={setItems}
              itemKey="fullName"
            ></DropDown>
          )}
        </WrapperInput>
      </Box>
    </Form>
  );
}

export default TicketForm;
