import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";

import { mqHeight } from "../utils/mediaQueryHelpers";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  @supports (width: 100dvw) {
    width: 100dvw;
  }
  z-index: 10;
  background-color: rgba(0, 0, 0, 0); // black with 50% opacity
  /* backdrop-filter: blur(0px); // adds a blur effect */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &.open {
    background-color: rgba(0, 0, 0, 0.5); // black with 50% opacity
    /* backdrop-filter: blur(2px); // adds a blur effect */

    & #modal {
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const StyledModal = styled.div`
  position: absolute;
  background-color: var(--color-gray-0);
  width: 80%;
  height: ${(props) => props.$windowHeightMobile};
  top: 100%;
  @media ${mqHeight.iphone15ProMax} {
    height: ${(props) => props.$windowHeightIphone15ProMax};
  }

  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  border-radius: var(--border-radius-md);
`;

const ModalHeading = styled.header`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media ${mqHeight.iphone15ProMax} {
    margin-bottom: 4rem;
  }
`;

const CloseModal = styled.span`
  width: 3rem;
  height: 3rem;
  background-color: var(--color-gray-300);
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }

  & svg {
    stroke-width: 3;
  }
`;

function Modal({
  title,
  setOpenModal,
  windowHeightMobile = "95%",
  windowHeightIphone15ProMax = "72%",
  header = true,
  children,
}) {
  const modalRef = useRef();
  const windowRef = useRef();

  useEffect(() => {
    requestAnimationFrame(() => {
      modalRef.current.classList.add("open");
    });
  }, []);
  return createPortal(
    <Wrapper
      ref={modalRef}
      onClick={(e) => {
        if (!windowRef.current.contains(e.target)) setOpenModal("");
      }}
    >
      <StyledModal
        id="modal"
        ref={windowRef}
        $windowHeightMobile={windowHeightMobile}
        $windowHeightIphone15ProMax={windowHeightIphone15ProMax}
      >
        {header && (
          <ModalHeading>
            <span>{title}</span>
            <CloseModal onClick={() => setOpenModal("")}>
              <HiOutlineXMark />
            </CloseModal>
          </ModalHeading>
        )}
        {children}
      </StyledModal>
    </Wrapper>,
    document.body
  );
}

export default Modal;
