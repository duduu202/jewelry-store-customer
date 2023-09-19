import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

// with isOpen prop, we can control the visibility of the modal
export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;

  inset: 0 0 0 0;

  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  margin: 10% auto;
  padding: 1rem;
  // text color black
  color: ${(props) => props.theme.colors.default};

  width: 40%;
`;
