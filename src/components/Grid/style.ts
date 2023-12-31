import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  animation: ${fadeIn} 0.5s;
`;

export const GridItem = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
