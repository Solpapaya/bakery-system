import styled from "styled-components";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import {
  HiOutlineArrowUpTray,
  HiOutlinePlus,
  HiOutlineTicket,
} from "react-icons/hi2";
import { useState } from "react";
import SlideModal from "../../ui/SlideModal";
import TicketForm from "./TicketForm";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--flex-gap-tiny);
`;

function TicketsActionButtons() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  // console.log(isOpenModal);

  return (
    <>
      <Wrapper>
        <ButtonWithIcon
          backgroundColor="var(--color-gray-300)"
          colorText="var(--color-gray-700)"
          colorIcon="var(--color-gray-700)"
          outline="1px solid transparent"
          width="10rem"
          hover={{
            backgroundColor: "var(--color-gray-500)",
            outline: "1px solid var(--color-gray-500)",
            color: "var(--color-gray-100)",
          }}
          icon={<HiOutlineArrowUpTray />}
        >
          Exportar
        </ButtonWithIcon>

        <ButtonWithIcon
          backgroundColor="var(--color-brand-500)"
          colorText="var(--color-gray-100)"
          colorIcon="var(--color-gray-100)"
          outline="1px solid transparent"
          width="13rem"
          hover={{
            backgroundColor: "var(--color-brand-900)",
            outline: "1px solid var(--color-brand-900)",
            color: "var(--color-gray-0)",
          }}
          icon={<HiOutlinePlus />}
          onClick={() => setIsOpenModal(true)}
        >
          Nuevo Ticket
        </ButtonWithIcon>
      </Wrapper>

      {/* {isOpenModal && <Modal />} */}
      {isOpenModal && (
        <SlideModal
          setIsOpenModal={setIsOpenModal}
          logo={<HiOutlineTicket />}
          title="Nuevo Ticket"
        >
          <TicketForm />
        </SlideModal>
      )}
    </>
  );
}

export default TicketsActionButtons;
