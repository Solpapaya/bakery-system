import styled from "styled-components";
import Modal from "./Modal";
import AcceptButton from "./AcceptButton";

const ConfirmMessageText = styled.div`
  text-align: center;

  & span {
    font-weight: 700;
  }
`;

const ConfirmMessageButtons = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
`;

function ConfirmModal({
  open,
  setOpen,
  message,
  handleConfirm,
  confirmButtonMessage,
  confirmButtonBackgroundColor = "var(--color-brand-1000)",
}) {
  if (!open) return;

  return (
    <Modal
      header={false}
      windowHeightMobile=""
      windowHeightIphone15ProMax=""
      setOpenModal={setOpen}
    >
      <div>
        <ConfirmMessageText>{message}</ConfirmMessageText>
        <ConfirmMessageButtons>
          <AcceptButton
            marginTop="0"
            color="var(--color-gray-1000)"
            backgroundColor="var(--color-gray-300)"
            onClick={() => setOpen("")}
          >
            Cancelar
          </AcceptButton>
          <AcceptButton
            marginTop="0"
            backgroundColor={confirmButtonBackgroundColor}
            onClick={handleConfirm}
          >
            {confirmButtonMessage}
          </AcceptButton>
        </ConfirmMessageButtons>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
