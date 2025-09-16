import styled from "styled-components";
import Modal from "./Modal";
import AcceptButton from "./AcceptButton";

const DeleteMessageText = styled.div`
  text-align: center;

  & span {
    font-weight: 700;
  }
`;

const DeleteMessageButtons = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
`;

function DeleteModal({ open, setOpen, message, handleDelete }) {
  if (!open) return;

  return (
    <Modal
      header={false}
      windowHeightMobile=""
      windowHeightIphone15ProMax=""
      setOpenModal={setOpen}
    >
      <div>
        <DeleteMessageText>{message}</DeleteMessageText>
        <DeleteMessageButtons>
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
            backgroundColor="var(--color-red-1000)"
            onClick={handleDelete}
          >
            Borrar
          </AcceptButton>
        </DeleteMessageButtons>
      </div>
    </Modal>
  );
}

export default DeleteModal;
