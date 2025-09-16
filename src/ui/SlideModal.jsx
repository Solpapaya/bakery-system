import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiOutlineXMark, HiOutlineTicket } from "react-icons/hi2";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* black with 50% opacity */
  backdrop-filter: blur(0px); /* optional: adds a blur effect */
  transition: all 0.3s;

  &.open {
    background-color: rgba(0, 0, 0, 0.5); /* black with 50% opacity */
    backdrop-filter: blur(2px); /* optional: adds a blur effect */

    & div {
      right: 2.5%;
    }
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(2.5%);
  right: -100%;

  background-color: var(--color-gray-0);
  width: 60%;
  height: 95%;
  border-radius: var(--border-radius-lg);

  padding: 1rem;
  transition: right 0.4s;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 2rem 0;
  border-bottom: 1px solid var(--color-gray-200);
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--flex-gap-sm);
  font-weight: 500;
  color: var(--color-gray-700);
  font-size: 1.6rem;
`;

const ModalTitleLogo = styled.div`
  width: 2.7rem;
  height: 2.5rem;
  /* padding: 0.3rem; */
  background-color: var(--color-gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  color: var(--color-brand-600);

  & svg {
    stroke-width: 2;
    width: 2rem;
    height: 2rem;
  }
`;

const ModalOptions = styled.div`
  display: flex;
  gap: var(--flex-gap-sm);
`;

const ModalIconOption = styled.button`
  width: 2.7rem;
  height: 2.5rem;
  background-color: transparent;
  border: none;
  color: var(--color-gray-700);

  &:focus {
    outline: none;
  }

  & svg {
    stroke-width: 2;
    width: 2rem;
    height: 2rem;
  }
`;

const ModalBody = styled.section`
  margin-top: 2rem;
  font-size: 1.4rem;
`;

function SlideModal({ setIsOpenModal, logo, title, children }) {
  // console.log("SLIDEMODAL RENDERED");
  const slideModalRef = useRef();
  useEffect(() => {
    requestAnimationFrame(() => {
      slideModalRef.current.classList.add("open");
    });
  }, [slideModalRef]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Unlock scroll on unmount
      document.body.style.overflow = "";
    };
  }, []);

  function unmount() {
    slideModalRef.current.classList.remove("open");
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsOpenModal(false);
      }, 402);
    });
  }

  return createPortal(
    <Wrapper onClick={unmount} ref={slideModalRef}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <ModalTitleLogo>{logo}</ModalTitleLogo>
            <span>{title}</span>
          </ModalTitle>
          <ModalOptions>
            <ModalIconOption onClick={unmount}>
              <HiOutlineXMark />
            </ModalIconOption>
          </ModalOptions>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </Modal>
    </Wrapper>,
    document.body
  );
}

export default SlideModal;
