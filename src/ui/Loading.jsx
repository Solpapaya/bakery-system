import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

const open = keyframes`
  100% {
    background-color: rgba(0, 0, 0, 0.5);
    /* backdrop-filter: blur(1px); // optional: adds a blur effect */
    /* -webkit-backdrop-filter: blur(1px); */
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); // black with 50% opacity
  /* backdrop-filter: blur(0px); // optional: adds a blur effect */
  z-index: 999;
  animation: ${open} 0.2s ease-out forwards;
`;

const LoadingAnimationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const enter = keyframes`
  1% {
    left: 50dvw;
    transform: translateX(-50%);
  }
  100% {
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 5rem;
  }
`;

const enterCircle = keyframes`
  100% {
    opacity: 1;
  }
`;

const spin = keyframes`
0% {
    transform: translate(-50%, -50%);
}
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const MainLoadingAnimation = styled.div`
  position: absolute;
  top: 101%;
  /* background-color: var(--color-gray-0); */
  background-color: var(--color-brand-1000);
  width: 100%;
  height: 50%;
  border-radius: var(--border-radius-lg);
  z-index: 3;
  animation: ${enter} 0.2s ease-out forwards, ${spin} 1s ease-out 0.2s infinite;
`;

const SecondaryLoadingAnimation = styled.div`
  position: absolute;
  /* background-color: var(--color-brand-1000); */
  background-color: var(--color-gray-0);
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  top: 50dvh;
  left: 50dvw;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: ${enterCircle} 0.2s ease-out forwards;
  z-index: 2;
`;

function Loading({ open }) {
  if (!open) return;

  return createPortal(
    <Wrapper>
      <LoadingAnimationWrapper>
        <MainLoadingAnimation></MainLoadingAnimation>
        <SecondaryLoadingAnimation></SecondaryLoadingAnimation>
      </LoadingAnimationWrapper>
    </Wrapper>,
    document.body
  );
}

export default Loading;
